/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SleepInfo from "~/components/SleepInfo";
import SleepNoteBubble from "~/components/SleepNoteBubble";
import { sendRequest } from "~/server/send-request";
import withAuth from "~/withAuth";

interface Sleep {
  createdAt: string;
  wakeUp?: string;
  goToSleep?: string;
  calculatedTime: string;
  id?: number;
  userId?: string | null | undefined;
  notes?: [] | undefined;
}

const SleepDetails: React.FC = () => {
  const router = useRouter();
  const [sleep, setSleep] = useState<Sleep>();
  const [sleepNote, setSleepNote] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const pathMatch = router.asPath.match(/\/sleeps\/(\w+)\/(\w+)/);
  const userId = pathMatch ? pathMatch[1] : null;
  const sleepId = pathMatch ? pathMatch[2] : null;
  const [defaultNoteIdx, defaultSleepId, defaultUserId] = [0, 0, 0];

  const handleRedirect = () => {
    void router.push(`/sleeps/${userId ?? defaultUserId}`);
  };

  const handleSubmit = async () => {
    await sendRequest(
      "POST",
      `/sleeps/${userId ?? defaultUserId}/${sleepId ?? defaultSleepId}`,
      sleepNote
    );
    setSleepNote("");
    setRefreshData(!refreshData);
  };

  const handleDelete = async () => {
    await sendRequest(
      "DELETE",
      `/sleeps/${userId ?? defaultUserId}/${sleepId ?? defaultSleepId}`
    );
    handleRedirect();
  };

  const handleNoteDelete = async (noteIndex: number) => {
    const updatedData = await sendRequest(
      "DELETE",
      `/sleeps/${userId ?? defaultUserId}/${sleepId ?? defaultSleepId}/${
        noteIndex ?? defaultNoteIdx
      }`
    );
    setSleep(updatedData ?? ({} as Sleep));
    setRefreshData(!refreshData);
  };

  const getSleep = async () => {
    const data = await sendRequest(
      "GET",
      `/sleeps/${userId ?? defaultUserId}/${sleepId ?? defaultSleepId}`
    );
    setSleep(data);
  };

  useEffect(() => {
    if (userId && sleepId) {
      void getSleep();
    }
  }, [router.query, router.isReady, refreshData]);

  return (
    <>
      <h1 className="mb-6 pt-8 text-center text-4xl font-bold">
        Sleep Details
      </h1>
      <SleepInfo
        sleepDate={sleep?.createdAt}
        timeToWakeUp={sleep?.wakeUp}
        timeWentToBed={sleep?.goToSleep}
        calculatedTimeToSleep={sleep?.calculatedTime}
        onDelete={handleDelete}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        action=""
      >
        <div className="form-control mx-auto mt-10 w-full sm:w-1/2 lg:w-1/3">
          <textarea
            className="textarea-bordered textarea h-24 w-[700px]"
            placeholder="Sleep Note"
            value={sleepNote}
            onChange={(e) => {
              setSleepNote(e.target.value);
            }}
          ></textarea>
          <button className="btn mx-auto mt-4 w-full sm:w-1/4 lg:w-1/6">
            Add Note
          </button>
        </div>
      </form>
      <h2 className="mb-6 pt-8 text-center text-2xl font-bold">Sleep Notes</h2>
      <div className=" mx-auto w-full sm:w-1/2 lg:w-1/3">
        {sleep?.notes?.map((note: string, idx: number) => (
          <SleepNoteBubble
            key={idx}
            note={note}
            onDelete={() => handleNoteDelete(idx)}
          />
        ))}
      </div>
    </>
  );
};

export default withAuth(SleepDetails);

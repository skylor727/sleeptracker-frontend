import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SleepInfo from "~/components/SleepInfo";
import SleepNoteBubble from "~/components/SleepNoteBubble";
import { sendRequest } from "~/server/send-request";

interface Sleep {
  createdAt: string;
  wakeUp?: string;
  goToSleep?: string;
  calculatedTime: string;
  id: number;
  userId: string | null | undefined;
}

export const SleepDetails = () => {
  const router = useRouter();
  const [sleep, setSleep] = useState<Sleep>();
  const [sleepNote, setSleepNote] = useState("");
  const pathMatch = router.asPath.match(/\/sleeps\/(\w+)\/(\w+)/);
  const userId = pathMatch ? pathMatch[1] : null;
  const sleepId = pathMatch ? pathMatch[2] : null;

  const handleSubmit = async () => {
    sendRequest("POST", `/sleeps/${userId}/${sleepId}`, sleepNote);
    setSleepNote("");
  };

  const handleDelete = () => {
    console.log("delete");
  };
  
  const getSleep = async () => {
    const data = await sendRequest("GET", `/sleeps/${userId}/${sleepId}`);
    setSleep(data);
  };

  useEffect(() => {
    if (userId && sleepId) {
      getSleep();
    }
  }, [router.query, router.isReady]);

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
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        action=""
      >
        <textarea
          className="textarea-bordered textarea"
          placeholder="Sleep Note"
          value={sleepNote}
          onChange={(e) => {
            setSleepNote(e.target.value);
          }}
        ></textarea>
        <button className="btn">Add Note</button>
      </form>
      <h2 className="mb-6 pt-8 text-center text-2xl font-bold">Sleep Notes</h2>
      {sleep?.notes.map((note, idx) => (
        <SleepNoteBubble key={idx} note={note} onDelete={handleDelete} />
      ))}
    </>
  );
};

export default SleepDetails;

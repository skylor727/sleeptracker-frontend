import SleepCard from "../../components/SleepCard";
import { sendRequest } from "~/server/send-request";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Sleep {
  createdAt: string;
  wakeUp?: string;
  goToSleep?: string;
  calculatedTime: string;
}

export const UsersSleepLog = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [sleeps, setSleeps] = useState<Sleep[]>([]);

  const getUsersSleeps = async () => {
    if (userId) {
      const data = await sendRequest("GET", `/sleeps/${userId}`);
      setSleeps(data);
    }
  };

  useEffect(() => {
    getUsersSleeps();
  }, [userId]);

  if (!sleeps) return <div>Loading...</div>;

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold">Sleep Log</h1>
      {sleeps &&
        sleeps.map((sleep, index) => (
          <SleepCard
            key={index}
            sleepDate={sleep.createdAt}
            timeToWakeUp={sleep.wakeUp}
            timeWentToBed={sleep.goToSleep}
            calculatedTimeToSleep={sleep.calculatedTime}
          ></SleepCard>
        ))}
    </>
  );
};

export default UsersSleepLog;

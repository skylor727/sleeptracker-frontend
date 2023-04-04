import SleepCard from "../../../components/SleepCard";
import { sendRequest } from "~/server/send-request";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import withAuth from "~/withAuth";

interface Sleep {
  createdAt: string;
  wakeUp?: string;
  goToSleep?: string;
  calculatedTime: string;
  id: number;
  userId: string | null | undefined;
}

const UsersSleepLog: React.FC = () => {
  const router = useRouter();
  const [sleeps, setSleeps] = useState<Sleep[]>([]);

  const userId = useMemo(() => {
    const pathParts = router.asPath.split("/");
    return pathParts.length > 2 ? pathParts[2] : null;
  }, [router.asPath]);

  const getUsersSleeps = async () => {
    if (userId) {
      const data = await sendRequest("GET", `/sleeps/${userId}`);
      setSleeps(data);
    }
  };

  useEffect(() => {
    if (!userId) return;
    getUsersSleeps();
  }, [userId]);

  if (!sleeps) return <div>Loading...</div>;

  return (
    <>
      <h1 className="mb-6 pt-8 text-center text-4xl font-bold">Sleep Log</h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sleeps &&
            sleeps.map((sleep, index) => (
              <SleepCard
                key={index}
                sleepDate={sleep.createdAt}
                timeToWakeUp={sleep.wakeUp}
                timeWentToBed={sleep.goToSleep}
                calculatedTimeToSleep={sleep.calculatedTime}
                sleepId={sleep.id}
                userId={userId}
              ></SleepCard>
            ))}
        </div>
      </div>
    </>
  );
};

export default withAuth(UsersSleepLog);

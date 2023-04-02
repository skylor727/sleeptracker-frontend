import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const pathMatch = router.asPath.match(/\/sleeps\/(\w+)\/(\w+)/);
  const userId = pathMatch ? pathMatch[1] : null;
  const sleepId = pathMatch ? pathMatch[2] : null;

  const getSleeps = async () => {
    const data = await sendRequest("GET", `/sleeps/${userId}/${sleepId}`);
    setSleep(data);
  };

  useEffect(() => {
    if (userId && sleepId) {
      getSleeps();
    }
  }, [router.query, router.isReady]);

  return (
    <>
      <div>hi</div>
    </>
  );
};

export default SleepDetails;

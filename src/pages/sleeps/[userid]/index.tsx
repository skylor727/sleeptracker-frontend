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
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

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

  const filteredSleeps = sleeps.filter((sleep) =>
      sleep.createdAt.includes(searchTerm) ||
      (sleep.wakeUp && sleep.wakeUp.includes(searchTerm)) ||
      (sleep.goToSleep && sleep.goToSleep.includes(searchTerm))
  );

  if (!sleeps) return <div>Loading...</div>;

  return (
      <>
        <h1 className="mb-6 pt-8 text-center text-4xl font-bold">Sleep Log</h1>
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6 text-center">
            <input
                type="text"
                placeholder="Search sleep logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredSleeps.length > 0 ? (
                filteredSleeps.map((sleep, index) => (
                    <SleepCard
                        key={index}
                        sleepDate={sleep.createdAt}
                        timeToWakeUp={sleep.wakeUp}
                        timeWentToBed={sleep.goToSleep}
                        calculatedTimeToSleep={sleep.calculatedTime}
                        sleepId={sleep.id}
                        userId={userId}
                    />
                ))
            ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No matching sleep logs found.
                </p>
            )}
          </div>
        </div>
      </>
  );
};

export default withAuth(UsersSleepLog);

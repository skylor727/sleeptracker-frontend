import SleepCard from "../../components/SleepCard";
import { sendRequest } from "~/server/send-request";
import { useSession } from "next-auth/react";

export const UsersSleepLog = () => {
  const { data: session } = useSession();

  const getUsersSleeps = () => {

  }
  if (!session) return <div>Loading...</div>;

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold">Sleep Log</h1>
      <SleepCard />
    </>
  );
};

export default UsersSleepLog;

import { useRouter } from "next/router";

type SleepCardProps = {
  sleepDate: string;
  calculatedTimeToSleep: string;
  sleepId: number;
  userId: string | null | undefined;
  timeToWakeUp?: string;
  timeWentToBed?: string;
};

export const SleepCard: React.FC<SleepCardProps> = ({
  sleepDate,
  timeToWakeUp,
  timeWentToBed,
  calculatedTimeToSleep,
  userId,
  sleepId,
}) => {
  const router = useRouter();

  const handleClick = async () => {
    const defaultUserId = "default-user";
    const defaultSleepId = "default-sleep";
    await router.push(
      `/sleeps/${userId ?? defaultUserId}/${sleepId ?? defaultSleepId}`
    );
  };

  return (
    <div className="card w-96 bg-[#131d35] shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Date Logged: {sleepDate}</h2>
        <ul>
          {timeToWakeUp ? (
            <li>Planned time to awake: {timeToWakeUp}</li>
          ) : (
            <li>Planned time to go to sleep: {timeWentToBed}</li>
          )}

          <li>
            Time to {timeToWakeUp ? "go to sleep " : "wake up "}
            {calculatedTimeToSleep}
          </li>
        </ul>
        <div className="card-actions justify-end">
          <button onClick={void handleClick} className="btn-primary btn">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SleepCard;

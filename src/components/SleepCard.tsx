type SleepCardProps = {
  sleepDate: string;
  calculatedTimeToSleep: string;
  timeToWakeUp?: string;
  timeWentToBed?: string;
};

export const SleepCard: React.FC<SleepCardProps> = ({
  sleepDate,
  timeToWakeUp,
  timeWentToBed,
  calculatedTimeToSleep,
}) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
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
          <button className="btn-primary btn">Details</button>
        </div>
      </div>
    </div>
  );
};

export default SleepCard;

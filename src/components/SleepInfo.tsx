type SleepCardProps = {
  sleepDate: string | undefined;
  calculatedTimeToSleep: string | undefined;
  sleepId: number | undefined;
  userId: string | null | undefined;
  notes: string[] | undefined;
  timeToWakeUp?: string;
  timeWentToBed?: string;
  onDelete?: () => void;
};

export const SleepInfo: React.FC<SleepCardProps> = ({
  sleepDate,
  timeToWakeUp,
  timeWentToBed,
  calculatedTimeToSleep,
  userId,
  sleepId,
  onDelete,
}) => {
  return (
    <div className="rounded-lg bg-base-200 p-6 text-center text-base-content shadow-lg">
      <ul>
        <li className="mb-2">
          <strong>Date:</strong> {sleepDate}
        </li>
        <li className="mb-2">
          {timeToWakeUp
            ? `Planned time to awake: ${timeToWakeUp}`
            : `Planned time to go to sleep: ${timeWentToBed}`}
        </li>
        <li>
          {timeToWakeUp
            ? `Time to go to sleep: ${calculatedTimeToSleep}`
            : `Time to wake up: ${calculatedTimeToSleep}`}
        </li>
      </ul>
      <div className="my-4">
        <button className="btn-error btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SleepInfo;

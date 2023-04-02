type SleepCardProps = {
  sleepDate: string | undefined;
  calculatedTimeToSleep: string | undefined;
  sleepId: number | undefined;
  userId: string | null | undefined;
  notes: string[] | undefined;
  timeToWakeUp?: string;
  timeWentToBed?: string;
};

export const SleepInfo: React.FC<SleepCardProps> = ({
  sleepDate,
  timeToWakeUp,
  timeWentToBed,
  calculatedTimeToSleep,
  userId,
  sleepId,
}) => {
  return (
    <>
      <ul>
        <li>Date: {sleepDate}</li>
        <li>
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
    </>
  );
};

export default SleepInfo;

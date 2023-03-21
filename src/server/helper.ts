type SleepFormData = { [index: string]: string };
export const calculateTime = (sleepData: SleepFormData) => {
  console.log(sleepData);
  getMinutes(sleepData.wakeUp!);
  const date12 = convertTo12Hour(sleepData.wakeUp!);
  const time12 = format12Hour(date12);
  //   console.log(time12);
};

const convertTo12Hour = (time: String): Date => {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour!);
  date.setMinutes(minute!);
  return date;
};

const format12Hour = (date: Date): string => {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const amPm = hours24 < 12 ? "AM" : "PM";
  const minutes = date.getMinutes();
  const paddedMinutes = String(minutes).padStart(2, "0");
  return `${hours12}:${paddedMinutes} ${amPm}`;
};

const getMinutes = (timeString: string) => {
  const [hour, minute] = timeString.split(":");

  /* Take the 24 hr version of hr and multiply by 60 then add the 
  remaining minutes + 15 to account for time to fall asleep
  then add 405 to account for the 5 full sleep cycles
  */
  const minutes = parseInt(hour!) * 60 + parseInt(minute!) + 15 + 405;
  console.log(minutes);
};

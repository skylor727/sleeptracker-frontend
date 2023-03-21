type SleepFormData = { [index: string]: string };

export const calculateTime = (sleepData: SleepFormData) => {
  const idealHours = 7;
  const idealMinutes = 45; //Ideal minutes is technically 30 but add 15 for time to fall asleep
  console.log(sleepData);
  const calculatedTime =
    sleepData.calculationChoice === "goToSleep"
      ? addTime(sleepData.goToSleep, idealHours, idealMinutes)
      : subtractTime(sleepData.wakeUp, idealHours, idealMinutes);
  return calculatedTime;
};

const format12Hour = (hour: number, minute: number): string => {
  const hours12 = hour % 12 || 12;
  const amPm = hour < 12 ? "AM" : "PM";
  const formattedHour = String(hours12).padStart(2, "0");
  const formattedMinute = String(minute).padStart(2, "0");

  return `${formattedHour}:${formattedMinute} ${amPm}`;
};

const subtractTime = (time: string, hours: number, minutes: number): string => {
  const [inputHour, inputMinute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(inputHour - hours);
  date.setMinutes(inputMinute - minutes);

  const resultHour = String(date.getHours()).padStart(2, "0");
  const resultMinute = String(date.getMinutes()).padStart(2, "0");

  return format12Hour(resultHour, resultMinute);
};

const addTime = (time: string, hours: number, minutes: number): string => {
  const [inputHour, inputMinute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(inputHour + hours);
  date.setMinutes(inputMinute + minutes);

  const resultHour = String(date.getHours()).padStart(2, "0");
  const resultMinute = String(date.getMinutes()).padStart(2, "0");

  return format12Hour(resultHour, resultMinute);
};

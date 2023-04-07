type SleepFormData = { [index: string]: string };

const calculateTime = (sleepData: SleepFormData) => {
  const idealHours = 7;
  const idealMinutes = 45;
  const calculatedTime =
    sleepData.calculationChoice === "goToSleep"
      ? addTime(sleepData.goToSleep || "00:00", idealHours, idealMinutes)
      : subtractTime(sleepData.wakeUp || "00:00", idealHours, idealMinutes);
  return calculatedTime;
};

const format12Hour = (
  hour?: number,
  minute?: number,
  time?: string
): string => {
  if (time) {
    const [inputHour, inputMinute] = time.split(":").map(Number);
    hour = inputHour || 0;
    minute = inputMinute || 0;
  }
  const hours12 = (hour || 0) % 12 || 12;
  const amPm = (hour || 0) < 12 ? "AM" : "PM";
  const formattedHour = String(hours12).padStart(2, "0");
  const formattedMinute = String(minute || 0).padStart(2, "0");

  return `${formattedHour}:${formattedMinute} ${amPm}`;
};

const subtractTime = (
  time: string,
  hours: number,
  minutes: number
): string => {
  const [inputHour, inputMinute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours((inputHour || 0) - hours);
  date.setMinutes((inputMinute || 0) - minutes);

  const resultHour = date.getHours();
  const resultMinute = date.getMinutes();

  return format12Hour(resultHour, resultMinute);
};

const addTime = (time: string, hours: number, minutes: number): string => {
  const [inputHour, inputMinute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours((inputHour || 0) + hours);
  date.setMinutes((inputMinute || 0) + minutes);

  const resultHour = date.getHours();
  const resultMinute = date.getMinutes();

  return format12Hour(resultHour, resultMinute);
};

export { calculateTime, format12Hour };

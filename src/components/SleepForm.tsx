import { useState, useEffect } from "react";
import { calculateTime } from "~/server/helper";
type SleepFormData = { [index: string]: string };

const handleSubmit = (sleepFormData: SleepFormData) => {
  sleepFormData.calculationChoice === "wakeUp"
    ? (sleepFormData["goToSleep"] = "")
    : (sleepFormData["wakeUp"] = "");
  let calculatedTime = calculateTime(sleepFormData);
  console.log(calculatedTime);
};

export const SleepForm = () => {
  const [selected, setSelected] = useState("");
  const [calculatedTime, setCalculatedTime] = useState("");
  const [sleepFormData, setSleepFormData] = useState<SleepFormData>({
    calculationChoice: "",
    goToSleep: "",
    wakeUp: "",
    calculatedTime: "",
  });

  useEffect(() => {
    console.log(sleepFormData.wakeUp);
    console.log(sleepFormData.goToSleep);
    if (sleepFormData.wakeUp || sleepFormData.goToSleep) {
      try {
        setCalculatedTime(calculateTime(sleepFormData));
      } catch (error) {
        console.log(error);
      }
    }
  }, [sleepFormData]);

  return (
    <>
      <h1 className="text-center text-4xl font-bold">Sleep Calculator</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(sleepFormData);
        }}
      >
        <div className="input-group-md flex flex-col">
          <label htmlFor="">
            Calculate based off the time you will be going to sleep, or the time
            you will wake up?
            <select
              className="select-bordered select max-w-xs"
              value={selected}
              name="calculationChoice"
              onChange={(e) => {
                setSelected(e.target.value);
                const timeField =
                  e.target.value === "wakeUp" ? "wakeUp" : "goToSleep";
                setSleepFormData((prevState) => {
                  const updatedState = {
                    ...prevState,
                    [e.target.name]: e.target.value,
                    [timeField]: prevState[timeField],
                  };
                  return updatedState as SleepFormData;
                });
              }}
            >
              <option value="">Select an option</option>
              <option value="wakeUp">Wake up</option>
              <option value="goToSleep">Go To Sleep</option>
            </select>
          </label>
          {selected && selected === "wakeUp" ? (
            <label htmlFor="">
              What time will you wake up?
              <input
                className="input-bordered input"
                type="time"
                name="wakeUp"
                required
                onChange={(e) => {
                  setSleepFormData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </label>
          ) : (
            selected && (
              <label htmlFor="">
                What time will you go to sleep?
                <input
                  className="input-bordered input"
                  type="time"
                  name="goToSleep"
                  required
                  onChange={(e) => {
                    setSleepFormData((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </label>
            )
          )}
          <div>
            {selected && selected === "wakeUp" ? (
              <span>
                Based off the time you are waking up, you should go to bed by
                {calculatedTime}
              </span>
            ) : (
              selected && (
                <span>
                  Based off the time you are going to sleep, you should wake up
                  by {calculatedTime}
                </span>
              )
            )}
          </div>
        </div>
        <button type="submit" className="btn">
          Save
        </button>
      </form>
    </>
  );
};

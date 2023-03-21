import { useState } from "react";

type SleepFormData = { [index: string]: string };

const handleSubmit = (sleepFormData: SleepFormData) => {
  console.log(sleepFormData.calculationChoice === "wakeUp");
  sleepFormData.calculationChoice === "wakeUp"
    ? (sleepFormData["goToSleep"] = "")
    : (sleepFormData["wakeUp"] = "");
  console.log(sleepFormData);
};

export const SleepForm = () => {
  const [selected, setSelected] = useState("");
  const [sleepFormData, setSleepFormData] = useState<SleepFormData>({
    calculationChoice: "",
    goToSleep: "",
    wakeUp: "",
    calculatedTime: "",
  });

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
                {
                  setSelected(e.target.value);
                  sleepFormData[e.target.name] = e.target.value;
                }
              }}
              id=""
            >
              <option value="null">Select an option</option>
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
                onChange={(e) => {
                  sleepFormData[e.target.name] = e.target.value;
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
                  onChange={(e) =>
                    (sleepFormData[e.target.name] = e.target.value)
                  }
                />
              </label>
            )
          )}
          <div>
            {selected && selected === "wakeUp" ? (
              <span>
                {" "}
                Based off the time you are waking up, you should go to bed by
                *calculatedTime*
              </span>
            ) : (
              selected && (
                <span>
                  Based off the time you are going to sleep, you should wake up
                  by *calculatedTime*
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

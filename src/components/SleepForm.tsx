import { useState } from "react";

export const SleepForm = () => {
  const [selected, setSelected] = useState("");
  return (
    <>
      <h1 className="text-center text-4xl font-bold">Sleep Calculator</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <div className="input-group-md flex flex-col">
          <label htmlFor="">
            Calculate based off the time you will be going to sleep, or the time
            you will wake up?
            <select
              className="select-bordered select max-w-xs"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              name="calculation_choices"
              id=""
            >
              <option value="">Select an option</option>
              <option value="wakeUp">Wake up</option>
              <option value="goToSleep">Go To Sleep</option>
            </select>
          </label>
          {selected && selected === "wakeUp" ? (
            <label htmlFor="">
              What time will you wake up?
              <input className="input-bordered input" type="time" />
            </label>
          ) : (
            selected && (
              <label htmlFor="">
                What time will you go to sleep?
                <input className="input-bordered input" type="time" />
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

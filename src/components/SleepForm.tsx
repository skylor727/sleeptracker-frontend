import { useState, useEffect } from "react";
import { calculateTime } from "~/server/helper";
import { sendRequest } from "~/server/send-request";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
type SleepFormData = {
  [K in keyof Partial<{ userId: string }>]: string;
} & { [index: string]: string };

export const SleepForm = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [selected, setSelected] = useState("");
  const [calculatedTime, setCalculatedTime] = useState("");
  const [sleepFormData, setSleepFormData] = useState<SleepFormData>({
    calculationChoice: "",
    goToSleep: "",
    wakeUp: "",
    calculatedTime: "",
  });

  const redirect = () => {
    router.push("/sleep-log");
  };

  const handleSubmit = (sleepFormData: SleepFormData) => {
    sleepFormData.calculationChoice === "wakeUp"
      ? (sleepFormData["goToSleep"] = "")
      : (sleepFormData["wakeUp"] = "");
    let calculatedTime = calculateTime(sleepFormData);
    sleepFormData.calculatedTime = calculatedTime;
    sleepFormData.userId = sessionData?.user.id;
    sendRequest("POST", sleepFormData);
    redirect();
  };

  useEffect(() => {
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-xl bg-[#131d35] p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-bold">
            Sleep Calculator
          </h1>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(sleepFormData);
            }}
          >
            <div>
              <label className="mb-2 block font-medium" htmlFor="">
                Calculate based off the time you will be going to sleep, or the
                time you will wake up?
                <select
                  className="w-full rounded p-2"
                  value={selected}
                  name="calculationChoice"
                  onChange={(e) => {
                    setSelected(e.target.value);
                    const timeField =
                      e.target.value === "wakeUp" ? "wakeUp" : "goToSleep";
                    const oppositeField =
                      timeField === "wakeUp" ? "goToSleep" : "wakeUp";
                    setSleepFormData((prevState) => {
                      const updatedState = {
                        ...prevState,
                        [e.target.name]: e.target.value,
                        [timeField]: prevState[oppositeField],
                        [oppositeField]: "",
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
                <div className="mt-4">
                  <label className="mb-2 block font-medium" htmlFor="timeInput">
                    What time will you wake up?
                    <input
                      className="w-full rounded border border-gray-300 p-2"
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
                </div>
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
                {selected && calculatedTime && selected === "wakeUp" ? (
                  <div className="mt-4">
                    <span className="mb-2 block font-medium">
                      {`Based off the time you are waking up, you should go to bed by 
                ${calculatedTime}`}
                    </span>
                  </div>
                ) : (
                  selected &&
                  calculatedTime && (
                    <div className="mt-4">
                      <span className="mb-2 block font-medium">
                        {`Based off the time you are going to sleep, you should wake up
                  by ${calculatedTime}`}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="btn w-full rounded py-2 font-bold text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

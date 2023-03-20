import { useState } from 'react';

export const SleepForm = () => {
    const [selected, setSelected] = useState("");
    return (
        <>
            <h1 className="text-center text-4xl font-bold">Sleep Calculator</h1>
            <form action="">
                <div className="flex">
                    <label htmlFor="">Calculate off time you will be going to sleep, or time you will wake up? </label>
                    <select value={selected} onChange={e => setSelected(e.target.value)} name="calculation_choices" id="">
                        <option value="">Select an option</option>
                        <option value="wakeUp">Wake up</option>
                        <option value="goToSleep">Go To Sleep</option>
                    </select>
                    {selected && selected === "wakeUp" ? (
                        <label htmlFor="">
                            What time will you wake up?
                            <input type="time" />
                        </label>
                    ) : selected && (
                        <label htmlFor="">
                            What time will you go to sleep?
                            <input type="time" />
                        </label>
                    )}
                    <button type="submit" className="btn">Save</button>
                </div>
            </form>
            <div>
                {selected && selected === "wakeUp" ? (
                    <span> Based off the time you are waking up, you should go to bed by *calculatedTime*</span>
                ) : selected && (
                    <span>Based off the time you are going to sleep, you should wake up by *calculatedTime*</span>
                )}
            </div>
        </>
    )
}
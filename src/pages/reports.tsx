import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendRequest } from "~/server/send-request";
import { useSession } from "next-auth/react";

interface Sleep {
    createdAt: string;
    wakeUp?: string;
    goToSleep?: string;
    calculatedTime: string;
    notes?: string[];
}

const Reports: React.FC = () => {
    const { data: sessionData } = useSession();
    const [sleepData, setSleepData] = useState<Sleep[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [filteredData, setFilteredData] = useState<Sleep[]>([]);

    const fetchSleepData = async () => {
        if (sessionData?.user?.id) {
            const data = await sendRequest("GET", `/sleeps/${sessionData.user.id}`);
            setSleepData(data);
        }
    };

    useEffect(() => {
        fetchSleepData();
    }, [sessionData?.user?.id]);

    useEffect(() => {
        if (startDate && endDate) {
            const filtered = sleepData.filter((sleep) => {
                const sleepDate = new Date(sleep.createdAt);
                return sleepDate >= startDate && sleepDate <= endDate;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(sleepData);
        }
    }, [startDate, endDate, sleepData]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6">Sleep Report</h1>
            <div className="flex justify-center space-x-4 mb-6">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="border rounded px-4 py-2"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                    className="border rounded px-4 py-2"
                />
            </div>
            <div>
                {filteredData.length > 0 ? (
                    <div className="space-y-4">
                        {filteredData.map((sleep, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 p-4 rounded shadow-sm"
                            >
                                <h3 className="font-bold">Date: {sleep.createdAt}</h3>
                                <p>Time Went to Bed: {sleep.goToSleep || "N/A"}</p>
                                <p>Time to Wake Up: {sleep.wakeUp || "N/A"}</p>
                                <p>Calculated Time to Sleep: {sleep.calculatedTime}</p>
                                <h4 className="mt-2 font-semibold">Notes:</h4>
                                {sleep.notes && sleep.notes.length > 0 ? (
                                    sleep.notes.map((note, idx) => (
                                        <p key={idx} className="text-gray-700">
                                            {note}
                                        </p>
                                    ))
                                ) : (
                                    <p>No notes for this entry.</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-4">
                        No sleep entries found in the selected date range.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Reports;

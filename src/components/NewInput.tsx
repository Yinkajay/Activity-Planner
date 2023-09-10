import React, { useState } from 'react';
import timeInputStyles from './NewInput.module.css'; // Import a CSS file for styling
import { AiOutlineClockCircle } from "react-icons/ai";

const TimeInput = () => {
    const [time, setTime] = useState('');
    const [period, setPeriod] = useState('AM');

    const handleHourChange = (e) => {
        const inputValue = e.target.value;
        console.log(e.target.value)
        // Ensure that the input is a number between 1 and 12
        // if (/^\d*$/.test(inputValue) && inputValue >= 1 && inputValue <= 12) {
        //     setHour(inputValue);
        // }
        if (/^\d{0,2}(:\d{0,2})?$/.test(inputValue)) {
            setTime(inputValue);
        }
    };

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    };

    return (
        <>
            <div className={timeInputStyles['time-input-container']}>
                <AiOutlineClockCircle color='#344054' />
                <input
                    type="text"
                    placeholder="00:00"
                    value={time}
                    onChange={handleHourChange}
                />
                <select value={period} onChange={handlePeriodChange}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
        </>
    );
};

export default TimeInput;

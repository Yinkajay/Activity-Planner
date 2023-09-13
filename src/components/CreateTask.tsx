import React, { useContext, useEffect, useState } from 'react'
import { v1 as uuid } from 'uuid'
import { AiOutlineClockCircle, AiOutlineClose, AiFillBell } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";

import createTaskStyles from './CreateTask.module.css'
import { TaskContext } from '../store/TasksContext';
import TimeInput from './TimeInput.tsx'

interface Task {
    id: number;
    title: string;
    completed: boolean;
    startTime: string; // Date properties
    endTime: string;
    taskDate: string;
}

// console.log(uuid())

const CreateTask = () => {
    const { allTasks, addTask, changeMode, formattedTaskToAddDate } = useContext(TaskContext)

    const [taskToAdd, setTaskToAdd] = useState<Task>({
        id: 22,
        title: '',
        completed: false,
        startTime: '12:00 am', // Replace with a valid date string
        endTime: '1:00 am',
        taskDate: 'Today'
    })

    // Errors
    const [titleError, setTitleError] = useState(false)
    const [timeError, setTimeError] = useState(false)

    const [showReminder, setShowReminder] = useState(true)

    const returnShortDate = (dateString: string) => {
        if (dateString === 'Today') {
            return 'Today'
        } else if(dateString === 'Tomorrow'){
            return 'Tomorrow'
        }
        const parts = dateString.split(' ')
        const month = parts[0].slice(0, 4)
        const day = parts[1].slice(0, 2)
        return `${month}, ${day}`
    }

    const addTaskHandler = () => {
        console.log(taskToAdd)

        if (taskToAdd.title == '') {
            setTitleError(true)
            return
        }
        const newTask = { ...taskToAdd, id: uuid(), taskDate: formattedTaskToAddDate };
        console.log(newTask)
        addTask(newTask);

        // Optionally, reset the taskToAdd state for the next task
        setTaskToAdd({
            id: 0, // Reset to an empty string
            title: '',
            completed: false,
            startTime: '12:00 am', // Reset to default values
            endTime: '1:00 am',
            taskDate: 'Today'
        });
    }

    // const handleTimeChange = (newTime: string) => {
    //     setSelectedTime(newTime);
    // };

    const handleTitleChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleError(false)
        const newTitle = e.target.value;
        setTaskToAdd({ ...taskToAdd, title: newTitle });
    })

    const handleStartTimeChange = (newTime: string) => {
        setTaskToAdd(prev => ({ ...prev, startTime: newTime }))
        // setTaskStartTime(newTime);
        console.log(newTime)
    };

    const handleEndTimeChange = (newTime: string) => {
        setTaskToAdd(prev => ({ ...prev, endTime: newTime }))
        console.log(newTime)
    };

    const removeReminder = () => {
        setShowReminder(false)
    }

    const cancelAddHandler = () => {
        changeMode('calendar')
    }


    return (
        <div className={createTaskStyles['create-task-card']}>
            <div className={createTaskStyles['top-area']}>
                <h2>Add Task</h2>
                <div className="" onClick={cancelAddHandler}>
                    <AiOutlineClose color='#667085' size={22} />
                </div>
            </div>
            <textarea rows={10} cols={40} value={taskToAdd.title} onChange={handleTitleChange} />
            {titleError && <p className={createTaskStyles['error-text']}>This field cannot be empty</p>}
            <div className={createTaskStyles['date-area']}>
                <div className={`${createTaskStyles['date-box']} ${createTaskStyles['day-box']}`} onClick={() => changeMode('calendar')}>
                    <FiCalendar color='#344054' /> {returnShortDate(formattedTaskToAddDate)}
                </div>
                <div className={createTaskStyles['time-area']}>
                    <TimeInput onTimeChange={handleStartTimeChange} />
                    <TimeInput onTimeChange={handleEndTimeChange} />
                </div>
            </div>
            {timeError && <p className={createTaskStyles['error-text']}>Kindly input the times in the correct format</p>}
            {showReminder && <div className={createTaskStyles['reminder-area']}>
                <div>
                    <AiFillBell color='#667085' />
                    <p>10 Minutes before</p>
                </div>
                <div onClick={removeReminder}>
                    <AiOutlineClose color='#667085' size={16} />
                </div>
            </div>}
            <div className={createTaskStyles['button-area']}>
                <button className={createTaskStyles['cancel-btn']} onClick={cancelAddHandler}>Cancel</button>
                <button className={createTaskStyles['save-btn']} onClick={addTaskHandler}>Save</button>
            </div>
        </div >
    )
}

export default CreateTask

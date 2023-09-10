import React, { useContext, useEffect, useState } from 'react'
import { v1 as uuid } from 'uuid'
import { AiOutlineClockCircle, AiOutlineClose, AiFillBell } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";

import activeTaskStyles from './ActiveTask.module.css'
import { TaskContext } from '../store/TasksContext';
import TimeInput from './TimeInput.tsx'
import { formatDate } from '../utils/formatDate.ts';

interface Task {
    id: number;
    title: string;
    completed: boolean;
    startTime: string; // Date properties
    endTime: string;
    taskDate: Date;
}

// console.log(uuid())

const ActiveTask = () => {

    const [taskToAdd, setTaskToAdd] = useState<Task>({
        id: 22,
        title: '',
        completed: false,
        startTime: '12:00 am', // Replace with a valid date string
        endTime: '1:00 am',
        taskDate: new Date()
    })

    // Errors
    const [titleError, setTitleError] = useState(false)
    const [timeError, setTimeError] = useState(false)

    const [showReminder, setShowReminder] = useState(true)

    const { allTasks, addTask, activeTask } = useContext(TaskContext)

    // useEffect(()=>{
    //     console.log(allTasks)
    // }, [allTasks])

    const addTaskHandler = (task: Task) => {
        console.log(taskToAdd)

        if (taskToAdd.title == '') {
            setTitleError(true)
            return
        }
        const newTask = { ...taskToAdd, id: uuid() };
        console.log(newTask)
        addTask(newTask);

        // Optionally, reset the taskToAdd state for the next task
        setTaskToAdd({
            id: 0, // Reset to an empty string
            title: '',
            completed: false,
            startTime: '12:00 am', // Reset to default values
            endTime: '1:00 am',
            taskDate: new Date()
        });
    }

    // const handleTimeChange = (newTime: string) => {
    //     setSelectedTime(newTime);
    // };

    let formattedDate

    if (Object.keys(activeTask).length === 0) {
        formattedDate = ''
    } else {
        formattedDate = formatDate(activeTask?.taskDate)
    }

    return (
        <div className={activeTaskStyles['active-task-card']}>
            <div className={activeTaskStyles['top-area']}>
                <AiOutlineClose color='#667085' size={22} />
            </div>

            <div className={activeTaskStyles['info-area']}>
                <h3>
                    {activeTask?.title}
                </h3>
                <div className={activeTaskStyles['task-date']}>
                    <FiCalendar color='#3F5BF6' />
                    <p>{formattedDate}</p>
                </div>
                <div className={activeTaskStyles['task-time']}>
                    <AiOutlineClockCircle color='#3F5BF6' />
                    <p>{activeTask?.startTime} - {activeTask?.endTime}</p>
                </div>
            </div>

            <div className={activeTaskStyles['button-area']}>
                <button className={activeTaskStyles['cancel-btn']}>Delete</button>
                <button  className={activeTaskStyles['save-btn']} onClick={() => addTaskHandler('')}>Edit</button>
            </div>
        </div >
    )
}

export default ActiveTask

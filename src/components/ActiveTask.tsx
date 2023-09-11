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



    const { allTasks, setAllTasks, highlightTask, addTask, activeTask, changeMode } = useContext(TaskContext)


    const editTaskHandler = (task: Task) => {
        changeMode('editTask')
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


    const deleteTask = (taskId: number) => {
        console.log('deleting')
        const updatedTasks = allTasks.filter((task) => task.id !== taskId)
        setAllTasks(updatedTasks)
        highlightTask({})
    }

    const mainContent = (formattedDate !== ''
        ? (
            <>
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
                    <button className={activeTaskStyles['cancel-btn']} onClick={() => deleteTask(activeTask?.id)}>Delete</button>
                    <button className={activeTaskStyles['save-btn']} onClick={editTaskHandler}>Edit</button>
                </div>
            </>
        )
        : (
            <h2 className={activeTaskStyles['prompt-text']}>Select a task to view</h2>
        )
    )

    return (
        <div className={activeTaskStyles['active-task-card']}>
            <div className={activeTaskStyles['top-area']} onClick={()=> changeMode('calendar')}>
                <AiOutlineClose color='#667085' size={22} />
            </div>
            {mainContent}
        </div >
    )
}

export default ActiveTask

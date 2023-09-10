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
    taskDate: Date;
}

// console.log(uuid())

const EditTask = () => {
    const { allTasks, addTask, activeTask, changeMode, editTask } = useContext(TaskContext)

    const [taskToEdit, setTaskToEdit] = useState<Task>(activeTask)

    // Errors
    const [titleError, setTitleError] = useState(false)

    const [showReminder, setShowReminder] = useState(true)


    useEffect(() => {
        console.log(activeTask)
    }, [activeTask])


    const handleTitleChange = ((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitleError(false)
        const newTitle = e.target.value;
        setTaskToEdit({ ...taskToEdit, title: newTitle });
        console.log(taskToEdit)
    })

    const handleStartTimeChange = (newTime: string) => {
        setTaskToEdit(prev => ({ ...prev, startTime: newTime }))
        // setTaskStartTime(newTime);
        console.log(newTime)
    };

    const handleEndTimeChange = (newTime: string) => {
        setTaskToEdit(prev => ({ ...prev, endTime: newTime }))
        console.log(newTime)
    };

    const cancelEditHandler = () => {
        changeMode('calendar')
    }

    const removeReminder = () => {
        setShowReminder(false)
    }

    const editTaskHandler = (taskToEdit: Task) => {
        console.log(taskToEdit)
        editTask(taskToEdit)
    }
    return (
        <div className={createTaskStyles['create-task-card']}>
            <div className={createTaskStyles['top-area']}>
                <h2>Edit Task</h2>
                <AiOutlineClose color='#667085' size={22} />
            </div>
            {/* placeholder={activeTask?.title} */}
            <textarea rows={10} cols={40} value={taskToEdit?.title} onChange={handleTitleChange} />
            {titleError && <p className={createTaskStyles['error-text']}>This field cannot be empty</p>}
            <div className={createTaskStyles['date-area']}>
                <div className={`${createTaskStyles['date-box']} ${createTaskStyles['day-box']}`}>
                    <FiCalendar color='#344054' /> Today
                </div>
                <div className={createTaskStyles['time-area']}>
                    {/* <div className={`${createTaskStyles['date-box']}`}>
                        <AiOutlineClockCircle color='#344054' /> 10 AM
                    </div> */}
                    {/* <div className={`${createTaskStyles['date-box']}`}>
                        <AiOutlineClockCircle color='#344054' /> 11AM
                    </div> */}
                    <TimeInput onTimeChange={handleStartTimeChange} initialTime={activeTask?.startTime} />
                    <TimeInput onTimeChange={handleEndTimeChange} initialTime={activeTask?.endTime} />
                </div>
            </div>

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
                <button className={createTaskStyles['cancel-btn']} onClick={cancelEditHandler}>Cancel</button>
                <button className={createTaskStyles['save-btn']} onClick={()=>editTaskHandler(taskToEdit)}>Save</button>
            </div>
        </div >
    )
}

export default EditTask

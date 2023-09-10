import React, { useContext, useState } from 'react'
import { AiOutlineClockCircle, AiOutlineClose, AiFillBell } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";

import createTaskStyles from './CreateTask.module.css'
import { TaskContext } from '../store/TasksContext';
import TimeInput from './NewInput.tsx'

interface Task {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    startDate: string; // Date properties
    endDate: string;
}


const CreateTask = () => {

    const [taskToAdd, setTaskToAdd] = useState('')

    const { allTasks, addTask } = useContext(TaskContext)
    console.log(allTasks)

    const addTaskHandler = (task) => {
        addTask({
            userId: 123345,
            id: 12345,
            title: 'test',
            completed: false,
            startDate: '2023-09-09', // Replace with a valid date string
            endDate: '2023-09-10',   // Replace with a valid date string
        })
    }

    const handleTimeChange = ()=>{
        
    }

    return (
        <div className={createTaskStyles['create-task-card']}>
            <div className={createTaskStyles['top-area']}>
                <h2>Add Task</h2>
                <AiOutlineClose color='#667085' size={22} />
            </div>
            <textarea rows={10} cols={40} placeholder='Create Wireframe' value={taskToAdd} onChange={(e) => setTaskToAdd(e.target.value)} />
            {/* resize none */}
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
                    <TimeInput onTimeChange={handleTimeChange} />
                    <TimeInput onTimeChange={handleTimeChange} />
                </div>
            </div>
            <div className={createTaskStyles['reminder-area']}>
                <div>
                    <AiFillBell color='#667085' />
                    <p>10 Minutes before</p>
                </div>
                <AiOutlineClose color='#667085' size={16} />
            </div>
            <div className={createTaskStyles['button-area']}>
                <button className={createTaskStyles['cancel-btn']}>Cancel</button>
                <button className={createTaskStyles['save-btn']} onClick={() => addTaskHandler('')}>Save</button>
            </div>
        </div >
    )
}

export default CreateTask

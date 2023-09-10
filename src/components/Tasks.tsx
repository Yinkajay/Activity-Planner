import React, { useState, useEffect, useContext } from 'react'
import taskStyles from './Tasks.module.css'
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import TaskAdd from './CreateTask';
import EditTask from './EditTask';
import { TaskContext } from '../store/TasksContext';
import { Calendar, DayValue } from 'react-modern-calendar-datepicker';
import { extractDateInfo } from '../utils/getDateInfo';

interface Task {
    id: number;
    title: string;
    completed: boolean;
    startTime: string;
    endTime: string;
    taskDate: Date
}


const Tasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {

    const { year, month, day } = extractDateInfo(new Date())
    console.log(year, month, day)

    const [calendarDate, setCalendarDate] = useState({
        year,
        month,
        day
    })
    const tasksPerPage = 7
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        console.log(calendarDate)
    }, [calendarDate])

    
    const { allTasks, taskToAddDate } = useContext(TaskContext)

    // console.log(allTasks)

    return (
        <div className={taskStyles['tasks-area']}>
            <div className={taskStyles['tasks-ctn']}>
                <h2>
                    My Tasks
                    <h1>{calendarDate.year}-{calendarDate.month}-{calendarDate.day}</h1>
                </h2>
                {tasks?.slice((page - 1) * tasksPerPage, page * tasksPerPage).map(task => (
                    <div className={taskStyles['task']} key={task.id}>
                        <div className={taskStyles['task-info']}>
                            <input type='checkbox' />
                            <div className="">
                                <p style={{ fontWeight: 'bold' }}>{task.title}</p>
                                <p>{task.startTime} - {task.endTime} </p>
                            </div>
                        </div>
                        <div className={taskStyles['task-date']}>
                            Today
                        </div>
                    </div>
                ))}
                <div className={taskStyles['pagination-area']}>
                    <button className={`${taskStyles['page-btn']} ${taskStyles['button-prev']} `} onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>
                        <FiArrowLeft />
                        Previous
                    </button>
                    <div className="">
                        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (value, index) => index + 1).map(
                            (each) => (
                                <button className={`${taskStyles['page-number-btn']} ${page == each ? taskStyles['page-active-btn'] : ''}`} onClick={() => setPage(each)} key={each}>{each}</button>
                            )
                        )}

                    </div>
                    <button className={`${taskStyles['page-btn']} ${taskStyles['button-next']} `} onClick={() => setPage((p) => p + 1)} disabled={page >= (tasks.length / tasksPerPage)}>
                        Next
                        <FiArrowRight />
                    </button>
                </div>
            </div>
            <div className={taskStyles['action-area']}>
                {/* <TaskAdd /> */}
                <Calendar
                    value={calendarDate}
                    onChange={setCalendarDate}
                    // shouldHighlightWeekends
                    colorPrimary='#3F5BF6'
                />
                {/* <DatePicker /> */}
            </div>
        </div>
    )
}

export default Tasks

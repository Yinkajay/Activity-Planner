import React, { useState, useEffect, useContext } from 'react'
import taskStyles from './Tasks.module.css'
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import TaskAdd from './CreateTask';
import { TaskContext } from '../store/TasksContext';
import { Calendar, DayValue, utils } from 'react-modern-calendar-datepicker';
import { extractDateInfo } from '../utils/getDateInfo';
import ActiveTask from './ActiveTask';
import EditTask from './EditTask';

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
    // console.log(year, month, day)

    const [mode, setMode] = useState('calendar')
    const [calendarDate, setCalendarDate] = useState({
        year,
        month,
        day
    })
    const tasksPerPage = 7
    const [page, setPage] = useState<number>(1)


    const { allTasks, changeMode, setAllTasks, taskToAddDate, activeTask, highlightTask, actionMode } = useContext(TaskContext)


    useEffect(() => {
        console.log(calendarDate)
        console.log(activeTask)
    }, [calendarDate, activeTask,])

    // console.log(allTasks)
    const changeDateHandler = (newDate) => {
        setCalendarDate(newDate)
        changeMode('addTask')
    }

    const handleTaskClick = (task: Task) => {
        highlightTask(task)
        changeMode('activeTask')
    }

    const toggleCompletion = (e, task: Task) => {
        e.stopPropagation()

        const taskIndex = allTasks.findIndex((otherTask) => task.id === otherTask.id);

        const updatedTask = { ...allTasks[taskIndex], completed: !allTasks[taskIndex].completed };

        // Create a new array that preserves the order of tasks.
        const updatedTaskList = [...allTasks];
        updatedTaskList[taskIndex] = updatedTask;

        setAllTasks(updatedTaskList)

    }

    return (
        <div className={taskStyles['tasks-area']}>
            <div className={taskStyles['tasks-ctn']}>
                <h2>
                    My Tasks
                </h2>
                <h3>{calendarDate.year}-{calendarDate.month}-{calendarDate.day}</h3>
                {tasks.length === 0 && <h1 className={taskStyles['empty-tasks-heading']}>Nothing to show here!</h1>}
                {tasks?.slice((page - 1) * tasksPerPage, page * tasksPerPage).map(task => (
                    <div className={`${taskStyles['task']} ${activeTask.id == task.id ? taskStyles['active-task'] : ''}`} key={task.id} onClick={() => handleTaskClick(task)}>
                        <div className={taskStyles['task-info']}>
                            <input type='checkbox' onClick={(e) => toggleCompletion(e, task)} />
                            <div className="">
                                <p style={{ fontWeight: 'bold' }} className={`${task.completed ? taskStyles['canceled-text'] : ''}`}>{task.title}</p>
                                <p className={`${task.completed ? taskStyles['canceled-text'] : ''}`}>{task.startTime} - {task.endTime} </p>
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
                <Calendar
                    calendarClassName={`${taskStyles['calendar-card']} ${actionMode !== 'calendar' ? taskStyles['calendar-hide'] : ''}`}
                    value={calendarDate}
                    onChange={changeDateHandler}
                    minimumDate={utils().getToday()}
                    // shouldHighlightWeekends
                    colorPrimary='#3F5BF6'
                />
                {actionMode === 'addTask' && <TaskAdd />}
                {actionMode === 'activeTask' && <ActiveTask />}
                {actionMode === 'editTask' && <EditTask />}
            </div>
        </div>
    )
}

export default Tasks

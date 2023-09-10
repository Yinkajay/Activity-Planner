import React, { useState, useContext } from 'react'
import taskStyles from './Tasks.module.css'
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import TaskAdd from './CreateTask';
import EditTask from './EditTask';
import { TaskContext } from '../store/TasksContext';

interface Task {
    id: number;
    title: string;
    // Add more properties as needed
}


const Tasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const tasksPerPage = 7
    const [page, setPage] = useState<number>(1)

    // const { allTasks } = useContext(TaskContext)

    // console.log(allTasks)

    return (
        <div className={taskStyles['tasks-area']}>
            <div className={taskStyles['tasks-ctn']}>
                <h2>
                    My Tasks
                </h2>
                {tasks?.slice((page - 1) * tasksPerPage, page * tasksPerPage).map(task => (
                    <div className={taskStyles['task']} key={task.id}>
                        <div className={taskStyles['task-info']}>
                            <input type='checkbox' />
                            <div className="">
                                <p style={{ fontWeight: 'bold' }}>{task.id}</p>
                                <p>{ }AM - { }AM </p>
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
                <TaskAdd />
                {/* <EditTask /> */}
            </div>
        </div>
    )
}

export default Tasks

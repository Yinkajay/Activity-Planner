import React from 'react'
import taskStyles from './Tasks.module.css'

interface Task {
    id: number;
    title: string;
    // Add more properties as needed
}

const Tasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    return (
        <div className={taskStyles['task-area']}>
            <h2>
                My Tasks
            </h2>
            <div className={taskStyles['tasks-ctn']}>
                {tasks?.map(task => (
                    <div className={taskStyles['task']} key={task.id}>
                        <input type='checkbox' />
                        <p>{task.id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tasks

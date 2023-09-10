import { useContext } from 'react'
import { FiPlus } from "react-icons/fi";
import topBarStyles from './TopBar.module.css'
import { TaskContext } from '../store/TasksContext';

const TopBar: React.FC = () => {
    const { changeMode } = useContext(TaskContext)
    return (
        <div className={topBarStyles['top-area']}>
            <div className={topBarStyles['text-area']}>
                <h1>Good morning!</h1>


                <h1></h1>


                <p>You got some tasks to do. </p>
            </div>
            <button className={topBarStyles['task-btn']} onClick={() => changeMode('addTask')}>
                <FiPlus />
                Create New Task
            </button>
        </div>
    )
}

export default TopBar

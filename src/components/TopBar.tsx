import { FiPlus } from "react-icons/fi";
import topBarStyles from './TopBar.module.css'

const TopBar: React.FC = () => {
    return (
        <div className={topBarStyles['top-area']}>
            <div className={topBarStyles['text-area']}>
                <h1>Good morning!</h1>


                <h1></h1>

                
                <p>You got some tasks to do. </p>
            </div>
            <button className={topBarStyles['task-btn']}>
                <FiPlus />
                Create New Task
            </button>
        </div>
    )
}

export default TopBar

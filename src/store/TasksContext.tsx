import React, { createContext, useState } from 'react'
import { extractDateInfo } from '../utils/getDateInfo';

// ReactNode

interface Task {
    id: number;
    title: string;
    completed: boolean;
    startTime: string; // Date properties
    endTime: string;
    taskDate: Date
}

interface TaskDate {

}

// type TaskContextData = {
//     // Modify the type as per your task data structure
//     tasks: Task[],
//     addTask: () => {},
// };

const initialTasks: Task[] = [{
    id: 999,
    title: 'test',
    completed: false,
    startTime: '2023-09-09', // Replace with a valid date string
    endTime: '2023-09-10',   // Replace with a valid date string
    taskDate: new Date()
}]

// export const TaskContext = createContext<TaskContextData | undefined>({
//     tasks: [],
// })

// export const TaskContext = createContext({
//     allTasks: [],
//     // setAllTaks: (task:Task) => (void )
//     setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// })

export const TaskContext = createContext<{
    allTasks: Task[];
    addTask: (task: Task) => void;
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    taskToAddDate: object,
    changeTaskDate: (date: TaskDate) => void
    activeTask: Task,
    highlightTask: (task: Task) => void;
    actionMode: string,
    changeMode: (mode: string) => void
}>({
    allTasks: [],
    addTask: () => { },
    setAllTasks: () => { },
    taskToAddDate: {},
    changeTaskDate: () => { },
    activeTask: {} as Task,
    highlightTask: () => { },
    actionMode: '',
    changeMode: () => { }
});



export const TaskContextProvider = ({ children }) => {
    const [allTasks, setAllTasks] = useState<Task[]>(initialTasks)

    const { year, month, day } = extractDateInfo(new Date())
    const [taskToAddDate, setTaskToAddDate] = useState({ year, month, day })
    // const [activeTask, setActiveTask] = useState({})
    const [activeTask, setActiveTask] = useState<Task>({} as Task)

    const [actionMode, setActionMode] = useState<string>('calendar')

    // const addTask = (task: Task) => {
    //     setAllTasks((prevTasks) => [...prevTasks, task])
    // }
    const addTask: (task: Task) => void = (task: Task) => {
        setAllTasks((prevTasks) => [task, ...prevTasks])
        console.log('working')
    };

    const changeTaskDate: (date: TaskDate) => void = (date) => {
        setTaskToAddDate(date)
    }

    const highlightTask: (task: Task) => void = (task: Task) => {
        if (activeTask.id === task.id) {
            setActiveTask({})
            return
        }
        setActiveTask(task)
    }

    const changeMode = (mode) => {
        setActionMode(mode)
    }

    const editTask = (task: Task) => {
        const indexToUpdate = allTasks.findIndex((item) => item.id === task.id);
        const updatedTask = { ...task }
        
        // const updatedItem = {
        //     ...task[indexToUpdate],
            
        // };
        const updatedTasks = [
            ...allTasks.slice(0, indexToUpdate),
            updatedItem,
            ...allTasks.slice(indexToUpdate + 1),
        ];
    }



    return (
        <TaskContext.Provider value={{
            allTasks,
            addTask,
            setAllTasks,
            taskToAddDate,
            changeTaskDate,
            activeTask,
            highlightTask,
            actionMode,
            changeMode
        }}>
            {children}
        </TaskContext.Provider>
    )
}
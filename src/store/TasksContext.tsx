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
}>({
    allTasks: [],
    addTask: () => { },
    setAllTasks: () => { },
    taskToAddDate: {},
    changeTaskDate: () => { }
});



export const TaskContextProvider = ({ children }) => {
    const [allTasks, setAllTasks] = useState<Task[]>(initialTasks)

    const { year, month, day } = extractDateInfo(new Date())
    const [taskToAddDate, setTaskToAddDate] = useState({ year, month, day })


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


    return (
        <TaskContext.Provider value={{
            allTasks,
            addTask,
            setAllTasks,
            taskToAddDate,
            changeTaskDate
        }}>
            {children}
        </TaskContext.Provider>
    )
}
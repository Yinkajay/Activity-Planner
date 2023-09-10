import React, { createContext, useState } from 'react'

// ReactNode

interface Task {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    startDate: string; // Date properties
    endDate: string;
}

// type TaskContextData = {
//     // Modify the type as per your task data structure
//     tasks: Task[],
//     addTask: () => {},
// };

const initialTasks: Task[] = [{
    userId: 999,
    id: 999,
    title: 'test',
    completed: false,
    startDate: '2023-09-09', // Replace with a valid date string
    endDate: '2023-09-10',   // Replace with a valid date string
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
}>({
    allTasks: [],
    addTask: () => { },
    setAllTasks: () => { },
});



export const TaskContextProvider = ({ children }) => {
    const [allTasks, setAllTasks] = useState<Task[]>(initialTasks)


    // const addTask = (task: Task) => {
    //     setAllTasks((prevTasks) => [...prevTasks, task])
    // }
    const addTask: (task: Task) => void = (task: Task) => {
        setAllTasks((prevTasks) => [task, ...prevTasks])
        console.log('working')
    };


    return (
        <TaskContext.Provider value={{
            allTasks,
            addTask,
            setAllTasks,
        }}>
            {children}
        </TaskContext.Provider>
    )
}
import { createContext, useState, ReactNode } from 'react'

type TaskContextData = {
    tasks: string[]; // Modify the type as per your task data structure
  };


const TaskContext = createContext({
    tasks: []
})

const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    return (
        <TaskContext.Provider value={
            tasks
        }>
            {children}
        </TaskContext.Provider>
    )
}
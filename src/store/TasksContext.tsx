import React, { createContext, useState, useEffect } from 'react'
import { extractDateInfo } from '../utils/getDateInfo';
import { formatCalendarDate } from '../utils/formatDate';

// ReactNode

interface Task {
    id: number;
    title: string;
    completed: boolean;
    startTime: string; // Date properties
    endTime: string;
    taskDate: string
}


const initialTasks: Task[] = [{
    id: 999,
    title: 'test',
    completed: false,
    startTime: '2023-09-09', // Replace with a valid date string
    endTime: '2023-09-10',   // Replace with a valid date string
    taskDate: 'Today'
}]


export const TaskContext = createContext<{
    allTasks: Task[];
    addTask: (task: Task) => void;
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    taskToAddDate: object,
    changeTaskDate: (date: TaskDate) => void
    activeTask: Task,
    highlightTask: (task: Task) => void;
    actionMode: string,
    changeMode: (mode: string) => void,
    editTask: (task: Task) => void,
    formattedTaskToAddDate: string,
    setFormattedTaskToAddDate: React.Dispatch<React.SetStateAction<string>>
}>({
    allTasks: [],
    addTask: () => { },
    setAllTasks: () => { },
    taskToAddDate: {},
    changeTaskDate: () => { },
    activeTask: {} as Task,
    highlightTask: () => { },
    actionMode: '',
    changeMode: () => { },
    editTask: () => { },
    formattedTaskToAddDate: '',
    setFormattedTaskToAddDate: () => { }
});



export const TaskContextProvider = ({ children }) => {
    const [allTasks, setAllTasks] = useState<Task[]>(initialTasks)

    const { year, month, day } = extractDateInfo(new Date())
    const [taskToAddDate, setTaskToAddDate] = useState({ year, month, day })
    // const [activeTask, setActiveTask] = useState({})
    const [activeTask, setActiveTask] = useState<Task>({} as Task)

    const [formattedTaskToAddDate, setFormattedTaskToAddDate] = useState<string>(formatCalendarDate(taskToAddDate))

    const [actionMode, setActionMode] = useState<string>('calendar')


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
        console.log(mode)
        setActionMode(mode)
    }

    const editTask = (task: Task) => {
        console.log(task)
        const indexToUpdate = allTasks.findIndex((item) => item.id === task.id);
        const updatedTasks = [...allTasks]

        updatedTasks[indexToUpdate] = { ...task }

        console.log(updatedTasks)
        setAllTasks(updatedTasks)
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
            changeMode,
            editTask,
            formattedTaskToAddDate,
            setFormattedTaskToAddDate
        }}>
            {children}
        </TaskContext.Provider>
    )
}
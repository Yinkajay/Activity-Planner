import { useEffect, useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
// import DatePicker from "react-datepicker";
import DatePicker, { DayValue, DayRange, Day, Calendar } from 'react-modern-calendar-datepicker'

import "react-modern-calendar-datepicker/lib/DatePicker.css";

import "react-datepicker/dist/react-datepicker.css";
import Tasks from './components/Tasks'
import { TaskContext } from './store/TasksContext'
import { generateRandomTime } from './utils/getRandomTimeGenerator'

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  startTime: string; // Date properties
  endTime: string;
  taskDdate: Date
}

function App() {
  // const [startDate, setStartDate] = useState(new Date());
  const [day, setDay] = useState<DayValue>(null);
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null
  });
  const [days, setDays] = useState<Day[]>([]);
  // const [currentDate, setCurrentDate] = useState<Day>(null)
  const [tasks, setTasks] = useState([])

  const { addTask, allTasks, setAllTasks } = useContext(TaskContext)

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        // setTasks(json.slice(0, 50));
        // console.log(json)
        const modifiedTasks: Task[] = json.slice(0, 5).map((task: any) => {
          // Define the additional fields you want to add

          // const startTime = '2023-08-30'; // Example start date
          // const endTime = '2023-08-31'; // Example end date

          // const startTime = '10:20 am'; // Example start time
          // const endTime = '11:40 am'; // Example end time

          const { startTime, endTime } = generateRandomTime();

          // Create a new object that conforms to the Task interface
          return {
            // key: task.id,
            userId: task.userId,
            id: task.id,
            title: task.title,
            completed: false,
            startTime, // Add the start date
            endTime,   // Add the end date
            taskDate: new Date()
          };
        });
        console.log(modifiedTasks)
        // setTasks(modifiedTasks);
        setAllTasks(modifiedTasks)

      });
    // console.log(tasks)
  };

  useEffect(() => {
    // console.log(currentDate);
    fetchData();
  }, []);


  return (
    <>
      <div>
        <Navbar />
        <hr />
        <TopBar />
        {/* <Tasks tasks={tasks} /> */}
        <Tasks tasks={allTasks} />
        {/* <Calendar shouldHighlightWeekends value={currentDate} onChange={setCurrentDate} /> */}
      </div>
    </>
  )
}

export default App

import { useEffect, useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import DatePicker, { DayValue, DayRange, Day, Calendar } from 'react-modern-calendar-datepicker'

import "react-modern-calendar-datepicker/lib/DatePicker.css";

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
  const [tasks, setTasks] = useState([])

  const { addTask, allTasks, setAllTasks } = useContext(TaskContext)

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        const modifiedTasks: Task[] = json.slice(0,50).map((task: any) => {

          const { startTime, endTime } = generateRandomTime();

          return {
            // key: task.id,
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
        <hr style={{ borderColor: '#EAECF0', borderStyle: 'solid' }} />
        <TopBar />
        <Tasks tasks={allTasks} />
      </div>
    </>
  )
}

export default App

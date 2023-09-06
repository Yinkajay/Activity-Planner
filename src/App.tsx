import { useEffect, useState, useCallback } from 'react'
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


function App() {
  // const [startDate, setStartDate] = useState(new Date());
  const [day, setDay] = useState<DayValue>(null);
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null
  });
  const [days, setDays] = useState<Day[]>([]);
  const [currentDate, setCurrentDate] = useState<Day>(null)
  const [tasks, setTasks] = useState([])

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setTasks(json.slice(0, 50));
        console.log(json)
          ;
      });
    console.log(tasks)
  };

  useEffect(() => {
    console.log(currentDate);
    fetchData();
  }, [currentDate]);


  return (
    <>
      <div>
        <Navbar />
        <hr />
        <TopBar />
        <Tasks tasks={tasks} />
        {/* <Calendar shouldHighlightWeekends value={currentDate} onChange={setCurrentDate} /> */}
      </div>
    </>
  )
}

export default App

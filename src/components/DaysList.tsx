import React, { useContext } from 'react'
import { getDaysInOrder } from '../utils/getDaysInOrder'
import { TaskContext } from '../store/TasksContext'
import { formatDateWithoutDay } from '../utils/formatDate'

import daysListStyles from './DaysList.module.css'

const DaysList = () => {
    const days = getDaysInOrder(9)
    const { taskToAddDate } = useContext(TaskContext)

    const heading = formatDateWithoutDay(taskToAddDate)

    return (
        <div>
            <h4>{heading}</h4>
            <div className={daysListStyles['list-ctn']}>
                {days.map((day, index) => (
                    <div className={daysListStyles['list-item']} key={index}>
                        <p>{day.dayOfWeek.slice(0, 3)}</p>
                        <p>{day.day}</p>
                    </div>
                ))}
            </div>
            <div className={daysListStyles['mobile-list-ctn']}>
                {days.slice(0, 5).map((day, index) => (
                    <div className={daysListStyles['list-item']} key={index}>
                        <p>{day.dayOfWeek.slice(0, 3)}</p>
                        <p>{day.day}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DaysList

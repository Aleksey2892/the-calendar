import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { nanoid } from 'nanoid'
import { useCalendar } from '../../utils/customHooks/useCalendar'
import { CalendarHeader } from './CalendarHeader'
import {
  BoxList,
  CalendarWrapper,
  CellBox,
  DayNumber,
  FirstLine,
  TasksList,
  StyledInput,
} from './Calendar.styled'

type Task = { id: string; text: string }

type Day = {
  id: string
  originalMoment: moment.Moment
}

type DaysWithTasks = {
  id: string
  tasks: Task[]
}

export const Calendar = () => {
  const [today, setToday] = useState<moment.Moment>(moment())
  const [monthDays, setMonthDays] = useState<Day[]>([])
  const [daysWithTasks, setDaysWithTasks] = useState<DaysWithTasks[]>([])
  const [dragDay, setDragDay] = useState<DaysWithTasks | any>(null)
  const [dragTask, setDragTask] = useState<Task | any>(null)
  const { makeMonthCalendar, isCurrentDay, isCurrentMonth } = useCalendar()

  useEffect(() => {
    setMonthDays(makeMonthCalendar(today))
    // eslint-disable-next-line
  }, [today])

  useEffect(() => {
    const templates = monthDays.map(day => ({
      id: day.originalMoment.format('DD-MM-YY'),
      tasks: [],
    }))

    setDaysWithTasks(prev => [...prev, ...templates])
  }, [monthDays])

  const handleMakeNewTask = (dayID: string) => {
    const foundDay = daysWithTasks.find(d => d.id === dayID)
    if (!foundDay) {
      const newDay = {
        id: dayID,
        tasks: [{ id: `${dayID}/${nanoid(4)}`, text: '' }],
      }
      return setDaysWithTasks(prev => [...prev, newDay])
    }

    setDaysWithTasks(prev => {
      return prev.map(d => {
        if (d.id !== dayID) return d

        const newTask = { id: `${dayID}/${nanoid(4)}`, text: '' }
        return { ...d, tasks: [...d.tasks, newTask] }
      })
    })
  }

  const handleChangeTask = (text: string, dayID: string, taskID: string) => {
    setDaysWithTasks(prev => {
      return prev.map(d => {
        if (d.id !== dayID) return d

        const updatedTask = d.tasks.map(t => {
          if (t.id !== taskID) return t

          return { ...t, text }
        })

        return { ...d, tasks: updatedTask }
      })
    })
  }

  const handleDeleteTask = (dayID: string, taskID: string) => {
    setDaysWithTasks(prev => {
      return prev.map(d => {
        if (d.id !== dayID) return d

        const filteredTasks = d.tasks.filter(t => t.id !== taskID)
        return { ...d, tasks: filteredTasks }
      })
    })
  }

  function handleDragOver(e: React.DragEvent<HTMLInputElement> | any) {
    e.preventDefault()
    const isActionItem = e.target.className === 'event-item'

    if (isActionItem) {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLInputElement> | any) {
    e.target.style.boxShadow = 'none'
  }

  function handleDragStart(
    e: React.DragEvent<HTMLInputElement> | any,
    day: any,
    task: any,
  ) {
    setDragDay(day)
    setDragTask(task)
  }

  function handleDragEnd(e: React.DragEvent<HTMLInputElement> | any) {
    e.target.style.boxShadow = 'none'
  }

  function handleDrop(
    e: React.DragEvent<HTMLInputElement> | any,
    day: any,
    task: any,
  ) {
    e.preventDefault()

    setDaysWithTasks(prev => {
      return prev.map(d => {
        if (d.id !== dragDay.id) {
          return d
        }

        const targetIndex = d.tasks.indexOf(dragTask)
        const dropIndex = d.tasks.indexOf(task)
        const newSort = [...d.tasks]
        newSort.splice(targetIndex, 1)
        newSort.splice(dropIndex + 1, 0, dragTask)

        return { ...d, tasks: newSort }
      })
    })

    setDragDay(null)
    setDragTask(null)

    e.target.style.boxShadow = 'none'
  }

  function handleDropOnBoard(
    e: React.DragEvent<HTMLLIElement> | any,
    day: any,
  ) {
    console.log('handleDropOnBoard day', day)
    console.log('handleDropOnBoard dragTask', dragTask)
    console.log('handleDropOnBoard dragDay', dragDay)

    day.tasks.push(dragTask)
    const targetIdx = dragDay.tasks.indexOf(dragTask)
    dragDay.tasks.splice(targetIdx, 1)

    setDaysWithTasks(
      daysWithTasks.map(d => {
        if (d.id === day.id) return day
        if (d.id === dragDay.id) return dragDay
        return d
      }),
    )

    e.target.style.boxShadow = 'none'
  }

  const currentMonth = today.format('MMMM YYYY')

  return (
    <CalendarWrapper>
      <CalendarHeader changeMonth={setToday} currentMonth={currentMonth} />

      <BoxList>
        {monthDays?.map(({ id, originalMoment }) => {
          const normalizedDayNumber = originalMoment.format('D')
          const slicedMonthName = currentMonth.slice(0, 3)
          const formattedDate = originalMoment.format('DD-MM-YY')
          const isShowTasks = daysWithTasks.find(d => d.id === formattedDate)
          const day = daysWithTasks.find(day => day.id === id)

          return (
            <CellBox
              key={formattedDate}
              isWeekend={
                originalMoment.day() === 6 || originalMoment.day() === 0
              }
              onDragOver={e => handleDragOver(e)}
              onDrop={e => handleDropOnBoard(e, day)}
            >
              <FirstLine>
                <DayNumber
                  isCurrentDay={isCurrentDay(originalMoment)}
                  isCurrentMonth={isCurrentMonth(originalMoment, today)}
                >
                  {normalizedDayNumber}{' '}
                  {normalizedDayNumber === '1' && slicedMonthName}
                </DayNumber>

                <button onClick={() => handleMakeNewTask(formattedDate)}>
                  +
                </button>
              </FirstLine>

              <TasksList>
                {isShowTasks?.tasks.map(t => {
                  const task = day?.tasks.find(task => task.id === t.id)

                  return (
                    <li key={t.id}>
                      <StyledInput
                        type={'text'}
                        value={t.text}
                        onChange={e =>
                          handleChangeTask(e.target.value, id, t.id)
                        }
                        className={'event-item'}
                        draggable
                        onDragOver={e => handleDragOver(e)}
                        onDragLeave={e => handleDragLeave(e)}
                        onDragStart={e => handleDragStart(e, day, task)}
                        onDragEnd={e => handleDragEnd(e)}
                        onDrop={e => handleDrop(e, day, task)}
                      />
                      <button
                        onClick={() => handleDeleteTask(formattedDate, t.id)}
                      >
                        x
                      </button>
                    </li>
                  )
                })}
              </TasksList>
            </CellBox>
          )
        })}
      </BoxList>
    </CalendarWrapper>
  )
}

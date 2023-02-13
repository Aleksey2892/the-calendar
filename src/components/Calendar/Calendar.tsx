import { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { useCalendar } from '../../utils/customHooks/useCalendar'
import { CalendarHeader } from './CalendarHeader'
import {
  BoxList,
  CalendarWrapper,
  CellBox,
  DayNumber,
  FirstLine,
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
  const [today, setToday] = useState(moment())
  const [monthDays, setMonthDays] = useState<Day[]>([])
  const [daysWithTasks, setDaysWithTasks] = useState<DaysWithTasks[]>([])
  const { makeMonthCalendar, isCurrentDay, isCurrentMonth } = useCalendar()

  useEffect(() => {
    setMonthDays(makeMonthCalendar(today))
  }, [today])

  const handleMakeNewTask = (dayId: string) => {
    // @ts-ignore
    setDaysWithTasks(prev => {
      const foundDay = prev.find(d => d.id === dayId)
      if (!foundDay) {
        const newDay = { id: dayId, tasks: [{ id: `${dayId}/0`, text: '' }] }
        return [newDay]
      }

      return prev.map(d => {
        if (d.id === dayId) {
          const newTask: Task = { id: `${dayId}/${prev.length}`, text: '' }

          return { ...d, tasks: [...d.tasks, newTask] }
        }
        return d
      })
    })
  }

  const handleChangeTask = (value: string, taskId: string) => {
    console.log(value)
    console.log(taskId)

    // const dayId = taskId.split('/').shift()
    //
    // setMonthDays(prev => {
    //   return prev.map(d => {
    //     if (d.id !== dayId) return d
    //
    //     const updatedTasks = d.tasks.map(t => {
    //       if (t.id !== taskId) return t
    //
    //       return { ...t, text: value }
    //     })
    //
    //     return { ...d, tasks: updatedTasks }
    //   })
    // })
  }

  // const monthDays = makeMonthCalendar(today)
  const currentMonth = today.format('MMMM YYYY')

  return (
    <CalendarWrapper>
      <CalendarHeader changeMonth={setToday} currentMonth={currentMonth} />

      <BoxList>
        {monthDays?.map(({ originalMoment }) => {
          const normalizedDayNumber = originalMoment.format('D')
          const slicedMonthName = currentMonth.slice(0, 3)
          const formattedDate = originalMoment.format('DD-MM-YY')

          // tasks?.find(t=>  formattedDate === t.id.split('/').shift()

          return (
            <CellBox
              key={formattedDate}
              isWeekend={
                originalMoment.day() === 6 || originalMoment.day() === 0
              }
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

              <ul>
                {daysWithTasks.map(task => {
                  if (formattedDate === task.id) {
                    return (
                      <input
                        type={'text'}
                        value={''}
                        onChange={e =>
                          handleChangeTask(e.target.value, task.id)
                        }
                      />
                    )
                  }
                  return null
                })}
              </ul>
            </CellBox>
          )
        })}
      </BoxList>
    </CalendarWrapper>
  )
}

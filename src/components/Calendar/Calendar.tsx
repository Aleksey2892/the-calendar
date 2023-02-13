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
  tasks: Task[]
}

export const Calendar = () => {
  const [today, setToday] = useState(moment())
  const [monthDays, setMonthDays] = useState<Day[]>([])
  const { makeMonthCalendar, isCurrentDay, isCurrentMonth } = useCalendar()

  useEffect(() => {
    setMonthDays(makeMonthCalendar(today))
  }, [today])

  const handleMakeNewTask = (dayId: string) => {
    setMonthDays(prev => {
      const updated = prev.map(d => {
        if (d.id === dayId) {
          d.tasks.push({
            id: `${d.originalMoment.format('DD-MM-YY')}/${d.tasks.length}`,
            text: '',
          })
        }
        return d
      })

      return [...updated]
    })
  }

  const handleChangeTask = (value: string, taskId: string) => {
    console.log(value)
    console.log(taskId)

    const dayId = taskId.split('/').shift()

    setMonthDays(prev => {
      return prev.map(d => {
        if (d.id !== dayId) return d

        const updatedTasks = d.tasks.map(t => {
          if (t.id !== taskId) return t

          return { ...t, text: value }
        })

        return { ...d, tasks: updatedTasks }
      })
    })
  }

  // const monthDays = makeMonthCalendar(today)
  const currentMonth = today.format('MMMM YYYY')

  return (
    <CalendarWrapper>
      <CalendarHeader changeMonth={setToday} currentMonth={currentMonth} />

      <BoxList>
        {monthDays?.map(({ originalMoment, tasks }) => {
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
                {tasks.map(task => (
                  <input
                    type={'text'}
                    value={''}
                    onChange={e => handleChangeTask(e.target.value, task.id)}
                  />
                ))}
              </ul>
            </CellBox>
          )
        })}
      </BoxList>
    </CalendarWrapper>
  )
}

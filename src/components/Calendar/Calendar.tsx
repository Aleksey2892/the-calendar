import { useCalendar } from '../../utils/customHooks/useCalendar'
import { CalendarHeader } from './CalendarHeader'
import {
  CalendarWrapper,
  BoxList,
  CellBox,
  NumberLine,
} from './Calendar.styled'

export const Calendar = () => {
  const { monthCalendar, today, isCurrentDay, isCurrentMonth } = useCalendar()
  // const totalDays = [...Array(42)]

  return (
    <CalendarWrapper>
      <CalendarHeader currentMonth={today.format('MMMM YYYY')} />

      <BoxList>
        {monthCalendar.map(day => (
          <CellBox
            key={day.format('DD-MM-YY')}
            isWeekend={day.day() === 6 || day.day() === 0}
          >
            <NumberLine
              isCurrentDay={isCurrentDay(day)}
              isCurrentMonth={isCurrentMonth(day)}
            >
              {day.format('D')}
            </NumberLine>
          </CellBox>
        ))}
      </BoxList>
    </CalendarWrapper>
  )
}

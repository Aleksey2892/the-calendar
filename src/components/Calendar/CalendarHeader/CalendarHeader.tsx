import React from 'react'
import moment from 'moment'
import { useCalendar } from '../../../utils/customHooks/useCalendar'
import { Container, ControlsBox } from './CalendarHeader.styled'

export const CalendarHeader = ({
  currentMonthName,
  changeMonth,
  findAction,
}: {
  currentMonthName: string
  changeMonth: React.Dispatch<React.SetStateAction<moment.Moment>>
  findAction: {
    value: string
    onChange: React.Dispatch<React.SetStateAction<string>>
  }
}) => {
  const { changeCalendar, isCurrentMonth } = useCalendar()

  const handleChangeCalendar = (e: any) => {
    const actionType = e.target.getAttribute('data-action')
    changeCalendar(actionType, changeMonth)
  }

  return (
    <Container>
      <div>
        <p>{currentMonthName}</p>
        <input
          placeholder={'Find notes'}
          type="text"
          value={findAction.value}
          onChange={e => findAction.onChange(e.target.value)}
        />

        <ControlsBox>
          <button
            type="button"
            data-action={'prev'}
            onClick={handleChangeCalendar}
          >
            {'<'}
          </button>

          <button
            type="button"
            data-action={'current'}
            disabled={isCurrentMonth(moment(), moment(currentMonthName))}
            onClick={handleChangeCalendar}
          >
            {'Current Month'}
          </button>

          <button
            type="button"
            data-action={'next'}
            onClick={handleChangeCalendar}
          >
            {'>'}
          </button>
        </ControlsBox>
      </div>

      <ul>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
        <li>Sun</li>
      </ul>
    </Container>
  )
}

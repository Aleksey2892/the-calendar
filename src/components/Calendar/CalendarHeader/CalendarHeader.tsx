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
  const { changeCalendar, isSameDate } = useCalendar()

  const handleChangeCalendar = (
    e: React.MouseEvent<HTMLButtonElement>,
    actionType: string,
  ): void => {
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
          <button type="button" onClick={e => handleChangeCalendar(e, 'prev')}>
            {'<'}
          </button>

          <button
            type="button"
            disabled={isSameDate(moment(), moment(currentMonthName), 'month')}
            onClick={e => handleChangeCalendar(e, 'current')}
          >
            {'Current Month'}
          </button>

          <button type="button" onClick={e => handleChangeCalendar(e, 'next')}>
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

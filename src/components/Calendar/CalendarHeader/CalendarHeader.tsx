import styled from 'styled-components'
import React from 'react'
import moment from 'moment'
import { useCalendar } from '../../../utils/customHooks/useCalendar'

const Container = styled.div`
  * {
    margin: 0;
  }

  div {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    list-style: none;
    margin: 0;
    padding: 0 0 7px;
    border-bottom: 1px solid #404040ff;

    li {
      text-align: center;
      color: #dfddddff;
    }
  }

  p {
    font-size: 24px;
    color: #dfddddff;
  }

  button {
    cursor: pointer;
    color: #dfddddff;

    &:nth-child(2) {
      margin: 0 2px 0 2px;
    }
  }
`

const ControlsBox = styled.div`
  button {
    border: none;
    border-radius: 5px;
    background-color: #635a57ff;
  }
`

export const CalendarHeader = ({
  currentMonth,
  changeMonth,
}: {
  currentMonth: string
  changeMonth: React.Dispatch<React.SetStateAction<moment.Moment>>
}) => {
  const { changeCalendar } = useCalendar()

  const handleChangeCalendar = (e: any) => {
    const actionType = e.target.getAttribute('data-action')

    changeCalendar(actionType, changeMonth)
  }

  return (
    <Container>
      <div>
        <p>{currentMonth}</p>

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
        <li>Monday</li>
        <li>Tuesday</li>
        <li>Wednesday</li>
        <li>Thursday</li>
        <li>Friday</li>
        <li>Saturday</li>
        <li>Sunday</li>
      </ul>
    </Container>
  )
}

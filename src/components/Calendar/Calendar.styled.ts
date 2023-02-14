import styled from 'styled-components'

const CalendarWrapper = styled.div`
  overflow: hidden;
  border: 3px solid #404040ff;
  border-radius: 15px;
  background-color: #a9a9a9ff;
`

const BoxList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  background-color: #404040ff;
  list-style: none;
`

const CellBox = styled.li<{ isWeekend: boolean }>`
  padding: 5px;
  min-width: 100px;
  min-height: 100px;
  background-color: ${props => (props.isWeekend ? '#312A27FF' : '#2E221EFF')};
  color: #fff;

  div button {
    visibility: hidden;
    cursor: pointer;
  }

  &:hover button {
    visibility: visible;
  }
`

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const DayNumber = styled.p<{ isCurrentDay: boolean; isCurrentMonth: boolean }>`
  margin: 0;
  width: max-content;
  padding: 5px;
  border-radius: 50%;
  font-weight: ${props => props.isCurrentDay && 'bold'};
  color: ${props => {
    if (!props.isCurrentMonth) return '#5d5d5d'
    if (props.isCurrentDay) return '#000000FF'
  }};
  background-color: ${props => props.isCurrentDay && '#FF5446FF'};
`

const TasksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;

    button {
      cursor: pointer;
    }
  }
`

const StyledInput = styled.input`
  width: 100%;
  cursor: grab;
`

export {
  CalendarWrapper,
  BoxList,
  CellBox,
  FirstLine,
  DayNumber,
  TasksList,
  StyledInput,
}

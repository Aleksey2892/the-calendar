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
`

const NumberLine = styled.p<{ isCurrentDay: boolean; isCurrentMonth: boolean }>`
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

export { CalendarWrapper, BoxList, CellBox, NumberLine }

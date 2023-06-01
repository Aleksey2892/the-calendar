import styled from 'styled-components';

const CalendarWrapper = styled.div`
  overflow: hidden;
  border: 3px solid #404040ff;
  border-radius: 15px;
  background-color: #2e221eff;
`;

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
`;

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
`;

const ColorsList = styled.ul`
  margin: 3px 0 5px;
  padding: 0;
  display: flex;
  justify-content: space-around;
  list-style: none;

  li {
    width: 15px;
    height: 15px;
    background: red;
    border-radius: 50%;
    cursor: pointer;

    &:nth-child(1) {
      background: #8c5e19;
    }
    &:nth-child(2) {
      background: #631553;
    }
    &:nth-child(3) {
      background: #152a63;
    }
    &:nth-child(4) {
      background: #4f3e3e;
    }
  }
`;

const FirstLine = styled.div`
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  button {
    border-radius: 50%;
    border: none;
    color: #fff;
    font-weight: bold;
    background-color: gray;

    &:hover {
      border: 1px solid #3f0707ff;
      background-color: #502d24;
    }
  }
`;
const HolidayList = styled.ul`
  margin: 0 0 1px 0;
  padding: 0;
  list-style: none;

  li {
    margin: 0 0 1px 0;
    padding: 0;
    font-size: 14px;
    border: 1px solid #707070;
    background-color: #025602;
    text-align: center;
  }
`;

const DayNumber = styled.p<{
  isCurrentDay: boolean;
  isCurrentMonth: boolean;
  isFirstDay: boolean;
}>`
  margin: 0;
  width: ${props => (!props.isFirstDay ? '30px' : 'max-content')};
  height: 30px;
  padding: 5px;
  border-radius: 50%;
  font-weight: ${props => (props.isCurrentDay || props.isFirstDay) && 'bold'};
  color: ${props => {
    if (!props.isCurrentMonth) return '#5d5d5d';
    if (props.isCurrentDay) return '#000000FF';
  }};
  background-color: ${props => props.isCurrentDay && '#FF5446FF'};
  text-align: ${props => !props.isFirstDay && 'center'};
`;

const TasksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin-bottom: 3px;
    display: flex;

    button {
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
      border: 1px solid #796d6d;
      background-color: #4f3e3e;

      &:hover {
        border: 1px solid #3f0707ff;
        background-color: #502d24;
      }
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  cursor: grab;
  color: #fff;
  text-align: center;
  border: none;
  border-bottom: 1px solid #282727;
  background-color: ${props => props.color};
`;

const ControlButtonBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  button {
    padding: 7px;
    border-radius: 5px;
    border: 1px solid transparent;
    cursor: pointer;
    color: #fff;
    background-color: #635a57ff;

    &:hover {
      color: #635a57ff;
      background-color: #fff;
      border: 1px solid #000000ff;
    }

    &:first-child {
      margin-bottom: 10px;
    }
  }
`;

export {
  CalendarWrapper,
  BoxList,
  CellBox,
  FirstLine,
  ColorsList,
  HolidayList,
  DayNumber,
  TasksList,
  StyledInput,
  ControlButtonBox,
};

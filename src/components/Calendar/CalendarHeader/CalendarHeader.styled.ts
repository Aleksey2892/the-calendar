import styled from 'styled-components'

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
      margin: 0 4px 0 4px;
    }
  }
`

const ControlsBox = styled.div`
  button {
    min-width: 30px;
    min-height: 30px;
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: #635a57ff;

    &:hover {
      border: 1px solid #dfddddff;
      background-color: #502d24;
    }

    &:disabled {
      cursor: default;
      border: 1px solid transparent;
      background-color: #502d24;
    }
  }
`

export { Container, ControlsBox }

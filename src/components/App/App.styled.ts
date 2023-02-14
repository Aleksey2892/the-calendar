import styled from 'styled-components'

const AppContainer = styled.div`
  height: 100%;
`
const Loading = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  color: #172660;
`

const Error = styled(Loading)`
  margin-bottom: 20px;
  color: #981515;
`

const ControlButtonBox = styled.div`
  margin-top: 20px;

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
  }
`

export { AppContainer, Loading, Error, ControlButtonBox }

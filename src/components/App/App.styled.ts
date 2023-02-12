import styled from 'styled-components'

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Loading = styled.div`
  text-align: center;
  font-weight: bold;
  color: #172660;
`

const Error = styled(Loading)`
  color: #981515;
`

export { AppContainer, Loading, Error }

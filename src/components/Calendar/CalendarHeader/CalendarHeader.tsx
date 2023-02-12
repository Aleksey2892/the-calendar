import styled from 'styled-components'

const Container = styled.div`
  * {
    margin: 0;
  }

  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ControlsBox = styled.div``

export const CalendarHeader = ({ currentMonth }: { currentMonth: string }) => {
  return (
    <Container>
      <p>{currentMonth}</p>

      <ControlsBox>
        <button type="button">{'<'}</button>
        <button type="button">{'Current Month'}</button>
        <button type="button">{'>'}</button>
      </ControlsBox>
    </Container>
  )
}

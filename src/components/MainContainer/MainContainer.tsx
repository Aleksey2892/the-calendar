import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.div`
  padding: 0 20px 20px 20px;
`

export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <StyledMain>{children}</StyledMain>
}

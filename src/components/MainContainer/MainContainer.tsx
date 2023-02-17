import React from 'react'
import { StyledMain } from './MainContainer.styled'

export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <StyledMain>{children}</StyledMain>
}

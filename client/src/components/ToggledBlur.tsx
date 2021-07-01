import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from 'src/types/redux.type'
import styled from 'styled-components'

interface ToggleBlurProps {
  children: React.ReactNode
}

const ToggleBlur = ({ children }: ToggleBlurProps) => {
  const { isHide } = useSelector((state: IRootState) => state.appState)

  return <Container isHide={isHide}>{children}</Container>
}

interface ContainerProps {
  isHide: boolean
}

const Container = styled.div<ContainerProps>`
  // isHide
  filter: ${(props) => props.isHide && 'blur(4px)'};
`

export default ToggleBlur

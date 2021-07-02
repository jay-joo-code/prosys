import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setHide } from 'src/redux/appSlice'
import { IRootState } from 'src/types/redux.type'
import styled from 'styled-components'

interface ToggleBlurProps {
  children: React.ReactNode
}

const ToggledBlur = ({ children }: ToggleBlurProps) => {
  const { isHide } = useSelector((state: IRootState) => state.appState)
  const dispatch = useDispatch()

  const handleBlur = () => {
    dispatch(setHide(true))
  }

  useEffect(() => {
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('blur', handleBlur)
    }
  })

  return (
    <Container isHide={import.meta.env.VITE_NODE_ENV !== 'development' && isHide}>
      {children}
    </Container>
  )
}

interface ContainerProps {
  isHide: boolean
}

const Container = styled.div<ContainerProps>`
  @media (min-width: ${(props) => props.theme.tablet}) {
    // isHide
    filter: ${(props) => props.isHide && 'blur(4px)'};
  }
`

export default ToggledBlur

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setHide } from 'src/redux/appSlice'
import { IRootState } from 'src/types/redux.type'
import styled from 'styled-components'

interface ToggleBlurProps {
  children: React.ReactNode
}

const ToggleBlur = ({ children }: ToggleBlurProps) => {
  const { isHide } = useSelector((state: IRootState) => state.appState)
  const dispatch = useDispatch()

  const handleFocus = () => {
    dispatch(setHide(false))
  }

  const handleBlur = () => {
    dispatch(setHide(true))
  }

  useEffect(() => {
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  })

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

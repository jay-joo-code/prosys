import React from 'react'
import styled from 'styled-components'

interface ClickableProps {
  children: React.ReactNode
}

const Clickable = ({ children }: ClickableProps) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  background: ${(props) => props.theme.grey[50]};
  border-radius: 8px;
  padding: 0.5rem 1rem;
`

export default Clickable

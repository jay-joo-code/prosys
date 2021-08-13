import React from 'react'
import styled from 'styled-components'

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const TextButton = ({ children, ...rest }: TextButtonProps) => {
  return <StyledButton {...rest}>{children}</StyledButton>
}

const StyledButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  background: ${(props) => props.theme.grey[100]};
  color: ${(props) => props.theme.text.default};
`

export default TextButton

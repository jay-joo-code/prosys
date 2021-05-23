import React from 'react'
import { default as MuiButton } from '@material-ui/core/Button'
import theme from 'src/app/theme'
import styled from 'styled-components'

type IVariant = 'contained' | 'text' | 'outlined'
type ISize = 'small' | 'medium' | 'large'

interface ContainedBtnProps {
  children: React.ReactNode
  variant?: IVariant
  color?: string
  background?: string
  disabled?: boolean
  size?: ISize
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

const Button = (props: ContainedBtnProps) => {
  return (
    <StyledButton
      overridecolor={props.color || theme.brand[500]}
      background={props.background || theme.brand[50]}
      variant={props.variant || 'contained'}
      disabled={props.disabled}
      size={props.size}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      onClick={props.onClick}
      type={props.type}
    >{props.children}
    </StyledButton>
  )
}

interface StyledButtonProps {
  overridecolor: string
  background?: string
  variant: IVariant
  disabled?: boolean
}

const StyledButton = styled(MuiButton)<StyledButtonProps>`
  /* contained */
  color: ${props => props.variant === 'contained' && 'white !important'};
  background: ${props => (props.variant === 'contained' && !props.disabled) && `${props.overridecolor} !important`};

  /* text */
  color: ${props => (props.variant === 'text' && !props.disabled) && `${props.overridecolor} !important`};
  background: ${props => props.variant === 'text' && 'white !important'};

  &:hover {
    background: ${props => props.variant === 'text' && `${props.background} !important`};
  }

  /* outlined */
  color: ${props => (props.variant === 'outlined' && !props.disabled) && `${props.overridecolor} !important`};
  border-color: ${props => (props.variant === 'outlined' && !props.disabled) && `${props.overridecolor} !important`};
`

export default Button

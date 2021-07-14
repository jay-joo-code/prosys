import { IconButton } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

interface IconButtonProps {
  icon: React.ReactNode
  buttonSize?: 'small'
  onClick?: React.MouseEventHandler
  fill?: string
  className?: string
}

const ButtonedIcon = ({
  icon,
  buttonSize,
  onClick,
  fill,
  className,
}: IconButtonProps) => {
  return (
    <StyledIconButton
      size={buttonSize}
      color='inherit'
      onClick={onClick}
      className={className}
      fill={fill}>
      {icon}
    </StyledIconButton>
  )
}

interface StyledIconButtonProps {
  fill?: string
}

const StyledIconButton = styled(IconButton)<StyledIconButtonProps>`
  & svg {
    fill: ${(props) => props.theme.grey[700]} !important;

    // fill
    fill: ${(props) => props.fill && `${props.fill} !important`};
  }
`

export default ButtonedIcon

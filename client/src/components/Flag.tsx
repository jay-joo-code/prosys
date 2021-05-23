
import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

type ISize = 'small'

interface FlagProps {
  label: string
  color: string
  background: string
  size?: ISize
}

const Flag = ({ size, label, color, background }: FlagProps) => {
  return (
    <Container background={background}>
      <Tag
        variant={size === 'small' ? 'caption' : 'body2'}
        overridecolor={color}
        noWrap
      >{label}
      </Tag>
    </Container>
  )
}

interface ContainerProps {
  background: string
  size?: ISize
}

const Container = styled.div<ContainerProps>`
  padding: .2rem .7rem;
  border-radius: 4px;
  display: inline-block;

  // background
  background-color: ${(props) => props.background && props.background};

  // size
  padding: ${props => props.size === 'small' && '.1rem .4rem'};
`

interface TagProps {
  overridecolor: string
}

const Tag = styled(Typography)<TagProps>`
  // overridecolor
  color: ${props => props.overridecolor && `${props.overridecolor} !important`};
`

export default Flag

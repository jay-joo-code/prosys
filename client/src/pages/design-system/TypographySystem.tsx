import { Typography } from '@material-ui/core'
import React from 'react'
import { FlexRow } from 'src/components/layout/Flex'
import styled from 'styled-components'

const TypographySystem = () => {
  return (
    <div>
      <FlexRow alignCenter>
        <Square variant='default' />
        <Typography variant='h4'>Default</Typography>
      </FlexRow>
      <FlexRow alignCenter>
        <Square variant='light' />
        <LightText variant='h4'>Light</LightText>
      </FlexRow>
      <FlexRow alignCenter>
        <Square variant='muted' />
        <MutedText variant='h4'>Muted</MutedText>
      </FlexRow>
      <FlexRow alignCenter>
        <Square variant='disabled' />
        <DisabledText variant='h4'>Disabled</DisabledText>
      </FlexRow>
      <FlexRow alignCenter>
        <Square variant='placeholder' />
        <PlaceholderText variant='h4'>Placeholder</PlaceholderText>
      </FlexRow>
    </div>
  )
}

const LightText = styled(Typography)`
  color: ${props => props.theme.text.light};
`

const MutedText = styled(Typography)`
  color: ${props => props.theme.text.muted};
`

const DisabledText = styled(Typography)`
  color: ${props => props.theme.text.disabled};
`

const PlaceholderText = styled(Typography)`
  color: ${props => props.theme.text.placeholder};
`

interface SquareProps {
  variant: string
}

const Square = styled.div<SquareProps>`
  margin-right: .8rem;
  height: 30px;
  width: 30px;
  border-radius: 8px;

  // variant
  background: ${props => props.variant && props.theme.text[props.variant]};
`

export default TypographySystem

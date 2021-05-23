import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import InteractionsSystem from './InteractionsSystem'
import ButtonsSystem from './ButtonsSystem'
import EtcSystem from './EtcSystem'
import Space from 'src/components/layout/Space'
import TypographySystem from './TypographySystem'

const DesignSystem = () => {
  // TODO: file upload
  return (
    <Container>
      <Typography variant='h5'>Buttons</Typography>
      <ButtonsSystem />
      <Space padding='2rem 0' />
      <Typography
        variant='h5'
        gutterBottom
      >Interactions
      </Typography>
      <InteractionsSystem />
      <Space padding='2rem 0' />
      <Typography variant='h5'>ETC</Typography>
      <EtcSystem />
      <Typography
        variant='h5'
        gutterBottom
      >Typography
      </Typography>
      <TypographySystem />
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
`

export default DesignSystem

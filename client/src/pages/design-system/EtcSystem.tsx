import { Chip } from '@material-ui/core'
import React from 'react'
import theme from 'src/app/theme'
import Flag from 'src/components/Flag'
import ExpandableSection from 'src/components/layout/ExpandableSection'
import { FlexRow } from 'src/components/layout/Flex'
import styled from 'styled-components'

const EtcSystem = () => {
  return (
    <Container>
      <Row alignCenter>
        <Flag
          label='Small flag'
          color={theme.brand[500]}
          background={theme.brand[50]}
          size='small'
        />
        <Flag
          label='Default flag'
          color={theme.brand[500]}
          background={theme.brand[50]}
        />
        <Chip
          label='Small chip'
          size='small'
        />
        <Chip
          label='Deletable'
          onDelete={() => {}}
        />
        <Chip
          label='Clickable'
          clickable
        />
        <StyledChip
          label='Custom color'
          onDelete={() => {}}
        />
      </Row>
      <ExpandableSection heading='heading'>
        content
      </ExpandableSection>
      {/* TODO: menu */}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 1rem;

  & > * {
    margin-bottom: 1rem;
  }
`

const Row = styled(FlexRow)`
  & > * {
    margin-right: .5rem !important;
  }
`

const StyledChip = styled(Chip)`
  color: white !important;
  background: ${props => props.theme.brand[500]} !important;

  & * {
    color: white !important;
  }
`

export default EtcSystem

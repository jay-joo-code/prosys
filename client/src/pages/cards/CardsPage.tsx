import React from 'react'
import NavHeader from 'src/components/header/NavHeader'
import { FlexRow } from 'src/components/layout/Flex'
import styled from 'styled-components'
import CreateCard from './CreateCard'
import Learn from './Learn'

const CardsPage = () => {
  return (
    <FlexRow justifyCenter>
      <Container>
        <NavHeader inboxState={'CREATE'} />
        <Learn />
        <CreateCard />
      </Container>
    </FlexRow>
  )
}

const Container = styled.div`
  padding: 1rem;
  width: 100%;

  @media (min-width: ${(props) => props.theme.tablet}) {
    max-width: 800px;
  }
`

export default CardsPage

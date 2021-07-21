import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined'
import React from 'react'
import { useRepCards } from 'src/api/card'
import theme from 'src/app/theme'
import CardItem from 'src/components/card/CardItem'
import Text from 'src/components/fonts/Text'
import styled from 'styled-components'

const Learn = () => {
  const { cards, refetch: refetchCards } = useRepCards()

  return (
    <Container>
      {cards && cards.length > 0 ? (
        <>
          <CardsCounter>
            <FilterNoneOutlinedIcon />
            <Text variant='p' color={theme.text.light}>
              {cards?.length} remaining
            </Text>
          </CardsCounter>
          <CardItem
            card={cards[0]}
            initStatus='EXPANDED'
            isLearning
            refetchCards={refetchCards}
          />
        </>
      ) : (
        <Text variant='p'>Done for today!</Text>
      )}
    </Container>
  )
}

const Container = styled.div``

const CardsCounter = styled.div`
  padding: 0 0 1rem 0.2rem;
  display: flex;
  align-items: center;

  & > *:first-of-type {
    margin-right: 0.5rem;
  }

  & svg {
    fill: ${(props) => props.theme.text.light} !important;
  }
`

export default Learn

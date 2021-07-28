import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined'
import React from 'react'
import { useRepCards } from 'src/api/card'
import theme from 'src/app/theme'
import { ReactComponent as IllustDone } from 'src/assets/illust-done.svg'
import CardItem from 'src/components/card/CardItem'
import Text from 'src/components/fonts/Text'
import { FlexColumn } from 'src/components/layout/Flex'
import styled from 'styled-components'

const Learn = () => {
  const { cards, refetch: refetchCards } = useRepCards()

  return (
    <Container>
      <CardsCounter>
        <FilterNoneOutlinedIcon />
        <Text variant='p' color={theme.text.light}>
          {cards?.length} remaining
        </Text>
      </CardsCounter>
      {cards && cards.length > 0 ? (
        <CardItem
          card={cards[0]}
          initStatus='EXPANDED'
          refetchCards={refetchCards}
        />
      ) : (
        <FlexColumn alignCenter>
          <StyledIllustDone />
          <Text variant='p' fontWeight={700} color={theme.text.muted}>
            Completed all reps for today!
          </Text>
        </FlexColumn>
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

const StyledIllustDone = styled(IllustDone)`
  width: 80%;
  height: auto;
  margin-top: 6rem;
  margin-bottom: 2rem;

  @media (min-width: ${(props) => props.theme.tablet}) {
    width: 300px;
  }
`

export default Learn

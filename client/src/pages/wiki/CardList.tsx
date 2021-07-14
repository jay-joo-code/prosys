import React from 'react'
import { useCards } from 'src/api/card'
import CardItem from 'src/components/card/CardItem'
import styled from 'styled-components'

interface CardListProps {}

const CardList = ({}: CardListProps) => {
  const { cards } = useCards()

  return (
    <Container>
      {cards?.map((card) => (
        <CardItem key={card?._id} card={card} initStatus='COLLAPSED' />
      ))}
    </Container>
  )
}

const Container = styled.div``

export default CardList

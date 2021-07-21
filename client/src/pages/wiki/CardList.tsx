import React from 'react'
import { useCards } from 'src/api/card'
import CardItem from 'src/components/card/CardItem'
import styled from 'styled-components'

interface CardListProps {
  selectedTagIds: string[]
}

const CardList = ({ selectedTagIds }: CardListProps) => {
  const { cards, refetch: refetchCards } = useCards(selectedTagIds)

  return (
    <Container>
      {cards?.map((card) => (
        <CardItem
          key={card?._id}
          card={card}
          initStatus='COLLAPSED'
          refetchCards={refetchCards}
        />
      ))}
    </Container>
  )
}

const Container = styled.div``

export default CardList

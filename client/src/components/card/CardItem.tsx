import React, { memo, useState } from 'react'
import { ICard, ICardStatus } from 'src/types/card.type'
import { isBlocksEmpty } from 'src/util/card'
import styled from 'styled-components'
import CollapsedCard from './CollapsedCard'
import EditingCard from './EditingCard'
import ExpandedCard from './ExpandedCard'

interface CardItemProps {
  card: ICard
  initStatus: ICardStatus
  isLearning?: boolean
}

const CardItem = ({ card, initStatus, isLearning }: CardItemProps) => {
  const canSave = !isBlocksEmpty(card?.question)
  const [status, setStatus] = useState<ICardStatus>(
    canSave ? initStatus || 'COLLAPSED' : 'EDITING'
  )

  const getComponent = () => {
    switch (status) {
      case 'COLLAPSED':
        return <CollapsedCard card={card} setStatus={setStatus} />
      case 'EDITING':
        return <EditingCard card={card} setStatus={setStatus} />
      case 'EXPANDED':
        return (
          <ExpandedCard
            card={card}
            status={status}
            setStatus={setStatus}
            isLearning={isLearning}
          />
        )
      case 'FLIPPED':
        return (
          <ExpandedCard card={card} status={status} setStatus={setStatus} />
        )
    }
  }

  return <Container>{getComponent()}</Container>
}

const Container = styled.div`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.grey[300]};
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`

export default memo(CardItem)

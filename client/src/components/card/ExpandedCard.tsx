import React from 'react'
import { ICard, ICardStatus } from 'src/types/card.type'
import styled from 'styled-components'
import OutsideClickListener from '../util/OutsideClickListener'

interface ExpandedCardProps {
  card: ICard
  status: ICardStatus
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
}

const ExpandedCard = ({ card, status, setStatus }: ExpandedCardProps) => {
  const handleOutsideClick = () => {
    setStatus('COLLAPSED')
  }

  return (
    <OutsideClickListener onOutsideClick={handleOutsideClick}>
      <Container>{status === 'EXPANDED' ? 'expanded' : 'flipped'}</Container>
    </OutsideClickListener>
  )
}

const Container = styled.div``

export default ExpandedCard

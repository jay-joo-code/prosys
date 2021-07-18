import React from 'react'
import { useUpdateCardById } from 'src/api/card'
import styled from 'styled-components'

interface CardIsLearningProps {
  cid: string
  isLearning: boolean
}

const CardIsLearning = ({ cid, isLearning }: CardIsLearningProps) => {
  const { updateCard } = useUpdateCardById(cid)
  const handleClick = () => {
    updateCard({
      _id: cid,
      isLearning: !isLearning,
    })
  }

  return (
    <Container isLearning={isLearning} onClick={handleClick}>
      {isLearning ? 'Learning' : 'Archived'}
    </Container>
  )
}

interface ContainerProps {
  isLearning: boolean
}

const Container = styled.div<ContainerProps>`
  font-size: 0.8rem;
  font-weight: 600;
  border: 2px solid ${(props) => props.theme.danger[400]};
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  color: ${(props) => props.theme.danger[400]};

  // isLearning
  color: ${(props) => props.isLearning && props.theme.success[400]};
  border-color: ${(props) => props.isLearning && props.theme.success[400]};
`

export default CardIsLearning

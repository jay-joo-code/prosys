import React, { useEffect, useState } from 'react'
import { ICard, ICardStatus, ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'
import Text from '../fonts/Text'
import CodableTextarea from '../form-elements/CodableTextarea'
import CardToolBar from './CardToolbar'

interface EditingCardProps {
  card: ICard
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
}

const EditingCard = ({ card, setStatus }: EditingCardProps) => {
  const [questionBlocks, setQuestionBlocks] = useState<ICodableTextareaBlock[]>(
    []
  )
  const [answerBlocks, setAnswerBlocks] = useState<ICodableTextareaBlock[]>([])

  useEffect(() => {
    setQuestionBlocks(card?.question)
    setAnswerBlocks(card?.answer)
  }, [card])

  return (
    <Container>
      <CardToolBar
        card={card}
        status='EDITING'
        setStatus={setStatus}
        questionBlocks={questionBlocks}
        answerBlocks={answerBlocks}
      />
      <Section>
        <SectionTitle variant='h4'>Question</SectionTitle>
        <CodableTextarea
          blocks={questionBlocks}
          setBlocks={setQuestionBlocks}
        />
      </Section>
      <Section>
        <SectionTitle variant='h4'>Answer</SectionTitle>
        <CodableTextarea blocks={answerBlocks} setBlocks={setAnswerBlocks} />
      </Section>
    </Container>
  )
}

const Container = styled.div``

const Section = styled.div`
  margin: 1rem 0;
`

const SectionTitle = styled(Text)`
  margin-bottom: 0.5rem;
`

export default EditingCard

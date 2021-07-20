import React, { useEffect, useState } from 'react'
import { useUpdateCardById } from 'src/api/card'
import { ICard, ICardStatus, ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
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

  const { updateCard } = useUpdateCardById(card?._id, {
    isNotRefetchOnSettle: true,
    isNotUpdateLocal: true,
  })

  const [debouncedQuestion] = useDebounce(questionBlocks, 500)
  const [debouncedAnswer] = useDebounce(answerBlocks, 500)

  useEffect(() => {
    updateCard({
      question: debouncedQuestion,
    })
  }, [debouncedQuestion])

  useEffect(() => {
    updateCard({
      answer: debouncedAnswer,
    })
  }, [debouncedAnswer])

  return (
    <Container>
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
      <CardToolBar
        card={card}
        status='EDITING'
        setStatus={setStatus}
        questionBlocks={questionBlocks}
        answerBlocks={answerBlocks}
      />
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

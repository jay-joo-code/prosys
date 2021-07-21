import React, { useEffect, useState } from 'react'
import { useUpdateCardById } from 'src/api/card'
import { ICard, ICardStatus, ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import Text from '../fonts/Text'
import CodableTextarea from '../form-elements/CodableTextarea'
import Space from '../layout/Space'
import CardActionButtons from './CardActionButtons'
import CardToolBar from './CardToolbar'

interface EditingCardProps {
  card: ICard
  status: ICardStatus
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
  refetchCards: () => void
}

const EditingCard = ({
  card,
  status,
  setStatus,
  refetchCards,
}: EditingCardProps) => {
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
        <CardActionButtons
          card={card}
          status={status}
          setStatus={setStatus}
          questionBlocks={questionBlocks}
          refetchCards={refetchCards}
        />
      </Section>
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
      <Space padding='.5rem 0' />
      <CardToolBar card={card} status='EDITING' />
    </Container>
  )
}

const Container = styled.div`
  padding: 0 0.5rem 0.5rem 0.5rem;
`

const Section = styled.div`
  margin: 1rem 0;
`

const SectionTitle = styled(Text)`
  margin-bottom: 0.5rem;
`

export default EditingCard

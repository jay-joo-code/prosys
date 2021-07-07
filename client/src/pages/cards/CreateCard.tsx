import React, { useState } from 'react'
import CodableTextarea from 'src/components/form-elements/CodableTextarea'
import { ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'

interface CreateCardProps {}

const CreateCard = ({}: CreateCardProps) => {
  const [blocks, setBlocks] = useState<ICodableTextareaBlock[]>([
    {
      type: 'TEXT',
      value: '',
    },
  ])

  return (
    <Container>
      <CodableTextarea blocks={blocks} setBlocks={setBlocks} />
    </Container>
  )
}

const Container = styled.div``

export default CreateCard

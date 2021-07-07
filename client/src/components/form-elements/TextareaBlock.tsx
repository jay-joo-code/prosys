import React, { memo } from 'react'
import { ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'
import BlockWrapper from '../BlockWrapper'
import Textarea from './Textarea'

interface TextareaBlockProps {
  idx: number
  value: string
  setBlocks: React.Dispatch<React.SetStateAction<ICodableTextareaBlock[]>>
}

const TextareaBlock = ({ idx, value, setBlocks }: TextareaBlockProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlocks((blocks) =>
      blocks.map((block, i) => (idx === i ? { type: 'TEXT', value: event.target.value } : block))
    )
  }

  return (
    <BlockWrapper idx={idx} setBlocks={setBlocks} isCodeBlock={false}>
      <StyledTextarea value={value} onChange={handleChange} />
    </BlockWrapper>
  )
}

const StyledTextarea = styled(Textarea)`
  border: none;
  padding: 0;
  padding-left: 1px;
  resize: none;
`

export default memo(TextareaBlock)

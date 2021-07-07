import React from 'react'
import useKeypress from 'src/hooks/useKeyPress'
import { ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'
import CodeBlock from './CodeBlock'
import TextareaBlock from './TextareaBlock'

interface CodableTextareaProps {
  blocks: ICodableTextareaBlock[]
  setBlocks: React.Dispatch<React.SetStateAction<ICodableTextareaBlock[]>>
}

const CodableTextarea = ({ blocks, setBlocks }: CodableTextareaProps) => {
  // add code block
  useKeypress(['c', 'ㅊ'], (event) => {
    if (event.ctrlKey) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      setBlocks((blocks) => [
        ...blocks,
        {
          type: 'CODE',
          value: '',
        },
      ])
    }
  })

  // add text block
  useKeypress(['t', 'ㅅ'], (event) => {
    if (event.ctrlKey) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      setBlocks((blocks) => [
        ...blocks,
        {
          type: 'TEXT',
          value: '',
        },
      ])
    }
  })

  return (
    <Container>
      {blocks.map((block, idx) => {
        if (block.type === 'TEXT') {
          return (
            <TextareaBlock
              key={`${idx}${block.type}`}
              value={block.value}
              setBlocks={setBlocks}
              idx={idx}
            />
          )
        } else {
          return (
            <CodeBlock
              key={`${idx}${block.type}`}
              value={block.value}
              setBlocks={setBlocks}
              idx={idx}
            />
          )
        }
      })}
    </Container>
  )
}

const Container = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  border: 2px solid ${(props) => props.theme.border.default};
  border-radius: 6px;

  & > * {
    margin-bottom: 0.5rem;
  }
`

export default CodableTextarea

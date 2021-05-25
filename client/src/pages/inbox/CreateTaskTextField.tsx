import React, { useRef, useState } from 'react'
import { useCreateTask } from 'src/api/task'
import TextField from 'src/components/form-elements/TextField'
import useKeyPress from 'src/hooks/useKeyPress'
import { IInboxState } from 'src/types/task.type'
import styled from 'styled-components'

interface CreateTaskTextFieldProps {
  focusIdx: number
  setFocusIdx: (value: number) => void
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const CreateTaskTextField = ({ focusIdx, setFocusIdx, inboxState, setInboxState }: CreateTaskTextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // create task
  const { createTask } = useCreateTask()
  const [name, setName] = useState<string>('')

  const handleCreateTask = async () => {
    try {
      if (document.activeElement === inputRef?.current) {
        createTask({
          name,
          due: new Date(),
          createdAt: new Date(),
        })
        setName('')
      }
    } catch (error) {
      console.log('error.message.data :>> ', error.message.data)
    }
  }

  // state / focus handling
  const handleFocus = () => {
    setInboxState('CREATE')
  }

  const handleBlur = () => {
    setInboxState('NAVIGATE')
  }

  useKeyPress('Escape', () => {
    if (document.activeElement === inputRef?.current) {
      inputRef.current?.blur()
    } else if (inboxState === 'NAVIGATE') {
      inputRef.current?.focus()
    }
  })

  useKeyPress('ArrowDown', () => {
    if (document.activeElement === inputRef?.current) {
      setFocusIdx(0)
      inputRef.current?.blur()
    }
  })

  useKeyPress('ArrowUp', () => {
    if (focusIdx === 0 && inboxState === 'NAVIGATE') {
      inputRef.current?.focus()
    }
  })

  return (
    <Container>
      <TextField
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onEnterPress={handleCreateTask}
        onFocus={handleFocus}
        onBlur={handleBlur}
        fullWidth
        autoFocus
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%
`

export default CreateTaskTextField

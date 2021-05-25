import React, { useRef, useState, useEffect } from 'react'

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
  useEffect(() => {
    if (inboxState === 'CREATE') {
      inputRef.current?.focus()
    } else if (document.activeElement === inputRef?.current) {
      inputRef.current?.blur()
    }
  }, [inboxState])

  const handleFocus = () => {
    setInboxState('CREATE')
  }

  const handleBlur = () => {
    setInboxState('NAVIGATE')
  }

  useKeyPress('Escape', (event) => {
    if (document.activeElement === inputRef?.current) {
      event.preventDefault()
      setInboxState('NAVIGATE')
    } else if (inboxState === 'NAVIGATE') {
      event.preventDefault()
      setInboxState('CREATE')
    }
  })

  useKeyPress('ArrowDown', (event) => {
    if (document.activeElement === inputRef?.current) {
      event.preventDefault()
      setFocusIdx(0)
      setInboxState('NAVIGATE')
    }
  })

  useKeyPress('ArrowUp', (event) => {
    if (focusIdx === 0 && inboxState === 'NAVIGATE') {
      event.preventDefault()
      setInboxState('CREATE')
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
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%
`

export default CreateTaskTextField

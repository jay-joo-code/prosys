import ObjectID from 'bson-objectid'
import React, { useEffect, useRef, useState } from 'react'
import { useCreateInboxTask } from 'src/api/task'
import TextField from 'src/components/form-elements/TextField'
import useFirstTaskId from 'src/hooks/useFirstTaskId'
import useKeyPress from 'src/hooks/useKeyPress'
import { IInboxState } from 'src/types/task.type'
import styled from 'styled-components'

interface CreateTaskTextFieldProps {
  focusId: string | undefined
  setFocusId: (value: string | undefined) => void
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const CreateTaskTextField = ({
  focusId,
  setFocusId,
  inboxState,
  setInboxState,
}: CreateTaskTextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const firstTaskId = useFirstTaskId()

  // create task
  const { createInboxTask } = useCreateInboxTask()
  const [name, setName] = useState<string>('')

  const handleCreateTask = async () => {
    try {
      if (document.activeElement === inputRef?.current && name !== '') {
        const newTaskId = new ObjectID().toHexString()
        createInboxTask({
          _id: newTaskId,
          name,
          due: null,
          createdAt: new Date(),
        })
        setName('')
      }
    } catch (error) {
      console.log('error', error)
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
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      setInboxState('NAVIGATE')
    } else if (inboxState === 'NAVIGATE') {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      setInboxState('CREATE')
    }
  })

  useKeyPress('ArrowDown', (event) => {
    if (document.activeElement === inputRef?.current) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      setFocusId(firstTaskId)
      setInboxState('NAVIGATE')
    }
  })

  useKeyPress('ArrowUp', (event) => {
    if (focusId === firstTaskId && inboxState === 'NAVIGATE') {
      event.stopPropagation()
      event.stopImmediatePropagation()
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
  width: 100%;
`

export default CreateTaskTextField

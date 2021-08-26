import ObjectID from 'bson-objectid'
import React, { useEffect, useRef, useState } from 'react'
import { useCreateTask } from 'src/api/task'
import TextField from 'src/components/form-elements/TextField'
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

  // create task
  const { createTask } = useCreateTask({
    due: null,
    isTimed: false,
  })
  const [name, setName] = useState<string>('')

  const handleCreateTask = async () => {
    try {
      if (document.activeElement === inputRef?.current && name !== '') {
        const newTaskId = new ObjectID().toHexString()
        createTask({
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

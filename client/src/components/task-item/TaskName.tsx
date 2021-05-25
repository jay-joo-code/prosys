import React, { ChangeEvent, useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useKeyPress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import styled from 'styled-components'
import Text from '../fonts/Text'

interface TaskNameProps {
  task: ITask
  isFocused: boolean
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskName = ({ task, isFocused, inboxState, setInboxState }: TaskNameProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)

  useKeyPress(['e', 'ㄷ'], (event: KeyboardEvent) => {
    if (isFocused && inboxState === 'NAVIGATE') {
      event.preventDefault()
      setInboxState('EDIT_NAME')
    }
  })

  useKeyPress(['Enter', 'Escape'], (event) => {
    if (isFocused && inboxState === 'EDIT_NAME') {
      event.preventDefault()
      setInboxState('NAVIGATE')
      updateInboxTask({
        _id: task?._id,
        name: inputValue,
      })
    }
  })

  // input
  const [inputValue, setInputValue] = useState<string>(task?.name)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <Container>
      {(isFocused && inboxState === 'EDIT_NAME')
        ? <NameTextField
            value={inputValue}
            onChange={handleInputChange}
            autoFocus
          />
        : (
          <Text
            variant='p'
            nowrap
            ellipsis
          >{task.name}
          </Text>
          )
      }
    </Container>
  )
}

const Container = styled.div`
  height: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-right: 1rem;
`

const NameTextField = styled.input`
  font-size: inherit;
  letter-spacing: .5px;
  width: 100%;
  padding: 0;
  margin: 0;
`

export default TaskName

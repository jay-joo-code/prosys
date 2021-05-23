import React, { ChangeEvent, useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useKeyPress from 'src/hooks/useKeyPress'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'
import Text from '../fonts/Text'

interface TaskNameProps {
  task: ITask
  isFocused: boolean
  setIsListDisabled: (value: boolean) => void
}

const TaskName = ({ task, isFocused, setIsListDisabled }: TaskNameProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  useKeyPress('e', (event: KeyboardEvent) => {
    if (isFocused && !isEditMode) {
      event.preventDefault()
      setIsEditMode(true)
      setIsListDisabled(true)
    }
  })

  useKeyPress('Enter', () => {
    if (isEditMode) {
      setIsEditMode(false)
      setIsListDisabled(false)
      updateInboxTask({
        _id: task?._id,
        name: inputValue,
      })
    }
  })

  useKeyPress('Escape', () => {
    if (isEditMode) {
      setIsEditMode(false)
      setIsListDisabled(true)
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
      {isEditMode
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

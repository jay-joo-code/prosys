import React, { ChangeEvent, useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useIsMobile from 'src/hooks/useIsMobile'
import useKeyPress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import styled from 'styled-components'
import Text from '../fonts/Text'
import OutsideClickListener from '../util/OutsideClickListener'

interface TaskNameProps {
  task: ITask
  isFocused: boolean
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskName = ({ task, isFocused, inboxState, setInboxState }: TaskNameProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)

  // mobile
  const isMobile = useIsMobile()

  const handleClick = () => {
    if (isMobile && inboxState === 'NAVIGATE') {
      setInboxState('EDIT_NAME')
    }
  }

  const handleOutsideClick = () => {
    if (isMobile && isFocused && inboxState === 'EDIT_NAME') {
      setInboxState('NAVIGATE')
    }
  }

  // state handling
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
    <OutsideClickListener
      onOutsideClick={handleOutsideClick}
      isListening
    >
      <Container onClick={handleClick}>
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
    </OutsideClickListener>
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

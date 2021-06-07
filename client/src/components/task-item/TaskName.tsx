import React, { ChangeEvent, useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useisTablet from 'src/hooks/useisTablet'
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
  const [inputValue, setInputValue] = useState<string>(task?.name)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const updateName = () => {
    setInboxState('NAVIGATE')
    updateInboxTask({
      _id: task?._id,
      name: inputValue,
    })
  }

  // mobile
  const isTablet = useisTablet()

  const handleClick = () => {
    if (isTablet && inboxState === 'NAVIGATE') {
      setInboxState('EDIT_NAME')
    }
  }

  const handleOutsideClick = () => {
    if (isTablet && isFocused && inboxState === 'EDIT_NAME') {
      updateName()
    }
  }

  const handleBlur = () => {
    if (isTablet && isFocused && inboxState === 'EDIT_NAME') {
      updateName()
    }
  }

  // state handling
  useKeyPress(['e', 'ㄷ', 'Enter'], (event: KeyboardEvent) => {
    if (isFocused && inboxState === 'NAVIGATE' && !(event.metaKey || event.ctrlKey)) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      setInboxState('EDIT_NAME')
    }
  })

  useKeyPress(['Enter', 'Escape'], (event) => {
    if (isFocused && inboxState === 'EDIT_NAME') {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      updateName()
    }
  })

  return (
    <FullWidthParent>
      <OutsideClickListener
        onOutsideClick={handleOutsideClick}
        isListening
      >
        <Container onClick={handleClick}>
          {(isFocused && inboxState === 'EDIT_NAME')
        ? <NameTextField
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
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
    </FullWidthParent>
  )
}

const FullWidthParent = styled.div`
  flex: 2;
  overflow: hidden;

  & > div {
    width: 100%;
  }
`

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

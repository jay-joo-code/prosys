import React from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useKeyPress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import styled from 'styled-components'

interface TaskIsCompleteProps {
  task: ITask
  isFocused: boolean
  inboxState: IInboxState
}

const TaskIsComplete = ({ task, isFocused, inboxState }: TaskIsCompleteProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)

  useKeyPress(' ', (event) => {
    if (isFocused && inboxState === 'NAVIGATE') {
      event.preventDefault()
      updateInboxTask({
        _id: task?._id,
        isComplete: !task?.isComplete,
      })
    }
  })

  return (
    <Container
      isComplete={task?.isComplete}
      isInverted={isFocused && inboxState === 'NAVIGATE'}
    />
  )
}

interface ContainerProps {
  isComplete: boolean
  isInverted: boolean
}

const Container = styled.div<ContainerProps>`
  border: 2px solid ${props => props.theme.border.default};
  border-radius: 50%;
  height: 15px;
  width: 15px;

  // isComplete
  background: ${props => props.isComplete && props.theme.brand[300]};

  // isInverted
  border-color: ${props => props.isInverted && props.theme.bg.default};
`

export default TaskIsComplete

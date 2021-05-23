import React from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useKeyPress from 'src/hooks/useKeyPress'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'

interface TaskIsCompleteProps {
  task: ITask
  isFocused: boolean
}

const TaskIsComplete = ({ task, isFocused }: TaskIsCompleteProps) => {
  useKeyPress(' ', (event) => {
    if (isFocused) {
      event.preventDefault()
      updateInboxTask({
        _id: task?._id,
        isComplete: !task?.isComplete,
      })
    }
  })

  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)

  return (
    <Container isComplete={task?.isComplete} />
  )
}

interface ContainerProps {
  isComplete: boolean
}

const Container = styled.div<ContainerProps>`
  border: 2px solid ${props => props.theme.border.default};
  border-radius: 50%;
  height: 15px;
  width: 15px;

  // isComplete
  background: ${props => props.isComplete && props.theme.brand[500]};
`

export default TaskIsComplete

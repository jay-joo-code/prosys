import LoopIcon from '@material-ui/icons/Loop'
import React from 'react'
import { useUpdateArchiveTaskById, useUpdateInboxTaskById } from 'src/api/task'
import useKeyPress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import styled from 'styled-components'
import TaskCalendarIcon from './TaskCalendarIcon'

interface TaskIsCompleteProps {
  task: ITask
  isFocused: boolean
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
  focusNextTask: () => void
}

const TaskIsComplete = ({
  task,
  isFocused,
  inboxState,
  setInboxState,
  focusNextTask,
}: TaskIsCompleteProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id, {
    refetchOnSettle: true,
  })
  const { updateArchiveTask } = useUpdateArchiveTaskById(task?._id, {
    refetchOnSettle: true,
  })

  const toggleIsComplete = () => {
    if (task?.isArchived) {
      updateArchiveTask({
        _id: task?._id,
        isComplete: !task?.isComplete,
      })
    } else {
      updateInboxTask({
        _id: task?._id,
        isComplete: !task?.isComplete,
      })
    }
    setInboxState('NAVIGATE')
  }

  useKeyPress(' ', (event) => {
    if (isFocused && inboxState === 'NAVIGATE' && !task?.isRecur) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      toggleIsComplete()
    }
  })

  useKeyPress(['r', 'ㄱ'], (event) => {
    if (
      isFocused &&
      inboxState === 'NAVIGATE' &&
      !(event.metaKey || event.ctrlKey) &&
      task?.due &&
      !task?.isArchived
    ) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      updateInboxTask({
        _id: task?._id,
        isRecur: !task?.isRecur,
      })
    }
  })

  return (
    <Container>
      {task?.provider === 'google' ? (
        <TaskCalendarIcon />
      ) : task?.isRecur ? (
        <StyledLoopIcon />
      ) : (
        <IsCompleteCheckbox
          isComplete={task?.isComplete}
          isInverted={isFocused && inboxState === 'NAVIGATE'}
          onClick={toggleIsComplete}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 18px;
  height: 18px;
`

interface isCompleteCheckboxProps {
  isComplete: boolean
  isInverted: boolean
}

const IsCompleteCheckbox = styled.div<isCompleteCheckboxProps>`
  border: 2px solid ${(props) => props.theme.grey[400]};
  border-radius: 50%;
  height: 15px;
  width: 15px;

  // isComplete
  background: ${(props) => props.isComplete && props.theme.brand[300]};

  // isInverted
  border-color: ${(props) => props.isInverted && props.theme.grey[500]};
`

const StyledLoopIcon = styled(LoopIcon)`
  fill: ${(props) => props.theme.grey[700]} !important;
  width: 17px !important;
  height: 17px !important;
`

export default TaskIsComplete

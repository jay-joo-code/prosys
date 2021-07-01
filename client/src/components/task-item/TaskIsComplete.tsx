import React from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useKeyPress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import styled from 'styled-components'
import LoopIcon from '@material-ui/icons/Loop'
import useIsArchive from 'src/hooks/useIsArchive'

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

  const toggleIsComplete = () => {
    updateInboxTask({
      _id: task?._id,
      isComplete: !task?.isComplete,
    })
    setInboxState('NAVIGATE')
  }

  useKeyPress(' ', (event) => {
    if (isFocused && inboxState === 'NAVIGATE' && !task?.isRecur && !task?.isArchived) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      toggleIsComplete()
    }
  })

  useKeyPress(['r', 'ㄱ'], (event) => {
    if (isFocused && inboxState === 'NAVIGATE' && !(event.metaKey || event.ctrlKey) && task?.due) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      updateInboxTask({
        _id: task?._id,
        isRecur: !task?.isRecur,
      })
    }
  })

  const isArchive = useIsArchive()

  if (isArchive) return null

  return (
    <Container>
      {task?.isRecur ? (
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
  width: 20px;
  height: 20px;
`

interface isCompleteCheckboxProps {
  isComplete: boolean
  isInverted: boolean
}

const IsCompleteCheckbox = styled.div<isCompleteCheckboxProps>`
  border: 2px solid ${(props) => props.theme.border.default};
  border-radius: 50%;
  height: 15px;
  width: 15px;

  // isComplete
  background: ${(props) => props.isComplete && props.theme.brand[300]};

  // isInverted
  border-color: ${(props) => props.isInverted && props.theme.bg.default};
`

const StyledLoopIcon = styled(LoopIcon)`
  fill: ${(props) => props.theme.grey[700]} !important;
  width: 17px !important;
  height: 17px !important;
`

export default TaskIsComplete

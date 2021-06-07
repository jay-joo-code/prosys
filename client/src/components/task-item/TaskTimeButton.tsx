import React from 'react'
import styled from 'styled-components'
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined'
import useisTablet from 'src/hooks/useisTablet'
import { IInboxState, ITask } from 'src/types/task.type'
import { isTaskTimeSet } from 'src/util/task'

interface TaskTimeButtonProps {
  isFocused: boolean
  task: ITask
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskTimeButton = ({ isFocused, task, inboxState, setInboxState }: TaskTimeButtonProps) => {
  const isTablet = useisTablet()

  const handleClick = () => {
    setInboxState('EDIT_TIME')
  }

  if (!isTablet || !isFocused || inboxState !== 'NAVIGATE' || isTaskTimeSet(task)) return null

  return (
    <Container>
      <WatchLaterOutlinedIcon onClick={handleClick} />
    </Container>
  )
}

const Container = styled.div`
  color: ${props => props.theme.grey[700]};
`

export default TaskTimeButton

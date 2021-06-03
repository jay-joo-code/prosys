import React, { memo } from 'react'
import useIsMobile from 'src/hooks/useIsMobile'
import { IInboxState, ITask } from 'src/types/task.type'
import { getDateStamp } from 'src/util/date'
import styled from 'styled-components'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import TaskCalendarIcon from './TaskCalendarIcon'
import TaskDue from './TaskDue'
import TaskIsComplete from './TaskIsComplete'
import TaskName from './TaskName'
import TaskNotes from './TaskNotes'
import TaskTime from './TaskTime'
import TaskTimeButton from './TaskTimeButton'

interface TaskItemProps {
  task: ITask
  isSelected: boolean
  isFocused: boolean
  idx: number
  setFocusIdx: (idx: number) => void
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskItem = ({ task, isSelected, isFocused, idx, setFocusIdx, inboxState, setInboxState }: TaskItemProps) => {
  const isMobile = useIsMobile()

  const handleClick = (event: React.MouseEvent) => {
    if (!isMobile) event.preventDefault()
    setFocusIdx(idx)
  }

  const scrollToFocused = (instance: HTMLDivElement) => {
    if (!isMobile && instance && isFocused && inboxState === 'NAVIGATE') {
      instance.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Container
      ref={scrollToFocused}
      isSelected={isSelected}
      isHighlighted={inboxState === 'NAVIGATE' && isFocused}
      onClick={handleClick}
    >
      <FlexRow alignStart>
        <div>
          <Space padding='.15rem 0' />
          {task?.provider === 'google'
            ? <TaskCalendarIcon />
            : <TaskIsComplete
                task={task}
                isFocused={isFocused}
                inboxState={inboxState}
              />
          }
        </div>
        <Space padding='0 .2rem' />
        <FullWidth>
          <FlexRow
            alignCenter
            fullWidth
          >
            <TaskTime
              isFocused={isFocused}
              task={task}
              inboxState={inboxState}
              setInboxState={setInboxState}
            />
            <Space padding='0 .1rem' />
            <TaskName
              isFocused={isFocused}
              task={task}
              inboxState={inboxState}
              setInboxState={setInboxState}
            />
            <TaskTimeButton
              isFocused={isFocused}
              task={task}
              inboxState={inboxState}
              setInboxState={setInboxState}
            />
          </FlexRow>
          <TaskNotes
            isFocused={isFocused}
            task={task}
            inboxState={inboxState}
            setInboxState={setInboxState}
          />
          <TaskDue
            isFocused={isFocused}
            task={task}
            inboxState={inboxState}
            setInboxState={setInboxState}
          />
        </FullWidth>
      </FlexRow>
    </Container>
  )
}

interface ContainerProps {
  isSelected: boolean
  isHighlighted: boolean
}

const Container = styled.div<ContainerProps>`
  padding: .5rem;
  border-radius: 4px;
  cursor: pointer;

  // isSelected
  background: ${props => props.isSelected && props.theme.brand[100]};

  // isHighlighted
  background: ${props => props.isHighlighted && props.theme.brand[50]};
`

const FullWidth = styled.div`
  flex: 2;
  overflow: hidden;
`

export default memo(TaskItem)

import React from 'react'
import { IInboxState, ITask } from 'src/types/task.type'
import styled from 'styled-components'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import TaskDue from './TaskDue'
import TaskIsComplete from './TaskIsComplete'
import TaskName from './TaskName'
import TaskNotes from './TaskNotes'
import TaskTime from './TaskTime'

interface TaskItemProps {
  task: ITask
  isSelected: boolean
  isFocused: boolean
  idx: number
  setIsListDisabled: (value: boolean) => void
  setFocusIdx: (idx: number) => void
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskItem = ({ task, isSelected, isFocused, idx, setIsListDisabled, setFocusIdx, inboxState, setInboxState }: TaskItemProps) => {
  const handleClick = () => {
    setFocusIdx(idx)
  }

  const scrollToFocused = (instance: HTMLDivElement) => {
    if (instance && isFocused) {
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
          <Space padding='.17rem 0' />
          <TaskIsComplete
            task={task}
            isFocused={isFocused}
            inboxState={inboxState}
          />
        </div>
        <Space padding='0 .2rem' />
        <FullWidth>
          <FlexRow alignCenter>
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

  // isSelected
  background: ${props => props.isSelected && props.theme.brand[100]};

  // isHighlighted
  background: ${props => props.isHighlighted && props.theme.brand[50]};
`

const FullWidth = styled.div`
  width: 100%;
`

export default TaskItem

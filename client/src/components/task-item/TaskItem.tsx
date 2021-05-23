import React from 'react'
import { ITask } from 'src/types/task.type'
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
}

const TaskItem = ({ task, isSelected, isFocused, idx, setIsListDisabled, setFocusIdx }: TaskItemProps) => {
  const handleClick = () => {
    setFocusIdx(idx)
  }

  return (
    <Container
      isSelected={isSelected}
      isFocused={isFocused}
      onClick={handleClick}
    >
      <FlexRow alignStart>
        <div>
          <Space padding='.17rem 0' />
          <TaskIsComplete
            task={task}
            isFocused={isFocused}
          />
        </div>
        <Space padding='0 .2rem' />
        <FullWidth>
          <FlexRow alignCenter>
            <TaskTime
              isFocused={isFocused}
              task={task}
              setIsListDisabled={setIsListDisabled}
            />
            <Space padding='0 .1rem' />
            <TaskName
              isFocused={isFocused}
              task={task}
              setIsListDisabled={setIsListDisabled}
            />
          </FlexRow>
          <TaskNotes
            isFocused={isFocused}
            task={task}
            setIsListDisabled={setIsListDisabled}
          />
          <TaskDue
            isFocused={isFocused}
            task={task}
            setIsListDisabled={setIsListDisabled}
          />
        </FullWidth>
      </FlexRow>
    </Container>
  )
}

interface ContainerProps {
  isSelected: boolean
  isFocused: boolean
}

const Container = styled.div<ContainerProps>`
  padding: .5rem;
  border-radius: 4px;

  // isSelected
  background: ${props => props.isSelected && props.theme.brand[100]};

  // isFocused
  background: ${props => props.isFocused && props.theme.brand[50]};
`

const FullWidth = styled.div`
  width: 100%;
`

export default TaskItem

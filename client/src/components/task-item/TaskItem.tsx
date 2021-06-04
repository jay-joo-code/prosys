import mongoose from 'mongoose'
import React, { memo } from 'react'
import { useCreateTask } from 'src/api/task'
import useIsMobile from 'src/hooks/useIsMobile'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import { incrementTimeStamp } from 'src/util/task'
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
  setFocusId: (value: string | undefined) => void
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
  focusNextTask: () => void
  isFirstTimeStampedTask: boolean
}

const TaskItem = ({ task, isSelected, isFocused, idx, setFocusId, inboxState, setInboxState, focusNextTask, isFirstTimeStampedTask }: TaskItemProps) => {
  const isMobile = useIsMobile()
  const { createTask } = useCreateTask()

  const handleClick = (event: React.MouseEvent) => {
    if (!isMobile) event.stopPropagation()
    event.preventDefault()
    setFocusId(task?._id)
  }

  const scrollToFocused = (instance: HTMLDivElement) => {
    if (!isMobile && instance && isFocused && inboxState === 'NAVIGATE') {
      instance.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // create task above
  useKeypress('Enter', (event) => {
    if (isFocused && inboxState === 'NAVIGATE' && (event.metaKey || event.ctrlKey)) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      const newTaskId = mongoose.Types.ObjectId().toString()
      createTask({
        _id: newTaskId,
        name: '',
        due: task?.due,
        createdAt: new Date(),
        startTime: incrementTimeStamp(task?.startTime),
        endTime: incrementTimeStamp(task?.endTime),
      })
      setFocusId(newTaskId)
      setInboxState('EDIT_NAME')
    }
  })

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
                setInboxState={setInboxState}
                focusNextTask={focusNextTask}
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

import ObjectID from 'bson-objectid'
import React, { memo } from 'react'
import {
  useToggleArchive,
  useCreateInboxTask,
  useUpdateInboxTaskById,
  useCreateArchiveTask,
} from 'src/api/task'
import useIsTablet from 'src/hooks/useIsTablet'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import { incrementTimeStamp, isTaskTimeSet } from 'src/util/task'
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
  setFocusId: (value: string | undefined) => void
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
  focusNextTask: () => void
  focusPrevTask: () => void
}

const TaskItem = ({
  task,
  isSelected,
  isFocused,
  idx,
  setFocusId,
  inboxState,
  setInboxState,
  focusNextTask,
  focusPrevTask,
}: TaskItemProps) => {
  const isTablet = useIsTablet()
  const { createInboxTask } = useCreateInboxTask()
  const { createArchiveTask } = useCreateArchiveTask()
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)
  const { toggleArchive } = useToggleArchive(task?._id)

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setFocusId(task?._id)
  }

  const scrollToFocused = (instance: HTMLDivElement) => {
    if (!isTablet && instance && isFocused && inboxState === 'NAVIGATE') {
      instance.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // create task below or above
  useKeypress('Enter', (event) => {
    if (
      isFocused &&
      inboxState === 'NAVIGATE' &&
      (event.metaKey || event.ctrlKey)
    ) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      const newTaskId = new ObjectID().toHexString()

      if (task?.isArchived) {
        createArchiveTask({
          _id: newTaskId,
          name: '',
          due: task?.due,
          createdAt: new Date(),
          startTime: incrementTimeStamp(task?.startTime),
          endTime: incrementTimeStamp(task?.endTime),
          isArchived: true,
        })
      } else {
        createInboxTask({
          _id: newTaskId,
          name: '',
          due: task?.due,
          createdAt: new Date(),
          startTime: incrementTimeStamp(task?.startTime),
          endTime: incrementTimeStamp(task?.endTime),
        })
      }

      setFocusId(newTaskId)

      if (isTaskTimeSet(task)) {
        setInboxState('EDIT_TIME')
      } else {
        setInboxState('EDIT_NAME')
      }
    }
  })

  // send to backlog
  useKeypress(['b', 'ㅠ'], (event) => {
    if (isFocused && inboxState === 'NAVIGATE' && task?.provider !== 'google') {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      updateInboxTask({
        _id: task?._id,
        due: null,
        startTime: '0000',
        endTime: '0000',
      })
      focusNextTask()
    }
  })

  // send to archive
  useKeypress(['a', 'ㅁ'], (event) => {
    if (isFocused && inboxState === 'NAVIGATE' && task?.provider !== 'google') {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      if (task?.isArchived) {
        toggleArchive({
          _id: task?._id,
          isArchived: false,
        })
      } else {
        toggleArchive({
          _id: task?._id,
          isArchived: true,
          due: null,
          startTime: '0000',
          endTime: '0000',
        })
      }
      focusNextTask()
    }
  })

  return (
    <Container
      ref={scrollToFocused}
      isSelected={isSelected}
      isHighlighted={inboxState === 'NAVIGATE' && isFocused}
      onClick={handleClick}>
      <FlexRow alignStart>
        <div>
          <Space padding='.15rem 0' />
          <TaskIsComplete
            task={task}
            isFocused={isFocused}
            inboxState={inboxState}
            setInboxState={setInboxState}
            focusNextTask={focusNextTask}
          />
        </div>
        <Space padding='0 .2rem' />
        <FullWidth>
          <FlexRow alignStart fullWidth>
            <TaskTime
              isFocused={isFocused}
              task={task}
              inboxState={inboxState}
              setInboxState={setInboxState}
            />
            <Space padding='0 .1rem' />
            <FullWidth>
              <TaskName
                isFocused={isFocused}
                task={task}
                inboxState={inboxState}
                setInboxState={setInboxState}
              />
              {!isTablet && (
                <TaskNotes
                  isFocused={isFocused}
                  task={task}
                  inboxState={inboxState}
                  setInboxState={setInboxState}
                />
              )}
            </FullWidth>
          </FlexRow>
          {isTablet && (
            <TaskNotes
              isFocused={isFocused}
              task={task}
              inboxState={inboxState}
              setInboxState={setInboxState}
            />
          )}
          <TaskDue
            isFocused={isFocused}
            task={task}
            inboxState={inboxState}
            setInboxState={setInboxState}
            focusPrevTask={focusPrevTask}
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
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  // isSelected
  background: ${(props) => props.isSelected && props.theme.brand[100]};

  // isHighlighted
  background: ${(props) => props.isHighlighted && props.theme.brand[50]};
`

const FullWidth = styled.div`
  flex: 2;
  overflow: hidden;
`

export default memo(TaskItem)

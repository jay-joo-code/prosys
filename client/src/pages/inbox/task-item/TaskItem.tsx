import ObjectID from 'bson-objectid'
import React, { memo, useState } from 'react'
import { useCreateInboxTask, useUpdateInboxTaskById } from 'src/api/task'
import useIsTablet from 'src/hooks/useIsTablet'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import { incrementTimeStamp, isTaskTimeSet } from 'src/util/task'
import styled from 'styled-components'
import { FlexRow } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import TaskDue from './TaskDue'
import TaskIsComplete from './TaskIsComplete'
import TaskName from './TaskName'
import TaskNotes from './TaskNotes'
import TaskTime from './TaskTime'
import TaskBottomSheet from './TaskBottomSheet'

interface TaskItemProps {
  task: ITask
  // isSelected: boolean
  // isFocused: boolean
  // idx: number
  // setFocusId: (value: string | undefined) => void
  // inboxState: IInboxState
  // setInboxState: (state: IInboxState) => void
  // focusNextTask: () => void
  // focusPrevTask: () => void
}

const TaskItem = ({ task }: TaskItemProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)

  const scrollToFocused = (instance: HTMLDivElement) => {
    // if (
    //   !isTablet &&
    //   instance &&
    //   isFocused &&
    //   inboxState === 'NAVIGATE'
    // ) {
    //   instance.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'center',
    //   })
    // }
  }

  // create task below or above
  // useKeypress('Enter', (event) => {
  //   if (
  //     isFocused &&
  //     inboxState === 'NAVIGATE' &&
  //     (event.metaKey || event.ctrlKey)
  //   ) {
  //     event.stopPropagation()
  //     event.stopImmediatePropagation()
  //     event.preventDefault()
  //     const newTaskId = new ObjectID().toHexString()

  //     createInboxTask({
  //       _id: newTaskId,
  //       name: '',
  //       due: task?.due,
  //       createdAt: new Date(),
  //       startTime: incrementTimeStamp(task?.startTime),
  //       endTime: incrementTimeStamp(task?.endTime),
  //     })

  //     setFocusId(newTaskId)

  //     if (isTaskTimeSet(task)) {
  //       setInboxState('EDIT_TIME')
  //     } else {
  //       setInboxState('EDIT_NAME')
  //     }
  //   }
  // })

  // send to backlog
  // useKeypress(['b', 'ㅠ'], (event) => {
  //   if (
  //     isFocused &&
  //     inboxState === 'NAVIGATE' &&
  //     task?.provider !== 'google'
  //   ) {
  //     event.stopPropagation()
  //     event.stopImmediatePropagation()
  //     event.preventDefault()
  //     updateInboxTask({
  //       _id: task?._id,
  //       due: null,
  //       startTime: '0000',
  //       endTime: '0000',
  //     })
  //     focusNextTask()
  //   }
  // })

  // send to archive
  // useKeypress(['a', 'ㅁ'], (event) => {
  //   if (
  //     isFocused &&
  //     inboxState === 'NAVIGATE' &&
  //     task?.provider !== 'google'
  //   ) {
  //     event.stopPropagation()
  //     event.stopImmediatePropagation()
  //     event.preventDefault()
  //     if (task?.isArchived) {
  //       toggleArchive({
  //         _id: task?._id,
  //         isArchived: false,
  //       })
  //     } else {
  //       toggleArchive({
  //         _id: task?._id,
  //         isArchived: true,
  //         due: null,
  //         startTime: '0000',
  //         endTime: '0000',
  //       })
  //     }
  //     focusNextTask()
  //   }
  // })

  return (
    <>
      <Container
        ref={scrollToFocused}
        isFocused={false}
        // isHighlighted={inboxState === 'NAVIGATE' && isFocused}
        onClick={() => setIsBottomSheetOpen(true)}>
        <FlexRow alignStart>
          <div>
            <Space padding='.15rem 0' />
            {/* <TaskIsComplete
            task={task}
            isFocused={isFocused}
            inboxState={inboxState}
            setInboxState={setInboxState}
            focusNextTask={focusNextTask}
          /> */}
          </div>
          <Space padding='0 .2rem' />
          <FullWidth>
            <FlexRow alignStart fullWidth>
              {/* <TaskTime
              isFocused={isFocused}
              task={task}
              inboxState={inboxState}
              setInboxState={setInboxState}
            /> */}
              <Space padding='0 .1rem' />
              <FullWidth>
                <TaskName task={task} />
                {/* {!isTablet && (
                // <TaskNotes
                //   isFocused={isFocused}
                //   task={task}
                //   inboxState={inboxState}
                //   setInboxState={setInboxState}
                // />
              )} */}
              </FullWidth>
            </FlexRow>
            {/* {isTablet && (
            // <TaskNotes
            //   isFocused={isFocused}
            //   task={task}
            //   inboxState={inboxState}
            //   setInboxState={setInboxState}
            // />
          )} */}
            {/* <TaskDue
            isFocused={isFocused}
            task={task}
            inboxState={inboxState}
            setInboxState={setInboxState}
            focusPrevTask={focusPrevTask}
          /> */}
          </FullWidth>
        </FlexRow>
      </Container>
      <TaskBottomSheet
        task={task}
        isOpen={isBottomSheetOpen}
        onDismiss={() => setIsBottomSheetOpen(false)}
      />
    </>
  )
}

interface ContainerProps {
  isFocused: boolean
}

const Container = styled.div<ContainerProps>`
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.border.default};

  // isFocused
  background: ${(props) => props.isFocused && props.theme.brand[50]};
`

const FullWidth = styled.div`
  flex: 2;
  overflow: hidden;
`

export default memo(TaskItem)

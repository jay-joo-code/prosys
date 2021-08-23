import React, { memo, useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import theme from 'src/app/theme'
import Text from 'src/components/fonts/Text'
import { FlexRow } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import { ITask } from 'src/types/task.type'
import { isTaskTimeSet, isOneTaskTimeSet } from 'src/util/task'
import styled from 'styled-components'
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
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id, {
    due: new Date(task?.due as string),
    isTimed: isTaskTimeSet(task),
  })

  const handleToggleComplete = () => {
    updateInboxTask({
      _id: task?._id,
      isComplete: !task?.isComplete,
    })
  }

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

  return (
    <>
      <Container
        ref={scrollToFocused}
        isFocused={false}
        // isHighlighted={inboxState === 'NAVIGATE' && isFocused}
      >
        <FlexRow alignStart>
          <div onClick={handleToggleComplete}>
            <Space padding='.15rem 0' />
            <CheckboxContainer>
              <IsCompleteCheckbox isComplete={task?.isComplete} isInverted={false} />
            </CheckboxContainer>
          </div>
          <Space padding='0 .2rem' />
          <TaskText onClick={() => setIsBottomSheetOpen(true)}>
            {isOneTaskTimeSet(task) && (
              <Text variant='p' color={theme.text.light}>
                {task?.startTime} - {task?.endTime}
              </Text>
            )}
            <Text variant='p' color={task?.isComplete ? theme.text.light : theme.text.default}>
              {task?.name}
            </Text>
            <Text variant='h5' maxLines={2} color={theme.text.light}>
              {task?.notes}
            </Text>
          </TaskText>
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
  padding: 0.5rem 0;
  border-radius: 4px;
  cursor: pointer;

  // isFocused
  background: ${(props) => props.isFocused && props.theme.brand[50]};
`

const TaskText = styled.div`
  width: 100%;

  & > *:first-of-type {
    margin-bottom: 0.5rem;
  }
`

const CheckboxContainer = styled.div`
  width: 18px;
  height: 18px;
`

interface IIsCompleteCheckboxProps {
  isComplete: boolean
  isInverted: boolean
}

const IsCompleteCheckbox = styled.div<IIsCompleteCheckboxProps>`
  border: 2px solid ${(props) => props.theme.grey[500]};
  border-radius: 50%;
  height: 15px;
  width: 15px;

  // isComplete
  background: ${(props) => props.isComplete && props.theme.brand[300]};
  border-color: ${(props) => props.isComplete && props.theme.brand[300]};

  // isInverted
  border-color: ${(props) => props.isInverted && props.theme.grey[500]};
`

export default memo(TaskItem)

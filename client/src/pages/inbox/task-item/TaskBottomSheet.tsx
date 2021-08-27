import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import ObjectID from 'bson-objectid'
import CloseIcon from '@material-ui/icons/Close'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { useCreateTask, useUpdateAndMoveTask, useUpdateInboxTaskById } from 'src/api/task'
import theme from 'src/app/theme'
import ContainedButton from 'src/components/buttons/ContainedButton'
import IconButton from 'src/components/buttons/IconButton'
import TextButton from 'src/components/buttons/TextButton'
import Clickable from 'src/components/Clickable'
import Text from 'src/components/fonts/Text'
import DebouncedTextarea from 'src/components/form-elements/DebouncedTextarea'
import Input from 'src/components/form-elements/Input'
import { FlexRow } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import useIsDesktop from 'src/hooks/useIsDesktop'
import { ITask } from 'src/types/task.type'
import { isOneTaskTimeSet, incrementTimeStamp } from 'src/util/task'
import styled from 'styled-components'
import TaskDue from './TaskDue'

interface TaskBottomSheetProps {
  task: ITask
  isOpen: boolean
  onDismiss: () => void
}

const TaskBottomSheet = ({ task, isOpen, onDismiss }: TaskBottomSheetProps) => {
  const isDesktop = useIsDesktop()
  const isAutoSelect = isDesktop || import.meta.env.NODE_ENV !== 'development'
  const handleInputFocus = (
    event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    if (isAutoSelect) event.target.select()
  }

  const { updateInboxTask } = useUpdateInboxTaskById(task?._id, {
    due: task?.due ? new Date(task?.due) : null,
    isTimed: isOneTaskTimeSet(task),
  })

  const { updateAndMove } = useUpdateAndMoveTask(task?._id, {
    due: task?.due ? new Date(task?.due) : null,
    isTimed: isOneTaskTimeSet(task),
  })

  const handleSaveName = (value: string) => {
    updateInboxTask({
      _id: task?._id,
      name: value,
    })
  }

  const handleSaveNotes = (value: string) => {
    updateInboxTask({
      _id: task?._id,
      notes: value,
    })
  }

  const handleToggleComplete = () => {
    updateInboxTask({
      _id: task?._id,
      isComplete: !task?.isComplete,
    })
    if (!task?.isComplete) onDismiss()
  }

  const [localStartTime, setLocalStartTime] = useState<string>(task?.startTime)
  const [localEndTime, setLocalEndTime] = useState<string>(task?.endTime)
  const [localDue, setLocalDue] = useState<Date | null>(task?.due ? new Date(task?.due) : null)

  const handleDismiss = () => {
    updateAndMove({
      ...task,
      startTime: localDue ? localStartTime : '0000',
      endTime: localDue ? localEndTime : '0000',
      due: localDue,
    })

    onDismiss()
  }

  const handleResetTime = () => {
    setLocalStartTime('0000')
    setLocalEndTime('0000')
  }

  const { createTask } = useCreateTask({
    due: task?.due ? new Date(task?.due) : null,
    isTimed: isOneTaskTimeSet(task),
  })

  const addTaskBelow = () => {
    const newTaskId = new ObjectID().toHexString()
    createTask({
      _id: newTaskId,
      name: '',
      due: task?.due,
      createdAt: new Date(),
      startTime: task?.endTime,
      endTime: incrementTimeStamp(task?.endTime),
    })
    handleDismiss()
  }

  return (
    <OuterContainer>
      <StyledBottomSheet
        open={isOpen}
        defaultSnap={({ maxHeight }) => maxHeight / 2}
        snapPoints={({ maxHeight }) => [maxHeight * 0.8, maxHeight * 0.4]}
        onDismiss={handleDismiss}
        expandOnContentDrag
        initialFocusRef={false}>
        <Container>
          <FlexRow justifySpaceBetween>
            {!task?.isComplete ? (
              <FlexRow alignCenter>
                <TimeContainer>
                  <TimeInput
                    placeholder='Start'
                    value={localStartTime}
                    onChange={(event) => setLocalStartTime(event.target.value)}
                    onFocus={handleInputFocus}
                  />
                </TimeContainer>
                <StyledLine fontSize='small' />
                <TimeContainer>
                  <TimeInput
                    placeholder='End'
                    value={localEndTime}
                    onChange={(event) => setLocalEndTime(event.target.value)}
                    onFocus={handleInputFocus}
                  />
                </TimeContainer>
              </FlexRow>
            ) : (
              <div />
            )}
            <FlexRow alignCenter>
              <ContainedButton
                onClick={handleToggleComplete}
                background={task?.isComplete ? theme.danger[400] : theme.brand[400]}
                color={theme.grey[0]}>
                {task?.isComplete ? 'Mark as incomplete' : 'Complete'}
              </ContainedButton>
              <Space padding='0 .5rem' />
              <IconButton onClick={handleDismiss} icon={<CloseIcon />} />
            </FlexRow>
          </FlexRow>
          {isOneTaskTimeSet(task) && (
            <ResetTimeContainer>
              <TextButton onClick={handleResetTime}>Reset time</TextButton>
            </ResetTimeContainer>
          )}
          <InputContainer>
            <NameTextField
              autoFocus
              onFocus={handleInputFocus}
              onDebouncedChange={handleSaveName}
              placeholder='Task name'
              initValue={task?.name}
            />
          </InputContainer>
          <TaskDue localDue={localDue} setLocalDue={setLocalDue} />
          <InputContainer>
            <NotesTextarea
              onFocus={handleInputFocus}
              onDebouncedChange={handleSaveNotes}
              placeholder='Notes'
              initValue={task?.notes}
              minRows={2}
            />
          </InputContainer>
          <ActionButtonsContainer>
            {isOneTaskTimeSet(task) && (
              <ActionButton onClick={addTaskBelow}>
                <AddCircleOutlinedIcon />
                <Text variant='p' color={theme.text.light} fontWeight={700}>
                  Add task below
                </Text>
              </ActionButton>
            )}
          </ActionButtonsContainer>
        </Container>
      </StyledBottomSheet>
    </OuterContainer>
  )
}

const OuterContainer = styled.div``

const StyledBottomSheet = styled(BottomSheet)`
  & > div:nth-of-type(2) {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`

const Container = styled.div`
  padding: 1rem;
`

const InputContainer = styled(Clickable)`
  margin-top: 1rem;
`

const NameTextField = styled(DebouncedTextarea)`
  font-size: 1.2rem;
  font-weight: medium;
`

const NotesTextarea = styled(DebouncedTextarea)``

const TimeContainer = styled(Clickable)`
  padding: 0.2rem;
`

const TimeInput = styled(Input)`
  width: 3rem;
  text-align: center;
`

const StyledLine = styled(RemoveIcon)`
  margin: 0 0.3rem;
  fill: ${(props) => props.theme.grey[700]} !important;
`

const ResetTimeContainer = styled.div`
  margin-top: 0.2rem;
`

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`

const ActionButton = styled.button`
  border-radius: 8px;
  background: ${(props) => props.theme.grey[50]};
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;

  & > *:first-of-type {
    margin-right: 0.5rem;
  }

  & svg {
    fill: ${(props) => props.theme.text.light} !important;
  }
`

export default TaskBottomSheet

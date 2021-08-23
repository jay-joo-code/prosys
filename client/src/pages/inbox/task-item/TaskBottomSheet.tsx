import CloseIcon from '@material-ui/icons/Close'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { useUpdateInboxTaskById, useUpdateTaskTime } from 'src/api/task'
import theme from 'src/app/theme'
import ButtonedIcon from 'src/components/ButtonedIcon'
import ContainedButton from 'src/components/buttons/ContainedButton'
import Clickable from 'src/components/Clickable'
import DebouncedTextarea from 'src/components/form-elements/DebouncedTextarea'
import Input from 'src/components/form-elements/Input'
import { FlexRow } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import { ITask } from 'src/types/task.type'
import { isOneTaskTimeSet } from 'src/util/task'
import styled from 'styled-components'

interface TaskBottomSheetProps {
  task: ITask
  isOpen: boolean
  onDismiss: () => void
}

const TaskBottomSheet = ({ task, isOpen, onDismiss }: TaskBottomSheetProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id, {
    due: new Date(task?.due as string),
    isTimed: isOneTaskTimeSet(task),
  })

  const { updateTaskTime } = useUpdateTaskTime(task?._id, {
    due: new Date(task?.due as string),
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

  const handleDismiss = () => {
    updateTaskTime({
      ...task,
      startTime: localStartTime,
      endTime: localEndTime,
    })

    onDismiss()
  }

  return (
    <BottomSheet
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
                />
              </TimeContainer>
              <StyledLine fontSize='small' />
              <TimeContainer>
                <TimeInput
                  placeholder='End'
                  value={localEndTime}
                  onChange={(event) => setLocalEndTime(event.target.value)}
                />
              </TimeContainer>
            </FlexRow>
          ) : (
            <div />
          )}
          <FlexRow alignCenter>
            <ContainedButton
              onClick={handleToggleComplete}
              background={
                task?.isComplete ? theme.danger[400] : theme.brand[400]
              }
              color={theme.grey[0]}>
              {task?.isComplete ? 'Mark as incomplete' : 'Complete'}
            </ContainedButton>
            <Space padding='0 .5rem' />
            <ButtonedIcon onClick={handleDismiss} icon={<CloseIcon />} />
          </FlexRow>
        </FlexRow>
        <Clickable>
          <NameTextField
            onDebouncedChange={handleSaveName}
            placeholder='Task name'
            initValue={task?.name}
          />
        </Clickable>
        <Clickable>
          <NotesTextarea
            onDebouncedChange={handleSaveNotes}
            placeholder='Notes'
            initValue={task?.notes}
            minRows={2}
          />
        </Clickable>
      </Container>
    </BottomSheet>
  )
}

const Container = styled.div`
  padding: 1rem;

  & > * {
    margin-bottom: 1rem;
  }
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

export default TaskBottomSheet

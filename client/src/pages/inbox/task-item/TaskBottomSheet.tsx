import CloseIcon from '@material-ui/icons/Close'
import RemoveIcon from '@material-ui/icons/Remove'
import React from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { useUpdateInboxTaskById } from 'src/api/task'
import ButtonedIcon from 'src/components/ButtonedIcon'
import TextButton from 'src/components/buttons/TextButton'
import Clickable from 'src/components/Clickable'
import DebouncedInput from 'src/components/form-elements/DebouncedInput'
import DebouncedTextarea from 'src/components/form-elements/DebouncedTextarea'
import { FlexRow } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'

interface TaskBottomSheetProps {
  task: ITask
  isOpen: boolean
  onDismiss: () => void
}

const TaskBottomSheet = ({ task, isOpen, onDismiss }: TaskBottomSheetProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id, {
    due: new Date(task?.due as string),
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

  const handleSaveTime = (value: string, type: 'START' | 'END') => {
    const updateObj =
      type === 'START' ? { startTime: value } : { endTime: value }

    updateInboxTask({
      _id: task?._id,
      ...updateObj,
    })
  }

  return (
    <BottomSheet
      open={isOpen}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [maxHeight * 0.8, maxHeight * 0.4]}
      onDismiss={onDismiss}
      expandOnContentDrag>
      <Container>
        <FlexRow justifySpaceBetween>
          <FlexRow alignCenter>
            <TimeContainer>
              <TimeTextarea
                onDebouncedChange={(value) => handleSaveTime(value, 'START')}
                placeholder='Start'
                initValue={task?.startTime}
              />
            </TimeContainer>
            <StyledLine fontSize='small' />
            <TimeContainer>
              <TimeTextarea
                onDebouncedChange={(value) => handleSaveTime(value, 'END')}
                placeholder='End'
                initValue={task?.endTime}
              />
            </TimeContainer>
          </FlexRow>
          <FlexRow alignCenter>
            <TextButton onClick={handleToggleComplete}>
              {task?.isComplete ? 'Undo' : 'Complete'}
            </TextButton>
            <Space padding='0 .5rem' />
            <ButtonedIcon onClick={() => onDismiss()} icon={<CloseIcon />} />
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

const TimeTextarea = styled(DebouncedInput)`
  width: 3rem;
  text-align: center;
`

const StyledLine = styled(RemoveIcon)`
  margin: 0 0.3rem;
  fill: ${(props) => props.theme.grey[700]} !important;
`

export default TaskBottomSheet

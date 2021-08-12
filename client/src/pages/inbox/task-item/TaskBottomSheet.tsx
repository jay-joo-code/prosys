import React from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { useUpdateInboxTaskById } from 'src/api/task'
import Clickable from 'src/components/Clickable'
import DebouncedTextarea from 'src/components/form-elements/DebouncedTextarea'
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

  return (
    <BottomSheet
      open={isOpen}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [maxHeight * 0.8, maxHeight * 0.4]}
      onDismiss={onDismiss}
      expandOnContentDrag>
      <Container>
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
  width: 100%;
  background: inherit;
  border: none;
  font-family: inherit;
`

const NotesTextarea = styled(DebouncedTextarea)`
  font-size: 1rem;
  width: 100%;
  border: none;
  font-family: inherit;
  background: inherit;
`

export default TaskBottomSheet

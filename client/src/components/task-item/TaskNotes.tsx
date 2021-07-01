import React, { useRef, useState } from 'react'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'
import Text from '../fonts/Text'
import { useUpdateArchiveTaskById, useUpdateInboxTaskById } from 'src/api/task'
import theme from 'src/app/theme'
import useIsTablet from 'src/hooks/useIsTablet'

interface TaskNotesProps {
  isFocused: boolean
  task: ITask
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskNotes = ({ isFocused, task, inboxState, setInboxState }: TaskNotesProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)
  const { updateArchiveTask } = useUpdateArchiveTaskById(task?._id)
  const [textareaValue, setTextareaValue] = useState<string>(task?.notes)
  const isTablet = useIsTablet()

  useKeypress(['n', 'ㅜ'], (event) => {
    if (isFocused && inboxState === 'NAVIGATE') {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      setInboxState('EDIT_NOTES')
    }
  })

  useKeypress(['Enter', 'Escape'], (event) => {
    if (
      isFocused &&
      inboxState === 'EDIT_NOTES' &&
      (event.key === 'Escape' || event.metaKey || event.ctrlKey)
    ) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      setInboxState('NAVIGATE')
      if (task?.isArchived) {
        updateArchiveTask({
          _id: task?._id,
          notes: textareaValue.trim(),
        })
      } else {
        updateInboxTask({
          _id: task?._id,
          notes: textareaValue.trim(),
        })
      }
    }
  })

  return (
    <>
      {isFocused && inboxState === 'EDIT_NOTES' ? (
        <NotesTextarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          autoFocus
        />
      ) : (
        <Container isTablet={isTablet}>
          <Text variant='h5' color={theme.text.light}>
            {task?.notes}
          </Text>
        </Container>
      )}
    </>
  )
}

interface ContainerProps {
  isTablet: boolean
}

const Container = styled.div<ContainerProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  // isTablet
  padding-left: ${(props) => props.isTablet && `.2rem`};
`

const NotesTextarea = styled(TextareaAutosize)`
  width: 100%;
  font-family: inherit;
  line-height: 1.5;
  letter-spacing: 0.5px;
  font-size: 14px;
  color: ${(props) => props.theme.text.light};

  border: 2px solid ${(props) => props.theme.grey[100]};
  border-radius: 4px;
  resize: none;

  &:focus {
    border-color: transparent;
  }
`

export default TaskNotes

import React, { useState } from 'react'
import useKeypress from 'src/hooks/useKeyPress'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'
import Text from '../fonts/Text'
import { useUpdateInboxTaskById } from 'src/api/task'
import theme from 'src/app/theme'

interface TaskNotesProps {
  isFocused: boolean
  task: ITask
  setIsListDisabled: (value: boolean) => void
}

const TaskNotes = ({ isFocused, task, setIsListDisabled }: TaskNotesProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)
  const [textareaValue, setTextareaValue] = useState<string>(task?.notes)

  useKeypress('n', (event) => {
    if (isFocused && !isEditMode) {
      event.preventDefault()
      setIsEditMode(true)
      setIsListDisabled(true)
    }
  })

  useKeypress('Enter', (event) => {
    if (isEditMode && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      setIsEditMode(false)
      setIsListDisabled(false)
      updateInboxTask({
        _id: task?._id,
        notes: textareaValue,
      })
    }
  })

  useKeypress('Escape', (event) => {
    if (isEditMode) {
      event.preventDefault()
      setIsEditMode(false)
      setIsListDisabled(false)
      updateInboxTask({
        _id: task?._id,
        notes: textareaValue,
      })
    }
  })

  return (
    <>
      {isEditMode
        ? (
          <NotesTextarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            autoFocus
          />
          )
        : (
          <Container>
            <Text
              variant='h5'
              color={theme.text.light}
            >{task?.notes}
            </Text>
          </Container>
          )
      }
    </>
  )
}

const Container = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-left: .2rem;
`

const NotesTextarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  font-family: inherit;
  line-height: 1.5;
  letter-spacing: .5px;
  font-size: 14px;
  color: ${props => props.theme.text.light};
`

export default TaskNotes

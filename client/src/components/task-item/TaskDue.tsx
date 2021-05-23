import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useKeypress from 'src/hooks/useKeyPress'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'

interface TaskDueProps {
  isFocused: boolean
  task: ITask
  setIsListDisabled: (value: boolean) => void
}

const TaskDue = ({ isFocused, task, setIsListDisabled }: TaskDueProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [tempDate, setTempDate] = useState<Date>(task?.due || new Date())

  useKeypress('d', (event) => {
    if (isFocused) {
      event.preventDefault()
      setIsOpen(true)
      setIsListDisabled(true)
    }
  })

  // TODO: figure out Mui date type
  const handleChange = (date: any) => {
    setTempDate(new Date(date))
  }

  const handleClose = () => {
    updateInboxTask({
      _id: task?._id,
      due: new Date(tempDate),
    })
    setIsOpen(false)
    setIsListDisabled(false)
  }

  return (
    <Container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          id='date-picker-inline'
          label='Date picker inline'
          value={tempDate}
          onChange={handleChange}
          open={isOpen}
          onClose={handleClose}
          TextFieldComponent={() => null}
        />
      </MuiPickersUtilsProvider>
    </Container>
  )
}

const Container = styled.div`
  margin-left: .5rem;
  position: relative;

  & label {
    display: none;
  }
`

export default TaskDue

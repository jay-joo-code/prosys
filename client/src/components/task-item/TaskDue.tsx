import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { useRef, useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import styled from 'styled-components'

interface TaskDueProps {
  isFocused: boolean
  task: ITask
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskDue = ({ isFocused, task, inboxState, setInboxState }: TaskDueProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)
  const [tempDate, setTempDate] = useState<Date>(task?.due || new Date())

  useKeypress(['d', 'ㅇ'], (event) => {
    if (isFocused && inboxState === 'NAVIGATE') {
      event.preventDefault()
      setInboxState('EDIT_DUE')
    }
  })

  // TODO: figure out Mui date type
  const handleChange = (date: any) => {
    setTempDate(new Date(date))
  }

  const handleClose = () => {
    setInboxState('NAVIGATE')
    updateInboxTask({
      _id: task?._id,
      due: new Date(tempDate),
    })
  }

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Container ref={containerRef}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          id='date-picker-inline'
          label='Date picker inline'
          value={tempDate}
          onChange={handleChange}
          open={isFocused && inboxState === 'EDIT_DUE'}
          onClose={handleClose}
          TextFieldComponent={() => null}
          PopoverProps={{
            anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
            transformOrigin: { horizontal: 'center', vertical: 'top' },
            anchorEl: containerRef.current,
          }}
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

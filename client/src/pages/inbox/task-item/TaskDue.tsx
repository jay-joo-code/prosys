import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { useRef, useState } from 'react'
import IconButton from 'src/components/buttons/IconButton'
import styled from 'styled-components'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import CloseIcon from '@material-ui/icons/Close'
import { FlexRow } from 'src/components/layout/Flex'

interface TaskDueProps {
  localDue: Date | null
  setLocalDue: React.Dispatch<React.SetStateAction<Date | null>>
}

const TaskDue = ({ localDue, setLocalDue }: TaskDueProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleChange = (date: Date | null) => {
    if (date) {
      setLocalDue(new Date(date))
    }
    setIsOpen(false)
  }

  const handleClose = () => setIsOpen(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const unsetDue = () => {
    setLocalDue(null)
  }

  return (
    <Container ref={containerRef}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          id='date-picker-inline'
          label='Date picker inline'
          value={localDue || new Date()}
          onChange={handleChange}
          open={isOpen}
          onClose={handleClose}
          TextFieldComponent={({ value }) => (
            <TaskDuePicker value={value as string} setIsOpen={setIsOpen} unsetDue={unsetDue} />
          )}
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

interface ITaskDuePickerProps {
  value: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  unsetDue: () => void
}

const TaskDuePicker = ({ value, setIsOpen, unsetDue }: ITaskDuePickerProps) => {
  return (
    <TaskDuePickerContainer>
      <FlexRow alignCenter>
        <StyledTaskDuePicker onClick={() => setIsOpen(true)}>
          <CalendarTodayIcon />
          {value}
        </StyledTaskDuePicker>
        <StyledButtonedIcon icon={<CloseIcon />} onClick={unsetDue} />
      </FlexRow>
    </TaskDuePickerContainer>
  )
}

const Container = styled.div`
  margin-left: 0.5rem;
  position: relative;

  & label {
    /* display: none; */
  }
`

const TaskDuePickerContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 1rem 0 0 0;
`

const StyledButtonedIcon = styled(IconButton)`
  margin-left: 0.5rem !important;
`

const StyledTaskDuePicker = styled.div`
  background: ${(props) => props.theme.grey[50]};
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme.text.light};
  display: flex;
  align-items: center;
  padding: 0.5rem 0.7rem;

  & > *:first-of-type {
    margin-right: 0.5rem;
  }
`

export default TaskDue

import React from 'react'
import styled from 'styled-components'
import { ReactComponent as CalendarIcon } from 'src/assets/services/google-calendar.svg'

const TaskCalendarIcon = () => {
  return (
    <Container>
      <StyledCalendarIcon />
    </Container>
  )
}

const Container = styled.div`
`

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 15px;
  height: 15px;
`

export default TaskCalendarIcon

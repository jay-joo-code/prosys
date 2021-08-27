import React from 'react'
import { useProsysTasks } from 'src/api/task'
import styled from 'styled-components'
import TaskItem from './task-item/TaskItem'

interface TimedTaskListProps {
  due: Date
}

const TimedTaskList = ({ due }: TimedTaskListProps) => {
  const { tasks } = useProsysTasks({ due, isTimed: true })

  if (!tasks || tasks?.length === 0) return null

  return (
    <Container>
      {tasks?.map((task) => (
        <TaskItem key={task?._id} task={task} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 1.5rem;

  & > * {
    border-bottom: 1px solid ${(props) => props.theme.border.default};
  }

  & > *:last-of-type {
    border-bottom: none;
  }
`

export default TimedTaskList

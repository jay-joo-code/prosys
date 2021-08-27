import React from 'react'
import { useGcalTasks } from 'src/api/task'
import styled from 'styled-components'
import TaskItem from './task-item/TaskItem'

interface GcalTaskListProps {
  due: Date
}

const GcalTaskList = ({ due }: GcalTaskListProps) => {
  const { tasks } = useGcalTasks(due)

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
  margin-bottom: 1rem;

  & > * {
    border-bottom: 1px solid ${(props) => props.theme.border.default};
  }

  & > *:last-of-type {
    border-bottom: none;
  }
`

export default GcalTaskList

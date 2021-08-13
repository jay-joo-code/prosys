import React from 'react'
import { useUntimedTasks } from 'src/api/task'
import styled from 'styled-components'
import TaskItem from './task-item/TaskItem'

interface UntimedTaskListProps {
  due: Date
}

const UntimedTaskList = ({ due }: UntimedTaskListProps) => {
  const { untimedTasks } = useUntimedTasks(due)

  return (
    <Container>
      {untimedTasks?.map((task) => (
        <TaskItem key={task?._id} task={task} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  & > * {
    border-bottom: 1px solid ${(props) => props.theme.border.default};
  }
`

export default UntimedTaskList

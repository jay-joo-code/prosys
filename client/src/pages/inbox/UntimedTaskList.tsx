import React from 'react'
import { useProsysTasks } from 'src/api/task'
import styled from 'styled-components'
import TaskItem from './task-item/TaskItem'

interface UntimedTaskListProps {
  due: Date
}

const UntimedTaskList = ({ due }: UntimedTaskListProps) => {
  const { tasks } = useProsysTasks({ due, isTimed: false })

  return (
    <Container>
      {tasks?.map((task) => (
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

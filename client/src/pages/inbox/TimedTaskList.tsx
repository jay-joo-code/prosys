import React from 'react'
import { useProsysTasks } from 'src/api/task'
import styled from 'styled-components'
import TaskItem from './task-item/TaskItem'

interface TimedTaskListProps {
  due: Date
}

const TimedTaskList = ({ due }: TimedTaskListProps) => {
  const { tasks } = useProsysTasks({ due, isTimed: true })

  return (
    <Container isMarginTop={!!tasks}>
      {tasks?.map((task) => (
        <TaskItem key={task?._id} task={task} />
      ))}
    </Container>
  )
}

interface IContainerProps {
  isMarginTop: boolean
}

const Container = styled.div<IContainerProps>`
  & > * {
    border-bottom: 1px solid ${(props) => props.theme.border.default};
  }

  /* isMarginTop */
  margin-top: ${(props) => props.isMarginTop && `1.5rem`};
`

export default TimedTaskList

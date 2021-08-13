import { addDays } from 'date-fns'
import React from 'react'
import { getDates } from 'src/util/date'
import styled from 'styled-components'
import TaskBatchItem from './TaskBatchItem'

interface TaskBatchListProps {}

const TaskBatchList = ({}: TaskBatchListProps) => {
  const dates = getDates(new Date(), addDays(new Date(), 3))
  return (
    <Container>
      {dates?.map((date) => (
        <TaskBatchItem key={date.toISOString()} due={date} />
      ))}
    </Container>
  )
}

const Container = styled.div``

export default TaskBatchList

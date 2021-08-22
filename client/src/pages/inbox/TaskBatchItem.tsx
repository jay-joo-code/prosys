import React from 'react'
import theme from 'src/app/theme'
import Text from 'src/components/fonts/Text'
import Space from 'src/components/layout/Space'
import styled from 'styled-components'
import { getDateStamp, getDay } from 'src/util/date'
import { FlexRow } from 'src/components/layout/Flex'
import AddTaskItem from './AddTaskItem'
import UntimedTaskList from './UntimedTaskList'
import TimedTaskList from './TimedTaskList'

interface TaskBatchItemProps {
  due: Date
}

const TaskBatchItem = ({ due }: TaskBatchItemProps) => {
  return (
    <Container>
      <DateHeader>
        <Text variant='h3' color={theme.text.light} fontWeight={700}>
          {getDateStamp(due)}
        </Text>
        <Space padding='0 .2rem' />
        <Text variant='h3' color={theme.text.muted} fontWeight={700}>
          {getDay(due)}
        </Text>
      </DateHeader>
      <UntimedTaskList due={due} />
      <AddTaskItem due={due} />
      <TimedTaskList due={due} />
    </Container>
  )
}

const Container = styled.div``

const DateHeader = styled(FlexRow)`
  margin: 1.5rem 0 0.3rem 0;
`

export default TaskBatchItem

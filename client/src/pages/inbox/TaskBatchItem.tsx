import React, { memo, useState } from 'react'
import theme from 'src/app/theme'
import Text from 'src/components/fonts/Text'
import Space from 'src/components/layout/Space'
import styled from 'styled-components'
import { getDateStamp, getDay } from 'src/util/date'
import { FlexRow } from 'src/components/layout/Flex'
import AddTaskItem from './AddTaskItem'
import UntimedTaskList from './UntimedTaskList'
import TimedTaskList from './TimedTaskList'
import GcalTaskList from './GcalTaskList'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

interface TaskBatchItemProps {
  due: Date | null
}

const TaskBatchItem = ({ due }: TaskBatchItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Container>
      <DateHeaderContainer onClick={toggleExpanded}>
        <DateHeader isHoverable={!due} alignCenter>
          <Text variant='h3' color={theme.text.light} fontWeight={700}>
            {due ? getDateStamp(due) : 'Backlog'}
          </Text>
          {due && <Space padding='0 .2rem' />}
          {due && (
            <Text variant='h3' color={theme.text.muted} fontWeight={700}>
              {getDay(due)}
            </Text>
          )}
          {!due && isExpanded && <KeyboardArrowUpIcon />}
          {!due && !isExpanded && <KeyboardArrowDownIcon />}
        </DateHeader>
      </DateHeaderContainer>
      {(due || isExpanded) && (
        <>
          {due && <GcalTaskList due={due} />}
          {due && <TimedTaskList due={due} />}
          <UntimedTaskList due={due} />
          {due && <AddTaskItem due={due} />}
        </>
      )}
    </Container>
  )
}

const Container = styled.div``

const DateHeaderContainer = styled.div`
  display: inline-block;
`

export interface IDateHeaderProps {
  isHoverable: boolean
}

const DateHeader = styled(FlexRow)<IDateHeaderProps>`
  margin: 1.5rem 0 0.3rem 0;
  padding: 0.2rem;
  border-radius: 8px;
  cursor: ${(props) => props.isHoverable && 'pointer'};

  &:hover {
    background: ${(props) => props.isHoverable && props.theme.grey[50]};
  }

  & svg {
    fill: ${(props) => props.theme.text.light} !important;
    height: 30px;
    width: 30px;
  }
`

export default memo(TaskBatchItem)

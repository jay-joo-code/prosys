import React from 'react'
import { useInboxTasks } from 'src/api/task'
import theme from 'src/app/theme'
import Text from 'src/components/fonts/Text'
import Space from 'src/components/layout/Space'
import TaskItem from 'src/components/task-item/TaskItem'
import useKeyPress from 'src/hooks/useKeyPress'
import { getDateStamp } from 'src/util/date'
import { isTaskTimeSet } from 'src/util/task'
import styled from 'styled-components'

interface TaskListProps {
  isListDisabled: boolean
  setIsListDisabled: (value: boolean) => void
  focusIdx: number
  setFocusIdx: (value: number) => void
}

const TaskList = ({ isListDisabled, setIsListDisabled, focusIdx, setFocusIdx }: TaskListProps) => {
  const { tasks } = useInboxTasks()

  // Focus
  useKeyPress('ArrowUp', () => {
    if (!isListDisabled) {
      setFocusIdx(Math.max(focusIdx - 1, 0))
    }
  })
  useKeyPress('ArrowDown', () => {
    if (!isListDisabled) {
      setFocusIdx(Math.min(focusIdx + 1, (tasks?.length || 1) - 1))
    }
  })

  // TODO: select

  return (
    <Container>
      {tasks?.map((task, idx) => {
        const renderDateStamp = idx === 0 || getDateStamp(task?.due) !== getDateStamp(tasks[idx - 1]?.due)
        const renderDividingSpace = idx !== 0 && isTaskTimeSet(task) && !isTaskTimeSet(tasks[idx - 1])

        return (
          <div key={`${task?._id}${task?.name}`}>
            {renderDateStamp && (
              <>
                <Space padding='.5rem 0' />
                <Text
                  variant='h4'
                  color={theme.text.light}
                >{getDateStamp(task?.due)}
                </Text>
              </>
            )}
            {renderDividingSpace && <Space padding='.5rem 0' />}
            <TaskItem
              task={task}
              idx={idx}
              isFocused={!isListDisabled && focusIdx === idx}
              isSelected={false}
              setIsListDisabled={setIsListDisabled}
              setFocusIdx={setFocusIdx}
            />
          </div>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  
`

export default TaskList

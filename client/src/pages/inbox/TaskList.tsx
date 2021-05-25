import React, { useEffect, useState } from 'react'
import { useInboxTasks } from 'src/api/task'
import theme from 'src/app/theme'
import Text from 'src/components/fonts/Text'
import Space from 'src/components/layout/Space'
import TaskItem from 'src/components/task-item/TaskItem'
import useKeyPress from 'src/hooks/useKeyPress'
import { IInboxState } from 'src/types/task.type'
import { getDateStamp } from 'src/util/date'
import { isTaskTimeSet } from 'src/util/task'
import styled from 'styled-components'

interface TaskListProps {
  isListDisabled: boolean
  setIsListDisabled: (value: boolean) => void
  focusIdx: number
  setFocusIdx: (value: number) => void
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskList = ({ isListDisabled, setIsListDisabled, focusIdx, setFocusIdx, inboxState, setInboxState }: TaskListProps) => {
  const { tasks } = useInboxTasks()

  // store important idxes in local state
  const [firstTaskOfDayIdxes, setFirstTaskOfDayIdxes] = useState<number[]>([])
  const [dividerIdxes, setDividerIdxes] = useState<number[]>([])

  useEffect(() => {
    const newFirstTaskOfDayIdxes: number[] = []
    const newDividerIdxes: number[] = []

    tasks?.forEach((task, idx) => {
      const isDateStampIdx = idx === 0 || getDateStamp(task?.due) !== getDateStamp(tasks[idx - 1]?.due)
      const isDividerIdx = idx !== 0 && isTaskTimeSet(task) && !isTaskTimeSet(tasks[idx - 1])

      if (isDateStampIdx) newFirstTaskOfDayIdxes.push(idx)
      if (isDividerIdx) newDividerIdxes.push(idx)
    })

    setFirstTaskOfDayIdxes(newFirstTaskOfDayIdxes)
    setDividerIdxes(newDividerIdxes)
  }, [tasks])

  // Focus
  useKeyPress('ArrowUp', (event) => {
    if (inboxState === 'NAVIGATE') {
      event.preventDefault()
      if ((event.metaKey || event.ctrlKey) && tasks) {
        let hasJumped = false
        firstTaskOfDayIdxes.forEach((idx, i) => {
          if (!hasJumped && idx >= focusIdx) {
            setFocusIdx(firstTaskOfDayIdxes[i - 1 || 0])
            hasJumped = true
          }
        })
      } else {
        setFocusIdx(Math.max(focusIdx - 1, 0))
      }
    }
  })

  useKeyPress('ArrowDown', (event) => {
    if (inboxState === 'NAVIGATE') {
      event.preventDefault()
      if ((event.metaKey || event.ctrlKey) && tasks) {
        let hasJumped = false
        firstTaskOfDayIdxes.forEach((idx) => {
          if (!hasJumped && idx > focusIdx) {
            setFocusIdx(idx)
            hasJumped = true
          }
        })
      } else {
        setFocusIdx(Math.min(focusIdx + 1, (tasks?.length || 1) - 1))
      }
    }
  })

  // TODO: select

  return (
    <Container>
      {tasks?.map((task, idx) => {
        const renderDateStamp = firstTaskOfDayIdxes.includes(idx)
        const renderDividingSpace = dividerIdxes.includes(idx)

        return (
          <div key={`${task?._id}${new Date(task?.createdAt).getTime()}`}>
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
              isFocused={focusIdx === idx}
              isSelected={false}
              setIsListDisabled={setIsListDisabled}
              setFocusIdx={setFocusIdx}
              inboxState={inboxState}
              setInboxState={setInboxState}
            />
          </div>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

export default TaskList

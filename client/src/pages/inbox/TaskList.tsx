import React, { useEffect, useState } from 'react'
import { useInboxTasks } from 'src/api/task'
import theme from 'src/app/theme'
import Text from 'src/components/fonts/Text'
import Space from 'src/components/layout/Space'
import TaskItem from 'src/components/task-item/TaskItem'
import useKeyPress from 'src/hooks/useKeyPress'
import usePreviousValue from 'src/hooks/usePreviousValue'
import { IInboxState, ITask } from 'src/types/task.type'
import { getDateStamp, getDay } from 'src/util/date'
import { isTaskTimeSet } from 'src/util/task'
import styled from 'styled-components'

interface TaskListProps {
  focusId: string | undefined
  setFocusId: (value: string | undefined) => void
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskList = ({ focusId, setFocusId, inboxState, setInboxState }: TaskListProps) => {
  const { tasks } = useInboxTasks()

  // handle focusId missing in new tasks
  const previousTasks: ITask[] = usePreviousValue(tasks)
  useEffect(() => {
    if (tasks && previousTasks) {
      const currentIdx = tasks.findIndex((task) => task._id === focusId)
      const previousIdx = previousTasks.findIndex((task) => task._id === focusId)
      if (currentIdx === -1 && previousIdx !== -1) {
        const nearbyTask = tasks[previousIdx] || tasks[previousIdx - 1] || tasks[previousIdx + 1]
        setFocusId(nearbyTask?._id)
      }
    }
  }, [tasks, previousTasks])

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
        // jump to first task of day
        let hasJumped = false
        const focusIdx = tasks?.findIndex((task) => task?._id === focusId)
        firstTaskOfDayIdxes.forEach((idx, i) => {
          if (!hasJumped && idx >= focusIdx) {
            const jumpIdx = firstTaskOfDayIdxes[i - 1 || 0]
            setFocusId(tasks[jumpIdx]?._id)
            hasJumped = true
          }
        })
      } else {
        tasks?.forEach((task, idx) => {
          if (task?._id === focusId && idx !== 0) {
            setFocusId(tasks[idx - 1]?._id)
          }
        })
      }
    }
  })

  useKeyPress('ArrowDown', (event) => {
    if (inboxState === 'NAVIGATE') {
      event.preventDefault()
      if ((event.metaKey || event.ctrlKey) && tasks) {
        let hasJumped = false
        const focusIdx = tasks?.findIndex((task) => task?._id === focusId)
        firstTaskOfDayIdxes.forEach((idx) => {
          if (!hasJumped && idx > focusIdx) {
            setFocusId(tasks[idx]?._id)
            hasJumped = true
          }
        })
      } else {
        tasks?.forEach((task, idx) => {
          if (task?._id === focusId && idx + 1 !== tasks?.length) {
            setFocusId(tasks[idx + 1]?._id)
          }
        })
      }
    }
  })

  const focusNextTask = () => {
    tasks?.forEach((task, idx) => {
      if (task?._id === focusId && idx + 1 !== tasks?.length) {
        setFocusId(tasks[idx + 1]?._id)
      }
    })
  }

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
                >{getDateStamp(task?.due)} {getDay(task?.due)}
                </Text>
              </>
            )}
            {renderDividingSpace && <Space padding='.5rem 0' />}
            <TaskItem
              task={task}
              idx={idx}
              isFocused={focusId === task?._id}
              isSelected={false}
              setFocusId={setFocusId}
              inboxState={inboxState}
              setInboxState={setInboxState}
              focusNextTask={focusNextTask}
              isFirstTimeStampedTask={renderDividingSpace}
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

import React, { useEffect, useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import theme from 'src/app/theme'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import { isTaskTimeSet } from 'src/util/task'
import styled from 'styled-components'
import Text from '../fonts/Text'
import { FlexRow } from '../layout/Flex'

interface TaskTimeProps {
  task: ITask
  isFocused: boolean
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskTime = ({ task, isFocused, inboxState, setInboxState }: TaskTimeProps) => {
  const [isStartTimeFocused, setIsStartTimeFocused] = useState<boolean>(true)
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)
  const [localStartTime, setLocalStartTime] = useState<string>(task?.startTime)
  const [localEndTime, setLocalEndTime] = useState<string>(task?.endTime)

  const updateTime = () => {
    setInboxState('NAVIGATE')
    updateInboxTask({
      _id: task?._id,
      startTime: localStartTime,
      endTime: localEndTime,
    })
  }

  useKeypress(['t', 'ㅅ'], (event) => {
    if (isFocused) {
      if (inboxState === 'NAVIGATE') {
        event.preventDefault()
        setInboxState('EDIT_TIME')
        setIsStartTimeFocused(true)
      } else if (inboxState === 'EDIT_TIME') {
        event.preventDefault()
        updateTime()
      }
    }
  })

  useKeypress(['Enter', 'Escape'], (event) => {
    if (isFocused && inboxState === 'EDIT_TIME') {
      event.preventDefault()
      updateTime()
    }
  })

  useKeypress('Tab', (event) => {
    if (isFocused && inboxState === 'EDIT_TIME') {
      event.preventDefault()
      setIsStartTimeFocused(!isStartTimeFocused)
    }
  })

  const incrementTimeStamp = (timeStamp: string) => {
    if (Number(timeStamp)) {
      return `0${(Number(timeStamp) + 100).toString()}`.slice(-4)
    }
    return '0000'
  }

  useEffect(() => {
    setLocalEndTime(incrementTimeStamp(localStartTime))
  }, [localStartTime])

  /* increment / decrement time with arrow keys */
  // const incrementTime = (timeStamp: string): string => {
  //   if (timeStamp === '2330') {
  //     return '0000'
  //   } else if (timeStamp[2] === '3') {
  //     return `0${(Number(timeStamp.slice(0, 2)) + 1).toString()}00`.slice(-4)
  //   } else {
  //     return `${timeStamp[0]}${timeStamp[1]}30`
  //   }
  // }

  // useKeypress('ArrowUp', (event) => {
  //   if (isEditMode) {
  //     event.preventDefault()
  //     if (isStartTimeFocused) {
  //       const newStartTime = incrementTime(localStartTime)
  //       setLocalStartTime(newStartTime)

  //       if (Number(newStartTime) > Number(localEndTime)) {
  //         setLocalEndTime(newStartTime)
  //       }
  //     } else {
  //       setLocalEndTime(incrementTime(localEndTime))
  //     }
  //   }
  // })

  // const decrementTime = (timeStamp: string): string => {
  //   if (timeStamp === '0000') {
  //     return '2330'
  //   } else if (timeStamp[2] === '3') {
  //     return `${timeStamp[0]}${timeStamp[1]}00`
  //   } else {
  //     return `0${(Number(timeStamp.slice(0, 2)) - 1).toString()}30`.slice(-4)
  //   }
  // }

  // useKeypress('ArrowDown', (event) => {
  //   if (isEditMode) {
  //     event.preventDefault()
  //     if (isStartTimeFocused) {
  //       const newStartTime = decrementTime(localStartTime)
  //       setLocalStartTime(newStartTime)

  //       if (Number(newStartTime) > Number(localEndTime)) {
  //         setLocalEndTime(newStartTime)
  //       }
  //     } else {
  //       setLocalEndTime(decrementTime(localEndTime))
  //     }
  //   }
  // })

  return (
    <div>
      {(isTaskTimeSet(task) || (isFocused && inboxState === 'EDIT_TIME'))
        ? (
          <FlexRow alignCenter>
            {((isFocused && inboxState === 'EDIT_TIME') && isStartTimeFocused)
              ? <TimeStampInput
                  autoFocus
                  value={localStartTime}
                  onChange={(e) => setLocalStartTime(e.target.value)}
                  onFocus={(event) => event.target.select()}
                />
              : (
                <TimeStamp>
                  <Text
                    variant='p'
                    nowrap
                    color={theme.text.light}
                  >{localStartTime}
                  </Text>
                </TimeStamp>
              )
            }
            <Text
              variant='p'
              nowrap
              color={theme.text.light}
            >-
            </Text>
            {((isFocused && inboxState === 'EDIT_TIME') && !isStartTimeFocused)
              ? <TimeStampInput
                  autoFocus
                  value={localEndTime}
                  onChange={(event) => setLocalEndTime(event.target.value)}
                  onFocus={(event) => event.target.select()}
                />
              : (
                <TimeStamp>
                  <Text
                    variant='p'
                    nowrap
                    color={theme.text.light}
                  >{localEndTime}
                  </Text>
                </TimeStamp>
              )
            }
          </FlexRow>
        )
        : null
      }
    </div>
  )
}

const TimeStampInput = styled.input`
  width: 40px;
  font-size: 16px;
  color: ${props => props.theme.text.light};
`

const TimeStamp = styled.div`
  padding: 0 .2rem;
  border-radius: 6px;
`

export default TaskTime

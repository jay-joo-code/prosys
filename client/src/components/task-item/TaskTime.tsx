import React, { useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import useKeypress from 'src/hooks/useKeyPress'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'
import Text from '../fonts/Text'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import RemoveIcon from '@material-ui/icons/Remove'
import { isTaskTimeSet } from 'src/util/task'
import theme from 'src/app/theme'

interface TaskTimeProps {
  task: ITask
  isFocused: boolean
  setIsListDisabled: (value: boolean) => void
}

const TaskTime = ({ task, isFocused, setIsListDisabled }: TaskTimeProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isStartTimeFocused, setIsStartTimeFocused] = useState<boolean>(true)
  const { updateInboxTask } = useUpdateInboxTaskById(task?._id)
  const [localStartTime, setLocalStartTime] = useState<string>(task?.startTime)
  const [localEndTime, setLocalEndTime] = useState<string>(task?.endTime)

  const handleBlur = () => {
    setIsListDisabled(false)
    setIsEditMode(false)
    updateInboxTask({
      _id: task?._id,
      startTime: localStartTime,
      endTime: localEndTime,
    })
  }

  useKeypress('t', () => {
    if (isFocused) {
      setIsListDisabled(true)
      setIsEditMode(true)
      setIsStartTimeFocused(true)
    } else if (isEditMode) {
      handleBlur()
    }
  })

  useKeypress('Enter', () => {
    if (isEditMode) {
      handleBlur()
    }
  })

  useKeypress('Escape', () => {
    if (isEditMode) {
      handleBlur()
    }
  })

  useKeypress('ArrowLeft', () => {
    if (isEditMode) {
      setIsStartTimeFocused(!isStartTimeFocused)
    }
  })

  useKeypress('ArrowRight', () => {
    if (isEditMode) {
      setIsStartTimeFocused(!isStartTimeFocused)
    }
  })

  useKeypress('Tab', (event) => {
    if (isEditMode) {
      event.preventDefault()
      setIsStartTimeFocused(!isStartTimeFocused)
    }
  })

  const incrementTime = (timeStamp: string): string => {
    if (timeStamp === '2330') {
      return '0000'
    } else if (timeStamp[2] === '3') {
      return `0${(Number(timeStamp.slice(0, 2)) + 1).toString()}00`.slice(-4)
    } else {
      return `${timeStamp[0]}${timeStamp[1]}30`
    }
  }

  useKeypress('ArrowUp', (event) => {
    if (isEditMode) {
      event.preventDefault()
      if (isStartTimeFocused) {
        const newStartTime = incrementTime(localStartTime)
        setLocalStartTime(newStartTime)

        if (Number(newStartTime) > Number(localEndTime)) {
          setLocalEndTime(newStartTime)
        }
      } else {
        setLocalEndTime(incrementTime(localEndTime))
      }
    }
  })

  const decrementTime = (timeStamp: string): string => {
    if (timeStamp === '0000') {
      return '2330'
    } else if (timeStamp[2] === '3') {
      return `${timeStamp[0]}${timeStamp[1]}00`
    } else {
      return `0${(Number(timeStamp.slice(0, 2)) - 1).toString()}30`.slice(-4)
    }
  }

  useKeypress('ArrowDown', (event) => {
    if (isEditMode) {
      event.preventDefault()
      if (isStartTimeFocused) {
        const newStartTime = decrementTime(localStartTime)
        setLocalStartTime(newStartTime)

        if (Number(newStartTime) > Number(localEndTime)) {
          setLocalEndTime(newStartTime)
        }
      } else {
        setLocalEndTime(decrementTime(localEndTime))
      }
    }
  })

  return (
    <div>
      {(isTaskTimeSet(task) || isEditMode)
        ? (
          <FlexRow alignCenter>
            <TimeStamp isFocused={isEditMode && isStartTimeFocused}>
              <Text
                variant='p'
                nowrap
                color={theme.text.light}
              >{localStartTime}
              </Text>
            </TimeStamp>
            {/* <RemoveIcon size='small' /> */}
            <Text
              variant='p'
              nowrap
              color={theme.text.light}
            >-
            </Text>
            <TimeStamp isFocused={isEditMode && !isStartTimeFocused}>
              <Text
                variant='p'
                nowrap
                color={theme.text.light}
              >{localEndTime}
              </Text>
            </TimeStamp>
          </FlexRow>
          )
        : null
      }
    </div>
  )
}

interface TimeStampProps {
  isFocused: boolean
}

const TimeStamp = styled.div<TimeStampProps>`
  padding: 0 .2rem;
  border-radius: 6px;

  // isFocused
  background: ${props => props.isFocused && props.theme.brand[50]};
`

export default TaskTime

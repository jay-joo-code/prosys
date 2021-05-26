import React, { useEffect, useState } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import theme from 'src/app/theme'
import useIsMobile from 'src/hooks/useIsMobile'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import { isTaskTimeSet } from 'src/util/task'
import styled from 'styled-components'
import Text from '../fonts/Text'
import { FlexRow } from '../layout/Flex'
import OutsideClickListener from '../util/OutsideClickListener'

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
    if (isFocused && inboxState === 'EDIT_TIME') {
      setLocalEndTime(incrementTimeStamp(localStartTime))
    }
  }, [localStartTime])

  // mobile
  const isMobile = useIsMobile()

  const handleTimeStampClick = (isStartTime: boolean) => {
    if (isMobile) {
      if (inboxState === 'NAVIGATE') {
        setInboxState('EDIT_TIME')
      } else if (inboxState === 'EDIT_TIME') {
        console.log('isStartTime :>> ', isStartTime)
        setIsStartTimeFocused(isStartTime)
      }
    }
  }

  const handleOutsideClick = () => {
    if (isFocused && isMobile && inboxState === 'EDIT_TIME') {
      setInboxState('NAVIGATE')
    }
  }

  const handleBlur = () => {
    if (isFocused && isMobile && inboxState === 'EDIT_TIME') {
      setInboxState('NAVIGATE')
    }
  }

  return (
    <OutsideClickListener
      onOutsideClick={handleOutsideClick}
      isListening
    >
      <div>
        {(isTaskTimeSet(task) || (isFocused && inboxState === 'EDIT_TIME')) &&
      (
        <FlexRow alignCenter>
          {((isFocused && inboxState === 'EDIT_TIME') && isStartTimeFocused)
            ? <TimeStampInput
                autoFocus
                value={localStartTime}
                onChange={(e) => setLocalStartTime(e.target.value)}
                onFocus={(event) => event.target.select()}
                onBlur={handleBlur}
              />
            : (
              <TimeStamp onClick={() => handleTimeStampClick(true)}>
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
                onBlur={handleBlur}
              />
            : (
              <TimeStamp onClick={() => handleTimeStampClick(false)}>
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
      }
      </div>
    </OutsideClickListener>
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

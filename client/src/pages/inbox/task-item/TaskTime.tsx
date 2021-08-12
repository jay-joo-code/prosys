import React, { useEffect, useState, useRef } from 'react'
import { useUpdateInboxTaskById } from 'src/api/task'
import theme from 'src/app/theme'
import useIsTablet from 'src/hooks/useIsTablet'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState, ITask } from 'src/types/task.type'
import {
  incrementTimeStamp,
  isTaskTimeSet,
} from 'src/util/task'
import styled from 'styled-components'
import Text from 'src/components/fonts/Text'
import OutsideClickListener from 'src/components/util/OutsideClickListener'

interface TaskTimeProps {
  task: ITask
  isFocused: boolean
  inboxState: IInboxState
  setInboxState: (state: IInboxState) => void
}

const TaskTime = ({
  task,
  isFocused,
  inboxState,
  setInboxState,
}: TaskTimeProps) => {
  const { updateInboxTask } = useUpdateInboxTaskById(
    task?._id
  )
  const [localStartTime, setLocalStartTime] =
    useState<string>(task?.startTime)
  const [localEndTime, setLocalEndTime] = useState<string>(
    task?.endTime
  )
  const startTimeInputRef = useRef<HTMLInputElement>(null)
  const endTimeInputRef = useRef<HTMLInputElement>(null)

  const updateTime = () => {
    setInboxState('NAVIGATE')
    window?.getSelection()?.removeAllRanges()
    updateInboxTask({
      _id: task?._id,
      startTime: localStartTime,
      endTime: localEndTime,
    })
  }

  useKeypress(['t', 'ㅅ'], (event) => {
    if (isFocused && task?.due) {
      if (inboxState === 'NAVIGATE') {
        event.stopPropagation()
        event.stopImmediatePropagation()
        event.preventDefault()
        setInboxState('EDIT_TIME')
        startTimeInputRef.current?.focus()
      } else if (inboxState === 'EDIT_TIME') {
        event.stopPropagation()
        event.stopImmediatePropagation()
        event.preventDefault()
        updateTime()
      }
    }
  })

  useKeypress(['Enter', 'Escape'], (event) => {
    if (isFocused && inboxState === 'EDIT_TIME') {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      updateTime()
    }
  })

  useKeypress(['Tab', '-'], (event) => {
    if (isFocused && inboxState === 'EDIT_TIME') {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()

      if (event.shiftKey) {
        // shift + tab
        if (
          document.activeElement === endTimeInputRef.current
        ) {
          startTimeInputRef.current?.focus()
        }
      } else {
        // tab
        if (
          document.activeElement ===
          startTimeInputRef.current
        ) {
          endTimeInputRef.current?.focus()
        } else {
          updateTime()
          setInboxState('EDIT_NAME')
        }
      }
    }
  })

  useEffect(() => {
    if (isFocused && inboxState === 'EDIT_TIME') {
      setLocalEndTime(incrementTimeStamp(localStartTime))
    }
  }, [localStartTime])

  // mobile
  const isTablet = useIsTablet()
  const [tempRender, setTempRender] =
    useState<boolean>(false)

  const handleTimeStampClick = (type: 'START' | 'END') => {
    if (isTablet && inboxState === 'NAVIGATE') {
      setInboxState('EDIT_TIME')

      if (type === 'START') {
        setTimeout(
          () => startTimeInputRef.current?.focus(),
          0
        )
      } else if (type === 'END') {
        setTimeout(
          () => endTimeInputRef.current?.focus(),
          0
        )
      }
    }
  }

  const handleOutsideClick = () => {
    if (
      isFocused &&
      isTablet &&
      inboxState === 'EDIT_TIME'
    ) {
      updateTime()
    }
  }

  const handleBlur = () => {
    if (
      isFocused &&
      isTablet &&
      inboxState === 'EDIT_TIME'
    ) {
      updateTime()
      setTempRender(true)
    }
  }

  useEffect(() => {
    if (tempRender) {
      setTimeout(() => setTempRender(false), 0)
    }
  }, [tempRender])

  const isSingleTimeStamp = localStartTime === localEndTime
  const isEditMode =
    (isFocused && inboxState === 'EDIT_TIME') ||
    (isTablet && isFocused && tempRender)

  return (
    <OutsideClickListener
      onOutsideClick={handleOutsideClick}
      isListening>
      <div>
        {(isTaskTimeSet(task) || isEditMode) && (
          <Container>
            <div
              onClick={() => handleTimeStampClick('START')}>
              <TimeStampInput
                autoFocus
                ref={startTimeInputRef}
                value={localStartTime}
                onChange={(e) =>
                  setLocalStartTime(e.target.value)
                }
                onFocus={(event) => {
                  if (!isTablet) event.target.select()
                }}
                onBlur={handleBlur}
                disabled={
                  !isFocused || inboxState !== 'EDIT_TIME'
                }
              />
            </div>
            {(!isSingleTimeStamp || isEditMode) && (
              <>
                <Text
                  variant='p'
                  nowrap
                  color={theme.text.light}>
                  -
                </Text>
                <div
                  onClick={() =>
                    handleTimeStampClick('END')
                  }>
                  <TimeStampInput
                    ref={endTimeInputRef}
                    value={localEndTime}
                    onChange={(event) =>
                      setLocalEndTime(event.target.value)
                    }
                    onFocus={(event) => {
                      if (!isTablet) event.target.select()
                    }}
                    onBlur={handleBlur}
                    disabled={
                      !isFocused ||
                      inboxState !== 'EDIT_TIME'
                    }
                  />
                </div>
              </>
            )}
          </Container>
        )}
      </div>
    </OutsideClickListener>
  )
}

const Container = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${(props) => props.theme.tablet}) {
    width: 110px;
    padding-top: 0.1rem;
  }
`

const TimeStampInput = styled.input`
  width: 45px;
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.theme.text.light} !important;
  opacity: 1 !important;
  -webkit-text-fill-color: ${(props) =>
    props.theme.text.light} !important;
  padding: 0;

  &:disabled {
    background: inherit;
    color: ${(props) => props.theme.text.light} !important;
    opacity: 1 !important;
    text-align: center;
    -webkit-text-fill-color: ${(props) =>
      props.theme.text.light} !important;
  }

  @media (min-width: ${(props) => props.theme.tablet}) {
    width: 50px;
  }
`

export default TaskTime

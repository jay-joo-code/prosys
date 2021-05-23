import React, { useState } from 'react'
import { FlexColumn } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import styled from 'styled-components'
import CreateTaskTextField from './CreateTaskTextField'
import TaskList from './TaskList'

const InboxPage = () => {
  const [isListDisabled, setIsListDisabled] = useState<boolean>(true)
  const [focusIdx, setFocusIdx] = useState<number>(0)

  return (
    <Padding>
      <FlexColumn>
        <CreateTaskTextField
          isListDisabled={isListDisabled}
          setIsListDisabled={setIsListDisabled}
          focusIdx={focusIdx}
          setFocusIdx={setFocusIdx}
        />
        <Space padding='.5rem 0' />
        <TaskList
          isListDisabled={isListDisabled}
          setIsListDisabled={setIsListDisabled}
          focusIdx={focusIdx}
          setFocusIdx={setFocusIdx}
        />
      </FlexColumn>
    </Padding>
  )
}

const Padding = styled.div`
  padding: 1rem;
`

export default InboxPage

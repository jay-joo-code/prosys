import React, { useState } from 'react'
import { FlexColumn, FlexRow } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import styled from 'styled-components'
import CreateTaskTextField from './CreateTaskTextField'
import TaskList from './TaskList'

const InboxPage = () => {
  const [isListDisabled, setIsListDisabled] = useState<boolean>(true)
  const [focusIdx, setFocusIdx] = useState<number>(0)

  return (
    <FlexRow justifyCenter>
      <Container>
        <FlexColumn alignCenter>
          <Space padding='1rem 0' />
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
      </Container>
    </FlexRow>
  )
}

const Container = styled.div`
  padding: 1rem;
  width: 100%;

  @media (min-width: ${(props) => props.theme.medium}) {
    max-width: 800px;
  }
`

export default InboxPage

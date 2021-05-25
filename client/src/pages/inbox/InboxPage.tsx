import React, { useState } from 'react'
import { FlexColumn, FlexRow } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import { IInboxState } from 'src/types/task.type'
import styled from 'styled-components'
import CreateTaskTextField from './CreateTaskTextField'
import TaskList from './TaskList'

const InboxPage = () => {
  const [isListDisabled, setIsListDisabled] = useState<boolean>(true)
  const [focusIdx, setFocusIdx] = useState<number>(0)
  const [inboxState, setInboxState] = useState<IInboxState>('CREATE')

  return (
    <FlexRow justifyCenter>
      <Container>
        <FlexColumn alignCenter>
          <Space padding='1rem 0' />
          <CreateTaskTextField
            focusIdx={focusIdx}
            setFocusIdx={setFocusIdx}
            inboxState={inboxState}
            setInboxState={setInboxState}
          />
          <Space padding='.5rem 0' />
          <TaskList
            isListDisabled={isListDisabled}
            setIsListDisabled={setIsListDisabled}
            focusIdx={focusIdx}
            setFocusIdx={setFocusIdx}
            inboxState={inboxState}
            setInboxState={setInboxState}
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

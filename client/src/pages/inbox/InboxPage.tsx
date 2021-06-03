import React, { useState } from 'react'
import { FlexColumn, FlexRow } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import { IInboxState } from 'src/types/task.type'
import styled from 'styled-components'
import CreateTaskTextField from './CreateTaskTextField'
import TaskList from './TaskList'

const InboxPage = () => {
  const [focusId, setFocusId] = useState<string>()
  const [inboxState, setInboxState] = useState<IInboxState>('CREATE')

  return (
    <FlexRow justifyCenter>
      <Container>
        <FlexColumn alignCenter>
          <Space padding='1rem 0' />
          <CreateTaskTextField
            focusId={focusId}
            setFocusId={setFocusId}
            inboxState={inboxState}
            setInboxState={setInboxState}
          />
          <Space padding='.5rem 0' />
          <TaskList
            focusId={focusId}
            setFocusId={setFocusId}
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

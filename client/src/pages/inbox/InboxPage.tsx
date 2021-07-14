import React, { useState } from 'react'
import { useInboxTasks } from 'src/api/task'
import NavHeader from 'src/components/header/NavHeader'
import { FlexColumn } from 'src/components/layout/Flex'
import PageContainer from 'src/components/layout/PageContainer'
import Space from 'src/components/layout/Space'
import TaskList from 'src/components/TaskList'
import useIsTablet from 'src/hooks/useIsTablet'
import { IInboxState } from 'src/types/task.type'
import styled from 'styled-components'
import CreateTaskTextField from './CreateTaskTextField'

const InboxPage = () => {
  const [focusId, setFocusId] = useState<string>()
  const [inboxState, setInboxState] = useState<IInboxState>('NAVIGATE')
  const { tasks } = useInboxTasks()
  const isTablet = useIsTablet()

  return (
    <PageContainer>
      <NavHeader inboxState={inboxState} />
      <FlexColumn alignCenter>
        {!isTablet && <Space padding='1rem 0' />}
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
          tasks={tasks}
        />
      </FlexColumn>
    </PageContainer>
  )
}

const Container = styled.div`
  padding: 1rem;
  width: 100%;

  @media (min-width: ${(props) => props.theme.tablet}) {
    max-width: 800px;
  }
`

export default InboxPage

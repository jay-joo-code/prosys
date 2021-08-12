import React, { useState } from 'react'
import NavHeader from 'src/components/header/NavHeader'
import { FlexColumn } from 'src/components/layout/Flex'
import PageContainer from 'src/components/layout/PageContainer'
import Space from 'src/components/layout/Space'
import {
  InboxContext,
  useInboxContext,
} from 'src/contexts/InboxContext'
import useIsTablet from 'src/hooks/useIsTablet'
import { IInboxState } from 'src/types/task.type'
import styled from 'styled-components'
import CreateTaskTextField from './CreateTaskTextField'
import TaskBatchList from './TaskBatchList'

const InboxPage = () => {
  const [focusId, setFocusId] = useState<string>()
  const [inboxState, setInboxState] =
    useState<IInboxState>('NAVIGATE')
  const isTablet = useIsTablet()

  const inboxContextValue = useInboxContext({
    focusId,
    setFocusId,
    inboxState,
    setInboxState,
  })

  return (
    <InboxContext.Provider value={inboxContextValue}>
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
          <TasksContainer>
            <TaskBatchList />
          </TasksContainer>
        </FlexColumn>
      </PageContainer>
    </InboxContext.Provider>
  )
}

const TasksContainer = styled.div`
  width: 100%;
`

export default InboxPage

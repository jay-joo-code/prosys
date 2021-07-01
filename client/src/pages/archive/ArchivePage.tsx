import React, { useState } from 'react'
import { useArchivedTasks } from 'src/api/task'
import NavHeader from 'src/components/header/NavHeader'
import { FlexRow } from 'src/components/layout/Flex'
import TaskList from 'src/components/TaskList'
import { IInboxState } from 'src/types/task.type'
import styled from 'styled-components'

const ArchivePage = () => {
  const [focusId, setFocusId] = useState<string>()
  const [inboxState, setInboxState] = useState<IInboxState>('NAVIGATE')
  const { tasks } = useArchivedTasks()

  return (
    <FlexRow justifyCenter>
      <Container>
        <NavHeader inboxState={inboxState} />
        <TaskList
          focusId={focusId}
          setFocusId={setFocusId}
          inboxState={inboxState}
          setInboxState={setInboxState}
          tasks={tasks}
        />
      </Container>
    </FlexRow>
  )
}

const Container = styled.div`
  padding: 1rem;
  width: 100%;

  @media (min-width: ${(props) => props.theme.tablet}) {
    max-width: 800px;
  }
`

export default ArchivePage

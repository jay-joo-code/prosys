const is = 'deprecated'

export default is

// import React, { useState } from 'react'
// import { useArchivedTasks } from 'src/api/task'
// import NavHeader from 'src/components/header/NavHeader'
// import PageContainer from 'src/components/layout/PageContainer'
// import TaskList from 'src/components/TaskList'
// import { IInboxState } from 'src/types/task.type'

// const ArchivePage = () => {
//   const [focusId, setFocusId] = useState<string>()
//   const [inboxState, setInboxState] = useState<IInboxState>('NAVIGATE')
//   const { tasks } = useArchivedTasks()

//   return (
//     <PageContainer>
//       <NavHeader inboxState={inboxState} />
//       <TaskList
//         focusId={focusId}
//         setFocusId={setFocusId}
//         inboxState={inboxState}
//         setInboxState={setInboxState}
//         tasks={tasks}
//       />
//     </PageContainer>
//   )
// }

// export default ArchivePage

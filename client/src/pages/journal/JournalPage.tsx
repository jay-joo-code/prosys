import React from 'react'
import NavHeader from 'src/components/header/NavHeader'
import PageContainer from 'src/components/layout/PageContainer'

const JournalPage = () => {
  return (
    <PageContainer>
      <NavHeader inboxState='CREATE' />
    </PageContainer>
  )
}

export default JournalPage

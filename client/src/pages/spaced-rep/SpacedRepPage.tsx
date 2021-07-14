import React from 'react'
import NavHeader from 'src/components/header/NavHeader'
import PageContainer from 'src/components/layout/PageContainer'
import Learn from './Learn'

const SpacedRepPage = () => {
  return (
    <PageContainer>
      <NavHeader inboxState={'CREATE'} />
      <Learn />
    </PageContainer>
  )
}

export default SpacedRepPage

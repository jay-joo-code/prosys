import React from 'react'
import NavHeader from 'src/components/header/NavHeader'
import PageContainer from 'src/components/layout/PageContainer'
import Space from 'src/components/layout/Space'
import Learn from './Learn'

const SpacedRepPage = () => {
  return (
    <PageContainer>
      <NavHeader inboxState='CREATE' />
      <Space padding='1rem 0' />
      <Learn />
    </PageContainer>
  )
}

export default SpacedRepPage

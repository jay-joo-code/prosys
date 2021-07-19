import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import React, { useState } from 'react'
import { useCreateCard } from 'src/api/card'
import { useTags } from 'src/api/tag'
import Button from 'src/components/Button'
import NavHeader from 'src/components/header/NavHeader'
import PageContainer from 'src/components/layout/PageContainer'
import TagList from 'src/components/tag/TagList'
import styled from 'styled-components'
import CardList from './CardList'

const WikiPage = () => {
  const { tags } = useTags()
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const { createCard } = useCreateCard()

  const handleCreateCard = () => {
    createCard({
      question: [],
      answer: [],
    })
  }

  return (
    <PageContainer>
      <NavHeader inboxState='CREATE' />
      <TopRow>
        <TagList
          tags={tags || []}
          selectedTagIds={selectedTagIds}
          setSelectedTagIds={setSelectedTagIds}
        />
        <Button onClick={handleCreateCard} startIcon={<AddOutlinedIcon />}>
          New card
        </Button>
      </TopRow>
      <CardList selectedTagIds={selectedTagIds} />
    </PageContainer>
  )
}

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 3rem 0;
`

export default WikiPage

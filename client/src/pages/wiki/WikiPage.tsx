import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ObjectID from 'bson-objectid'
import React, { useState } from 'react'
import { useCreateCard } from 'src/api/card'
import { useTags } from 'src/api/tag'
import Button from 'src/components/Button'
import NavHeader from 'src/components/header/NavHeader'
import { FlexRow } from 'src/components/layout/Flex'
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
      _id: new ObjectID().toHexString(),
      question: [],
      answer: [],
      isLearning: true,
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
          isCreate
        />
      </TopRow>
      <BottomRow justifyEnd>
        <Button onClick={handleCreateCard} startIcon={<AddOutlinedIcon />}>
          New card
        </Button>
      </BottomRow>
      <CardList selectedTagIds={selectedTagIds} />
    </PageContainer>
  )
}

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
`

const BottomRow = styled(FlexRow)`
  margin-bottom: 2rem;
`

export default WikiPage

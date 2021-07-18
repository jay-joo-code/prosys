import React from 'react'
import { ICard, ICardStatus } from 'src/types/card.type'
import styled from 'styled-components'
import Text from '../fonts/Text'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import TagList from '../tag/TagList'
import CardIsLearning from './CardIsLearning'
import CardMenu from './CardMenu'

interface CollapsedCardProps {
  card: ICard
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
}

const CollapsedCard = ({ card, setStatus }: CollapsedCardProps) => {
  const handleClick = () => {
    setStatus('EXPANDED')
  }

  return (
    <Container onClick={handleClick}>
      <FlexRow justifySpaceBetween alignStart>
        <div>
          <Text variant='p' maxLines={2}>
            {card?.question[0]?.value}
          </Text>
          {card?.tags?.length > 0 && <Space padding='.5rem 0' />}
          <TagList
            tags={card?.tags || []}
            selectedTagIds={card?.tags?.map((tag) => tag?._id) || []}
          />
        </div>
        <RightSide alignCenter>
          <CardIsLearning isLearning={card?.isLearning} cid={card?._id} />
          <CardMenu card={card} setStatus={setStatus} status='COLLAPSED' />
        </RightSide>
      </FlexRow>
    </Container>
  )
}

const Container = styled.div``

const RightSide = styled(FlexRow)`
  & > * {
    margin-left: 0.5rem;
  }
`

export default CollapsedCard

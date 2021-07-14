import { IconButton } from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUpdateCardById } from 'src/api/card'
import { useTags } from 'src/api/tag'
import theme from 'src/app/theme'
import Button from 'src/components/Button'
import { showSnackbar } from 'src/redux/snackbarSlice'
import { ICard, ICardStatus, ICodableTextareaBlock } from 'src/types/card.type'
import { isBlocksEmpty } from 'src/util/card'
import { isDateBeforeToday, isDateTodayOrBefore } from 'src/util/date'
import styled from 'styled-components'
import Text from '../fonts/Text'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import TagList from '../tag/TagList'
import CardMenu from './CardMenu'

interface CardToolBarProps {
  card: ICard
  status: ICardStatus
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
  questionBlocks: ICodableTextareaBlock[]
  answerBlocks: ICodableTextareaBlock[]
}

const CardToolBar = ({
  card,
  status,
  setStatus,
  questionBlocks,
  answerBlocks,
}: CardToolBarProps) => {
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const { tags } = useTags()
  const dispatch = useDispatch()
  const { updateCard } = useUpdateCardById(card?._id)

  useEffect(() => {
    if (card?.tags) {
      setSelectedTagIds(card?.tags?.map((tag) => tag?._id))
    }
  }, [card])

  const toggleStatus = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (status === 'EDITING') {
      if (isBlocksEmpty(questionBlocks)) {
        dispatch(
          showSnackbar({
            variant: 'error',
            message: 'Question cannot be empty',
          })
        )
      } else {
        updateCard({
          _id: card?._id,
          question: questionBlocks,
          answer: answerBlocks,
          tags: selectedTagIds,
        })
        setStatus('EXPANDED')
        dispatch(
          showSnackbar({
            variant: 'success',
            message: 'Card has been saved',
          })
        )
      }
    } else {
      setStatus('EDITING')
    }
  }

  const hasTags = card?.tags?.length > 0 || status === 'EDITING'

  return (
    <Container alignStart={hasTags} alignCenter={!hasTags} justifySpaceBetween>
      <div>
        <TagList
          isCreate={status === 'EDITING'}
          isFiltered={status !== 'EDITING'}
          tags={tags || []}
          selectedTagIds={selectedTagIds}
          setSelectedTagIds={setSelectedTagIds}
        />
        {hasTags && <Space padding='.3rem' />}
        {card?.repAt && (
          <Text variant='h5' color={theme.text.muted}>
            {isDateTodayOrBefore(new Date(card.repAt))
              ? 'Qued'
              : `Next rep in ${moment(card?.repAt).fromNow()}`}{' '}
            • {card?.repSpace} days of rep space • {card?.repCount} total reps
          </Text>
        )}
      </div>
      <ButtonsContainer alignCenter>
        <IconButton size='small' color='inherit' onClick={toggleStatus}>
          {status === 'EDITING' ? (
            <Button color={theme.success[500]}>Save</Button>
          ) : (
            <StyledEditIcon />
          )}
        </IconButton>
        <CardMenu status={status} setStatus={setStatus} card={card} />
      </ButtonsContainer>
    </Container>
  )
}

const Container = styled(FlexRow)`
  margin-top: 2rem;
`

const ButtonsContainer = styled(FlexRow)`
  & > * {
    margin-left: 0.5rem !important;
  }
`

const StyledEditIcon = styled(EditOutlinedIcon)`
  fill: ${(props) => props.theme.grey[700]} !important;
`

export default CardToolBar

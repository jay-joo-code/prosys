import { IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useTags } from 'src/api/tag'
import { ICard, ICardStatus, ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'
import { FlexRow } from '../layout/Flex'
import Button from 'src/components/Button'
import TagList from '../tag/TagList'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined'
import theme from 'src/app/theme'
import { useDispatch } from 'react-redux'
import { showSnackbar } from 'src/redux/snackbarSlice'
import { isBlocksEmpty } from 'src/util/card'
import { useUpdateCardById } from 'src/api/card'
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

  const toggleStatus = () => {
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

  return (
    <Container alignCenter justifySpaceBetween>
      <TagList
        isCreate
        tags={tags || []}
        selectedTagIds={selectedTagIds}
        setSelectedTagIds={setSelectedTagIds}
      />
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
  margin-bottom: 1.5rem;
`

const ButtonsContainer = styled(FlexRow)`
  & > * {
    margin-left: 0.5rem !important;
  }
`

const StyledEditIcon = styled(EditOutlinedIcon)`
  fill: ${(props) => props.theme.grey[700]} !important;
`

const StyledMoreIcon = styled(MoreVertOutlinedIcon)`
  fill: ${(props) => props.theme.grey[700]} !important;
`

export default CardToolBar

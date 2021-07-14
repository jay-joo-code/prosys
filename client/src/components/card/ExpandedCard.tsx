import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import React from 'react'
import { useDispatch } from 'react-redux'
import theme from 'src/app/theme'
import { showSnackbar } from 'src/redux/snackbarSlice'
import { ICard, ICardStatus } from 'src/types/card.type'
import styled from 'styled-components'
import Text from '../fonts/Text'
import CodableTextarea from '../form-elements/CodableTextarea'
import { FlexRow } from '../layout/Flex'
import OutsideClickListener from '../util/OutsideClickListener'
import CardToolBar from './CardToolbar'

interface ExpandedCardProps {
  card: ICard
  status: ICardStatus
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
}

const ExpandedCard = ({ card, status, setStatus }: ExpandedCardProps) => {
  const dispatch = useDispatch()

  const handleOutsideClick = () => {
    setStatus('COLLAPSED')
  }

  const handleRepeatRep = () => {
    dispatch(
      showSnackbar({
        variant: 'info',
        message: `Card rep will repeat in ${card?.repSpace} days.`,
      })
    )
  }

  const handleDoubleRep = () => {
    dispatch(
      showSnackbar({
        variant: 'success',
        message: `Card rep has doubled and will repeat in ${
          card?.repSpace * 2
        } days.`,
      })
    )
  }

  const handleContentClick = () => {
    if (status === 'EXPANDED') {
      setStatus('FLIPPED')
    } else if (status === 'FLIPPED') {
      setStatus('EXPANDED')
    }
  }

  return (
    <OutsideClickListener onOutsideClick={handleOutsideClick}>
      <Container>
        <LearnSection justifySpaceBetween>
          <RepButtonContainer onClick={handleRepeatRep}>
            <FlexRow alignStart>
              <ArrowBackIcon className='left' />
              <div>
                <Text variant='p' fontWeight={700} color={theme.grey[700]}>
                  Not sure
                </Text>
                <Text variant='h5' color={theme.text.muted}>
                  Repeat rep
                </Text>
              </div>
            </FlexRow>
          </RepButtonContainer>
          <RepButtonContainer onClick={handleDoubleRep}>
            <FlexRow alignStart>
              <div>
                <StyledText
                  variant='p'
                  fontWeight={700}
                  color={theme.grey[700]}>
                  Got it!
                </StyledText>
                <Text variant='h5' color={theme.text.muted}>
                  Space rep
                </Text>
              </div>
              <ArrowForwardIcon className='right' />
            </FlexRow>
          </RepButtonContainer>
        </LearnSection>
        <Content onClick={handleContentClick}>
          <CodableTextarea
            blocks={status === 'EXPANDED' ? card?.question : card?.answer}
          />
        </Content>
        <CardToolBar
          card={card}
          status={status}
          setStatus={setStatus}
          questionBlocks={card?.question}
          answerBlocks={card?.answer}
        />
      </Container>
    </OutsideClickListener>
  )
}

const Container = styled.div``

const LearnSection = styled(FlexRow)``

const Content = styled.div`
  margin: 1rem 0;
`

const StyledText = styled(Text)`
  text-align: right;
`

const RepButtonContainer = styled.div`
  padding: 0.5rem;
  border-radius: 8px;

  & svg {
    fill: ${(props) => props.theme.grey[700]} !important;
  }

  & svg.left {
    margin-right: 0.5rem;
  }

  & svg.right {
    margin-left: 0.5rem;
  }

  &:hover {
    background: ${(props) => props.theme.grey[50]};
  }
`

export default ExpandedCard

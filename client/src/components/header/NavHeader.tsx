import React from 'react'
import styled from 'styled-components'
import Text from '../fonts/Text'
import useRouter from 'src/hooks/useRouter'
import { Link } from 'react-router-dom'
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined'
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState } from 'src/types/task.type'
import useIsInbox from 'src/hooks/useIsInbox'
import useIsCards from 'src/hooks/useIsCards'
import useIsArchive from 'src/hooks/useIsArchive'

interface NavHeaderProps {
  inboxState: IInboxState
}

const NavHeader = ({ inboxState }: NavHeaderProps) => {
  const { push } = useRouter()
  const isInbox = useIsInbox()
  const isArchive = useIsArchive()
  const isCards = useIsCards()

  useKeypress('Tab', (event) => {
    if (['NAVIGATE', 'CREATE'].includes(inboxState)) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()

      if (event.shiftKey) {
        if (isInbox) {
          push('/cards')
        } else if (isArchive) {
          push('/inbox')
        } else if (isCards) {
          push('/archive')
        }
      } else {
        if (isInbox) {
          push('/archive')
        } else if (isArchive) {
          push('/cards')
        } else if (isCards) {
          push('/inbox')
        }
      }
    }
  })

  return (
    <Container>
      <Link to='/inbox'>
        <NavItem isSelected={isInbox}>
          <InboxOutlinedIcon />
          <Label variant='h5' isSelected={isInbox}>
            Inbox
          </Label>
        </NavItem>
      </Link>
      <Link to='/archive'>
        <NavItem isSelected={isArchive}>
          <FolderOutlinedIcon />
          <Label variant='h5' isSelected={isArchive}>
            Archive
          </Label>
        </NavItem>
      </Link>
      <Link to='/cards'>
        <NavItem isSelected={isCards}>
          <SchoolOutlinedIcon />
          <Label variant='h5' isSelected={isCards}>
            Cards
          </Label>
        </NavItem>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;

  & > * {
    margin-right: 0.5rem;
  }
`

interface NavItemProps {
  isSelected: boolean
}

const NavItem = styled.div<NavItemProps>`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.grey[300]};
  padding: 0.3rem 0.2rem 0.3rem 0.5rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  & > *:first-of-type {
    margin-right: 0.5rem;
  }

  & svg {
    height: 20px !important;
    width: 20px !important;
    fill: ${(props) => props.theme.grey[600]};
  }

  // isSelected
  background: ${(props) => props.isSelected && props.theme.brand[75]};
  border-color: ${(props) => props.isSelected && props.theme.brand[75]};

  & svg {
    fill: ${(props) => props.isSelected && props.theme.brand[500]};
  }
`

interface LabelProps {
  isSelected: boolean
}

const Label = styled(Text)<LabelProps>`
  font-weight: 700;
  color: ${(props) => props.theme.grey[600]};

  // isSelected
  color: ${(props) => props.isSelected && props.theme.brand[500]};
`

export default NavHeader

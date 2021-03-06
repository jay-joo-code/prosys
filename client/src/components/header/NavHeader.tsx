import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined'
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined'
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import useIsCreateCard from 'src/hooks/useIsCreateCard'
import useIsInbox from 'src/hooks/useIsInbox'
import useIsSpacedRep from 'src/hooks/useIsSpacedRep'
import useIsWiki from 'src/hooks/useIsWiki'
import useKeypress from 'src/hooks/useKeyPress'
import useRouter from 'src/hooks/useRouter'
import { toggleHide } from 'src/redux/appSlice'
import { IInboxState } from 'src/types/task.type'
import styled from 'styled-components'
import Text from '../fonts/Text'

interface NavHeaderProps {
  inboxState: IInboxState
}

const NavHeader = ({ inboxState }: NavHeaderProps) => {
  const { push } = useRouter()
  const isInbox = useIsInbox()
  const isSpacedRep = useIsSpacedRep()
  const isWiki = useIsWiki()
  const isCreateCard = useIsCreateCard()
  const dispatch = useDispatch()

  useKeypress('Tab', (event) => {
    if (['NAVIGATE', 'CREATE'].includes(inboxState)) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()

      if (event.shiftKey) {
        // backward navigation
        if (isInbox) {
          push('/wiki')
        } else if (isSpacedRep) {
          push('/inbox')
        } else if (isWiki) {
          push('/spaced-rep')
        }
      } else {
        // forward navigation
        if (isInbox) {
          push('/spaced-rep')
        } else if (isSpacedRep) {
          push('/wiki')
        } else if (isWiki) {
          push('/inbox')
        }
      }
    }
  })

  // hide screen
  useKeypress(['h', 'ㅗ'], (event) => {
    if (
      document.activeElement?.tagName !== 'TEXTAREA' &&
      document.activeElement?.tagName !== 'INPUT'
    ) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      dispatch(toggleHide())
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
      {/* <Link to='/archive'>
        <NavItem isSelected={isArchive}>
          <FolderOutlinedIcon />
          <Label variant='h5' isSelected={isArchive}>
            Archive
          </Label>
        </NavItem>
      </Link> */}
      <Link to='/spaced-rep'>
        <NavItem isSelected={isSpacedRep}>
          <SchoolOutlinedIcon />
          <Label variant='h5' isSelected={isSpacedRep}>
            Spaced Repetition
          </Label>
        </NavItem>
      </Link>
      <Link to='/wiki'>
        <NavItem isSelected={isWiki || isCreateCard}>
          <LibraryBooksOutlinedIcon />
          <Label variant='h5' isSelected={isWiki || isCreateCard}>
            Wiki
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
  overflow-x: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

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
  white-space: nowrap;

  // isSelected
  color: ${(props) => props.isSelected && props.theme.brand[500]};
`

export default memo(NavHeader)

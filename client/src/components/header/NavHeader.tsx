import React, { memo } from 'react'
import styled from 'styled-components'
import Text from '../fonts/Text'
import useRouter from 'src/hooks/useRouter'
import { Link } from 'react-router-dom'
import useKeypress from 'src/hooks/useKeyPress'
import { IInboxState } from 'src/types/task.type'
import useIsInbox from 'src/hooks/useIsInbox'
import useIsArchive from 'src/hooks/useIsArchive'
import useIsSpacedRep from 'src/hooks/useIsSpacedRep'
import useIsWiki from 'src/hooks/useIsWiki'
import useIsCreateCard from 'src/hooks/useIsCreateCard'
import { useDispatch } from 'react-redux'
import { toggleHide } from 'src/redux/appSlice'
import useIsJournal from 'src/hooks/useIsJournal'
import { routes } from 'src/app/Routes'

interface NavHeaderProps {
  inboxState: IInboxState
}

const NavHeader = ({ inboxState }: NavHeaderProps) => {
  const { push, pathname } = useRouter()
  const isInbox = useIsInbox()
  const isArchive = useIsArchive()
  const isSpacedRep = useIsSpacedRep()
  const isWiki = useIsWiki()
  const isJournal = useIsJournal()
  const dispatch = useDispatch()

  useKeypress('Tab', (event) => {
    if (['NAVIGATE', 'CREATE'].includes(inboxState)) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()

      const paths = routes
        ?.filter((route) => route?.isPrivateNav)
        ?.map((route) => route.path)

      if (event.shiftKey) {
        const nextPathIdx =
          paths.indexOf(pathname) - 1 >= 0
            ? paths.indexOf(pathname) - 1
            : paths?.length - 1
        push(paths[nextPathIdx])
      } else {
        const nextPathIdx =
          paths.indexOf(pathname) + 1 < paths?.length
            ? paths.indexOf(pathname) + 1
            : 0
        console.log('nextPathIdx', nextPathIdx)
        push(paths[nextPathIdx])
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
      {routes
        ?.filter((route) => route?.isPrivateNav)
        .map(({ path, icon, label }) => (
          <Link key={path} to={path}>
            <NavItem isSelected={pathname === path}>
              {icon}
              <Label variant='h5' isSelected={pathname === path}>
                {label}
              </Label>
            </NavItem>
          </Link>
        ))}
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

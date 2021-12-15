import JournalIcon from '@material-ui/icons/EventNoteOutlined'
import OverviewIcon from '@material-ui/icons/AssessmentOutlined'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import Text from '../fonts/Text'

const NavHeader = () => {
  const router = useRouter()

  const navs = [
    {
      label: 'Journal',
      route: '/journal',
      icon: <JournalIcon />,
    },
    {
      label: 'Overview',
      route: '/overview',
      icon: <OverviewIcon />,
    },
  ]

  return (
    <Container>
      {navs.map(({ label, route, icon }) => (
        <Link key={route} to={route}>
          <NavItem isSelected={router.pathname === route}>
            {icon}
            <Label variant='h5' isSelected={router.pathname === route}>
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

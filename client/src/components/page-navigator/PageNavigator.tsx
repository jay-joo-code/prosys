import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import { FlexRow } from '../layout/Flex'
import { Link } from 'react-router-dom'
import useRouter from 'src/hooks/useRouter'
import useKeypress from 'src/hooks/useKeyPress'

const PageNavigator = () => {
  const { pathname, push } = useRouter()
  const options = [
    {
      label: 'Inbox',
      path: '/inbox',
    },
    {
      label: 'Schedule',
      path: '/schedule',
    },
  ]

  useKeypress('i', (event) => {
    if (event.metaKey || event.ctrlKey) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      push('/inbox')
    }
  })

  useKeypress('s', (event) => {
    if (event.metaKey || event.ctrlKey) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      push('/schedule')
    }
  })

  return (
    <Container>
      <FlexRow>
        {options.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
          >
            <Button variant={pathname === path ? 'contained' : 'text'}>{label}
            </Button>
          </Link>
        ))}
      </FlexRow>
    </Container>
  )
}

const Container = styled.div`
  padding: .5rem;

  & button {
    margin-right: 1rem;
  }
`

export default PageNavigator

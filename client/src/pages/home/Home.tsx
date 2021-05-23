import React from 'react'
import { useCurrentUser } from 'src/api/user'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'

const Home = () => {
  const { currentUser } = useCurrentUser()
  const router = useRouter()

  if (currentUser) router.push('/inbox')

  return (
    <Container>
      Home
    </Container>
  )
}

const Container = styled.div`
  
`

export default Home

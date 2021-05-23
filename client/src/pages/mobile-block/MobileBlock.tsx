import React from 'react'
import Text from 'src/components/fonts/Text'
import styled from 'styled-components'

const Container = styled.div`
  
`

const MobileBlock = () => {
  return (
    <Container>
      <Text variant='p'>Course Flow is currently not available on mobile.</Text>
    </Container>
  )
}

export default MobileBlock

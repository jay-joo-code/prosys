import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'src/components/Button'
import Modal from 'src/components/modals/Modal'

const TestModalButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Container>
          test modal
        </Container>
      </Modal>
    </>
  )
}

const Container = styled.div`
  
`

export default TestModalButton

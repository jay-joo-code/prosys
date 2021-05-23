import React, { useState } from 'react'
import Button from 'src/components/Button'
import ConfirmationModal from 'src/components/modals/ConfirmationModal'

const ConfirmationModalButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open confirmation modal</Button>
      <ConfirmationModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        confirmLabel='Confirm'
        heading='Confirm'
        description='Confirm description'
      />
    </>
  )
}

export default ConfirmationModalButton

import React from 'react'
import Modal from './Modal'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import Text from '../fonts/Text'
import Button from '../Button'

interface ConfirmationModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: () => void
  confirmLabel: string
  heading: string
  description: string
}

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, heading, description, confirmLabel }: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      heading={heading}
    >
      <Text
        maxWidth={280}
        variant='h5'
      >{description}
      </Text>
      <Space margin='1.5rem 0' />
      <FlexRow
        alignCenter
        justifyEnd
      >
        <Button
          variant='text'
          onClick={() => onRequestClose()}
        >Cancel
        </Button>
        <Space margin='0 .5rem' />
        <Button
          onClick={onConfirm}
        >{confirmLabel}
        </Button>
      </FlexRow>
    </Modal>
  )
}

export default ConfirmationModal

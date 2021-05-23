import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import React from 'react'
import theme from 'src/app/theme'
import Button from 'src/components/Button'
import styled from 'styled-components'
import ConfirmationModalButton from './ConfirmationModalButton'
import TestModalButton from './TestModalButton'

const ButtonsSystem = () => {
  return (
    <div>
      <ButtonsContainer>
        <Button
          variant='contained'
        >test
        </Button>
        <Button
          variant='text'
        >test
        </Button>
        <Button
          variant='outlined'
        >test
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <Button
          variant='contained'
          color={theme.info[500]}
        >test
        </Button>
        <Button
          variant='text'
          color={theme.info[500]}
          background={theme.info[50]}
        >test
        </Button>
        <Button
          variant='outlined'
          color={theme.info[500]}
        >test
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <Button
          variant='contained'
          disabled
        >test
        </Button>
        <Button
          variant='text'
          disabled
        >test
        </Button>
        <Button
          variant='outlined'
          disabled
        >test
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <Button
          variant='contained'
          size='small'
        >test
        </Button>
        <Button
          variant='contained'
          size='medium'
        >test
        </Button>
        <Button
          variant='contained'
          size='large'
        >test
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <Button
          variant='contained'
          startIcon={<DeleteIcon />}
          color={theme.danger[500]}
        >delete
        </Button>
        <Button
          variant='contained'
          startIcon={<SaveIcon />}
          color={theme.info[500]}
        >save
        </Button>
        <Button
          variant='contained'
          startIcon={<SaveIcon />}
          color={theme.info[500]}
        >save
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <DeleteIcon fontSize='small' />
        <DeleteIcon fontSize='large' />
        <DeleteIconContainer>
          <DeleteIcon fontSize='inherit' />
        </DeleteIconContainer>
      </ButtonsContainer>
      <ButtonsContainer>
        <Tooltip title='Delete'>
          <IconButton>
            <StyledAddCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Save'>
          <IconButton>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </ButtonsContainer>
      <ButtonsContainer>
        <TestModalButton />
        <ConfirmationModalButton />
      </ButtonsContainer>
    </div>
  )
}

const ButtonsContainer = styled.div`
  & > * {
    margin: .5rem !important;
  }
`

const DeleteIconContainer = styled.div`
  display: inline-block;
  font-size: 60px;
`

const StyledAddCircleIcon = styled(AddCircleOutlineOutlinedIcon)`
  color: ${props => props.theme.brand[500]};
`

export default ButtonsSystem

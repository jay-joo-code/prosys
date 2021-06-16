import { Slide, Snackbar, SnackbarCloseReason } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideSnackbar } from 'src/redux/snackbar'
import { IRootState } from 'src/types/redux.type'

const TransitionUp = (props: TransitionProps) => <Slide {...props} direction='up' />

const GlobalSnackbar = () => {
  const dispatch = useDispatch()
  const { isOpen, variant, message } = useSelector((state: IRootState) => state.snackbarState)

  const handleSnackbarClose = (
    event: React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(hideSnackbar())
  }

  const handleAlertClose = (event: React.SyntheticEvent<Element, Event>) => {
    dispatch(hideSnackbar())
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      TransitionComponent={TransitionUp}>
      <Alert onClose={handleAlertClose} severity={variant}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default GlobalSnackbar

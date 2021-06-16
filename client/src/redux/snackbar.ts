import { createSlice } from '@reduxjs/toolkit'

import { ISnackbarState } from 'src/types/redux.type'

const initialState: ISnackbarState = {
  isOpen: false,
  variant: 'error',
  message: '',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, { payload }) => {
      state.isOpen = true
      state.variant = payload.variant
      state.message = payload.message
    },
    hideSnackbar: (state) => {
      state.isOpen = false
    },
  },
})

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer

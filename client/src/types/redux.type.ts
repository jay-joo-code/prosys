export interface IAuthState {
  accessToken: string | null
}

export interface ISnackbarState {
  isOpen: boolean
  variant: ISnackbarVariant
  message: string
}

export type ISnackbarVariant = 'error' | 'warning' | 'info' | 'success'

export interface IRootState {
  authState: IAuthState
  snackbarState: ISnackbarState
}

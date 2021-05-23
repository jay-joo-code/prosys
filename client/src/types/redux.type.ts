export interface IAuthState {
  accessToken: string | null
}

export interface IRootState {
  authState: IAuthState
}

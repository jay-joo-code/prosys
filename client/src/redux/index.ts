import { combineReducers, Reducer } from 'redux'
import { IRootState } from 'src/types/redux.type'

import authReducer from './auth'
import snackbarReducer from './snackbar'

const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
  authState: authReducer,
  snackbarState: snackbarReducer,
})

export default rootReducer

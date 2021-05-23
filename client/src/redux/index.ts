import { combineReducers, Reducer } from 'redux'

import authReducer from './auth'
import { IRootState } from 'src/types/redux.type'

const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
  authState: authReducer,
})

export default rootReducer

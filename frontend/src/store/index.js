import {createStore, combineReducers} from 'redux'
import { userReducer } from './userReducers.js'
//import { postReducer } from './postReducers.js'

const rootReducer = combineReducers({
  user: userReducer
})

export const store = createStore(rootReducer)
import { combineReducers } from 'redux'
import admin from './admin'
import errors from './errors'
import messages from './messages'

export default combineReducers({
    admin,
    errors,
    messages
})
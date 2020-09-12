import {combineReducers} from 'redux'


import messages from '@redux/messages.reducer.js'
import profile from '@redux/profile.reducer.js'

const reducer = combineReducers({messages, profile});

export default reducer;
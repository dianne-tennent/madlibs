import { combineReducers } from 'redux'

import list from './list'
import story from './story'

export default combineReducers({
  list,
  story
})

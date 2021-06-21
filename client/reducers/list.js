import { ADD_NEW_WORD } from '../actions'

const initialState = []

const list = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_WORD:
      return [...state, action.newWord]
    default:
      return state
  }
}

export default list

import { getStoryByName } from '../apis/madlibs'

export const ADD_NEW_WORD = 'ADD_NEW_WORD'
export const SET_STORY = 'SET_STORY'
export const REPLACE_WORDS_IN_STORY = 'REPLACE_WORDS_IN_STORY'
export const RESET_WORD_LIST = 'RESET_WORD_LIST'
export const REPLACE_WORD_IN_LIST = 'REPLACE_WORD_IN_LIST'
export const SET_USER_GENERATED_STORY = 'SET_USER_GENERATED_STORY'
export const TAG_NEW_WORDS = 'TAG_NEW_WORDS'

export function addNewWordToReplacementList (newWord) {
  return {
    type: ADD_NEW_WORD,
    newWord
  }
}

export function replaceWordInWordList (newWord) {
  return {
    type: REPLACE_WORD_IN_LIST,
    newWord
  }
}

export function resetWordList () {
  return {
    type: RESET_WORD_LIST
  }
}

export function setStory (story) {
  return {
    type: SET_STORY,
    story
  }
}

export function replaceWordsInStory () {
  return {
    type: REPLACE_WORDS_IN_STORY
  }
}

export function tagNewWords () {
  return {
    type: TAG_NEW_WORDS
  }
}

//THUNK
export function grabStoryFromDatabase (storyName) {
  return (dispatch) => {
    return getStoryByName(storyName)
    .then((storyText) => {
      console.log(storyText)
      dispatch(setStory(storyText))
      return null
    })
    .catch((err) => {
      // if the error is from our routes, this will use the message our route
      // sends back, rather than the generic 'Internal Server Error' from a
      // status 500
      // if the error is from elsewhere in the Promise chain, there won't be
      // an err.response object, so we use err.message
      const errMessage = err.response?.text || err.message
      console.log(errMessage)
    })
  }
}

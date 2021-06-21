

export const ADD_NEW_WORD = 'ADD_NEW_WORD'
export const SET_ORIGINAL_STORY_ARRAY = 'SET_ORIGINAL_STORY_ARRAY'
export const REPLACE_WORD_IN_STORY = 'REPLACE_WORD_IN_STORY'
export const SET_WORD_LIST = 'SET_WORD_LIST'

export function addNewWordToReplacementList (newWord) {
  return {
    type: ADD_NEW_WORD,
    newWord
  }
}

export function setWordList (list) {
  return {
    type: SET_WORD_LIST,
    list
  }
}

export function setOriginalStoryArray (array) {
  return {
    type: SET_ORIGINAL_STORY_ARRAY,
    array
  }
}

export function replaceWordInStory (wordObject) {
  return {
    type: REPLACE_WORD_IN_STORY,
    wordObject
  }
}

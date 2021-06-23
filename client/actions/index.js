

export const ADD_NEW_WORD = 'ADD_NEW_WORD'
export const SET_ORIGINAL_STORY_ARRAY = 'SET_ORIGINAL_STORY_ARRAY'
export const REPLACE_WORDS_IN_STORY = 'REPLACE_WORDS_IN_STORY'
export const RESET_WORD_LIST = 'RESET_WORD_LIST'
export const REPLACE_WORD_IN_LIST = 'REPLACE_WORD_IN_LIST'

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

export function setOriginalStoryArray (array) {
  return {
    type: SET_ORIGINAL_STORY_ARRAY,
    array
  }
}

export function replaceWordsInStory () {
  return {
    type: REPLACE_WORDS_IN_STORY
  }
}

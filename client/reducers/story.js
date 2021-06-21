import { REPLACE_WORD_IN_STORY, SET_ORIGINAL_STORY_ARRAY, SET_WORD_LIST } from '../actions'

const initialState = {}

const story = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORIGINAL_STORY_ARRAY:
        state.story = action.array
      return state
    case SET_WORD_LIST:
        state.wordList = action.list
        return state
    case REPLACE_WORD_IN_STORY:
        return replaceWords(state.story, state.wordList)
    default:
      return state
  }
}

export default story

//reducer helper functions

function replaceWords (storyArray, wordList) {
    for(let i=0;i<storyArray.length;i++) {
        for(let j=0;j<wordList.length;j++) {
            if(i === wordlist[j].index) {
                storyArray[i] = wordList[j].word
                return storyArray[i]
            }
        }
    }

    return storyArray
}
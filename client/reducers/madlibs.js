import { 
    REPLACE_WORDS_IN_STORY, 
    SET_ORIGINAL_STORY_ARRAY, 
    SET_WORD_LIST,
    ADD_NEW_WORD
 } from '../actions'

const initialState = {
    story: [],
    wordList: [],
    newStory: []
}

const madlibs = (state = initialState, action) => {
  switch (action.type) {
      case ADD_NEW_WORD:
        let newState = {...state, wordList: [...state.wordList, action.newWord]}
        return newState
    case SET_ORIGINAL_STORY_ARRAY:
        let storyState = {...state, story: action.array}
      return storyState
    case SET_WORD_LIST:
        state.wordList = action.list
        return state
    case REPLACE_WORDS_IN_STORY:
        console.log(state.story)
        console.log(state.wordList)
        let newStoryArray = replaceWords(state.story, state.wordList)
        state.newStory = [...newStoryArray]
        return state
    default:
      return state
  }
}

export default madlibs

//reducer helper functions

function replaceWords (storyArray, list) {
    let newStoryArray = [...storyArray]
    for(let i=0;i<newStoryArray.length;i++) {
        for(let j=0;j<list.length;j++) {
            //TODO: adjust for multiple indexes
            for(let k=0;k<list[j].index.length;k++) {
                if(i == list[j].index[k]) {
                    console.log(list[j].word)
                    newStoryArray.splice(i, 1, list[j].word)
                }
            }

        }
    }
    console.log("newStoryArray", newStoryArray)
    return newStoryArray
}
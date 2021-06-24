import { 
    REPLACE_WORDS_IN_STORY, 
    SET_STORY, 
    RESET_WORD_LIST,
    ADD_NEW_WORD,
    REPLACE_WORD_IN_LIST
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
    case REPLACE_WORD_IN_LIST:
        console.log("action.newWord", action.newWord)
        let wordListCopy = state.wordList.map((element) => {
            if(element.index === action.newWord.index) {
                // Copy the object before mutating
                return Object.assign({}, element, action.newWord)
            }
            return element
            })
        return {...state, wordList: wordListCopy}
    case SET_STORY:
        let storyArray = action.story.split(' ')
        storyArray = storyArray.map(element => element.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))
        let storyState = {...state, story: storyArray}
      return storyState
    case RESET_WORD_LIST:
        state.wordList = []
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
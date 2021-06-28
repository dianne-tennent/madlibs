import { 
    REPLACE_WORDS_IN_STORY, 
    SET_STORY, 
    RESET_WORD_LIST,
    ADD_NEW_WORD,
    REPLACE_WORD_IN_LIST,
    TAG_NEW_WORDS,
    DISABLE_BUTTON
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
        let wordListCopy = state.wordList.map((element) => {
            if(element.index === action.newWord.index) {
                // Copy the object before mutating
                return Object.assign({}, element, action.newWord)
            }
            return element
            })
        return {...state, wordList: wordListCopy}
    case SET_STORY:
        const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        let storyArray = action.story.story_text.split(' ')
            //if a word has punctuation, move to a separate key-value pair punc: ''
            storyArray = storyArray.map(element => {
                let punc = ''
                let characters = element.split('')
                    if(punctuation.includes(characters[characters.length - 1])) {
                        punc = characters[characters.length - 1]
                    }
                characters = characters.join('')
                characters = characters.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                element = {word: characters, disabled: false, punc}
                return element
            })

        //storyArray = storyArray.map(element => element.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))
        let storyState = {...state, story: {image: action.story.story_image, title: action.story.story_title, storyArray}}
      return storyState
    case RESET_WORD_LIST:
        return {...state, wordList: []}
    case REPLACE_WORDS_IN_STORY:
        let newStoryArray = replaceWords(state.story.storyArray, state.wordList)
        state.newStory = [...newStoryArray]
        return state
    case TAG_NEW_WORDS:
        let mutableState = state
        let newArray = mutableState.newStory.map((item) => {
            if(state.wordList.some(element => element.word === item.word)) {
                return {word: item, newWord: true}
            } else {
                return {word: item, newWord: false}
            }
        })
        return {...mutableState, newStory: newArray}
    case DISABLE_BUTTON:
        let array = state.story.storyArray.map(element => {
            if(element.word === action.word) {
                element = {...element, disabled: true}
            }
            return element
        })
        state.story.storyArray = [...array]
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
                    newStoryArray[i].word = list[j].word
                }
            }

        }
    }
    return newStoryArray
}
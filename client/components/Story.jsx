import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";


import { wordTagger } from '../utils/posHandlers'
import { setOriginalStoryArray, addNewWordToReplacementList, replaceWordsInStory } from '../actions/index'

function Story(props) {




let [ selectedWordList, setSelectedWordList ] = useState([])
let [ error, setError ] = useState('')
let [ formData, setFormData ] = useState([])
let [ newWord, setNewWord ] = useState({})

const originalStory = 'This is some sample text. This text can contain multiple beautiful sentences.'
let originalStoryArray = originalStory.split(' ')
originalStoryArray = originalStoryArray.map(element => element.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))

useEffect(() => {
    props.dispatch(setOriginalStoryArray(originalStoryArray))
}, [])

const addToWordList = (word) => {
    let wordToAdd = wordTagger(word, selectedWordList, props.madlibs.story)
    console.log(wordToAdd)
    setSelectedWordList([...selectedWordList, wordToAdd])
    console.log(selectedWordList)

}

function changeHandler(e, indexes) {
    let addWord = {
        word: e.target.value,
        index: indexes
    }
    setNewWord(addWord)
}
 
    const submitHandler = (e) => {
        //adds user input word to "wordList" list in state ready for substitution
        e.preventDefault()
        props.dispatch(addNewWordToReplacementList(newWord))
    }

    const submitMadLib = () => {
        console.log("wordlist from state", selectedWordList)
        props.dispatch(replaceWordsInStory())
        props.history.push('/output')
    }


    return (
        <>
        <div>
            <h1>Story</h1>
            {originalStoryArray.map((word, i) => {
                return <button key={i} onClick={() => addToWordList(word)}>{word}</button>
            })}
            <p>{error}</p>
            <ul>
                {selectedWordList.length > 0 && selectedWordList.map((item, i) => (
                    <li key={i}>{item.word}: {item.pos}</li>
                ))}
            </ul>
            {selectedWordList.length > 0 && selectedWordList.map((item, i) => (
            <form onSubmit={(e) => submitHandler(e)}>
                <label key={100 + i} htmlFor={item.pos}>{item.pos}</label>
                <input key={200 + i} type='text' id={item.pos} name={item.pos} onChange={(e) => changeHandler(e, item.storyArrayIndexes)}/>
                <button key={300 + i} type="submit">Submit</button>
            </form>
            ))}
            <button onClick={() => submitMadLib()}>Show me my MadLib!</button>
        </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
      list: state.list,
      madlibs: state.madlibs
    };
  }

export default connect(mapStateToProps)(Story)

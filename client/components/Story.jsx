import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { wordTagger, tagValidator, validateWordTypes } from '../utils/posHandlers'
import { resetWordList, setOriginalStoryArray, addNewWordToReplacementList, replaceWordsInStory, replaceWordInWordList } from '../actions/index'

function Story(props) {

let [ selectedWordList, setSelectedWordList ] = useState([])
let [ error, setError ] = useState('')
let [ submissionErrors, setSubmissionErrors ] = useState([])
let [ formData, setFormData ] = useState([])
let [ newWord, setNewWord ] = useState([])
let [ userGeneratedWordList, setUserGeneratedWordList ] = useState([])

const originalStory = 'This is some sample text. This text can contain multiple beautiful sentences.'
let originalStoryArray = originalStory.split(' ')
originalStoryArray = originalStoryArray.map(element => element.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))

useEffect(() => {
    props.dispatch(setOriginalStoryArray(originalStoryArray))
}, [])

const addToWordList = (word) => {
    let wordToAdd = wordTagger(word, selectedWordList, props.madlibs.story)
    if (wordToAdd.hasOwnProperty('errorMessage')) {
        return setError(wordToAdd.errorMessage)
    } else {
        console.log("Selected word". wordToAdd)
        setSelectedWordList([...selectedWordList, wordToAdd])
        console.log(selectedWordList)
    }
}

function blurHandler(e, indexes, pos) {
    let thisWord = {}
    thisWord = {...thisWord, 
    word: e.target.value,
    index: indexes,
    pos: pos
}
//prevent adding empty strings
if(thisWord.word === '') {
    return
}

let replace = false
//check if thisWord is a replacement
props.madlibs.wordList.map(element => {
    if(element.index === thisWord.index) {
        //replace item in redux
        replace = true
        return props.dispatch(replaceWordInWordList(thisWord))
    }
})

if(replace === false) {
    props.dispatch(addNewWordToReplacementList(thisWord))
}

console.log(thisWord)
}

    const submitMadLib = () => {
        let errors = validateWordTypes(props.madlibs.wordList)
        if(Array.isArray(errors)) {
            setSubmissionErrors(errors)
            props.dispatch(resetWordList())
        } else {
            props.dispatch(replaceWordsInStory())
            props.history.push('/output')
        }

    }

    return (
        <>
        <div>
            <h1>Story</h1>
            {originalStoryArray.map((word, i) => {
                return <button key={i} onClick={() => addToWordList(word)}>{word}</button>
            })}
            <p>{error}</p>
            {selectedWordList.length > 0 && selectedWordList.map((item, i) => (
            <form>
                <label key={100 + i} htmlFor={item.pos}>{item.pos}</label>
                <input 
                key={200 + i}
                type='text' 
                id={item.storyArrayIndexes} 
                name={item.word} 
                onBlur={(e) => blurHandler(e, item.storyArrayIndexes, item.pos)}/>
            </form>
            ))}
            <ul>
            {submissionErrors.map(element => (
                <li>{element}</li>
            )
            )}
            </ul>
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

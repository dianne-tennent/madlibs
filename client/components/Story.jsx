import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
let pos = require('pos');

import { tagList, tagValidator } from '../utils/posHandlers'
import { setOriginalStoryArray, addNewWordToReplacementList, setWordList } from '../actions/index'

function Story(props) {


let tagger = new pos.Tagger();

let [ wordList, setWordList ] = useState([])
let [ error, setError ] = useState('')
let [ formData, setFormData ] = useState([])
let [ newWord, setNewWord ] = useState({})

const originalStory = 'This is some sample text. This text can contain multiple sentences.'
const originalStoryArray = originalStory.split(' ')

useEffect(() => {
    props.dispatch(setOriginalStoryArray(originalStoryArray))
}, [])

const addToWordList = (word) => {
    let newWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    console.log(newWord)
    if(wordList.find(item => item.word == newWord)) {
        setError("You've already chosen that word")
        return
    } else {
        let indexes = []
        originalStoryArray.map((item, i) => {
            if(item === newWord) {
                indexes.push(i)
            }
        })
        let wordToTag = []
        wordToTag.push(newWord)
        let posTag = tagger.tag(wordToTag)[0][1]
        console.log("part of speech", posTag)
        let valid = tagValidator(posTag)
        console.log(valid)
        if(valid !== true) {
            setError("That's a tricky one, try another word")
            return
        } else {
            let partOfSpeech = tagList.find(item => item.tag === posTag)
            setError('')
            console.log("index", indexes)
            let wordToAdd = {word: newWord, storyArrayIndexes: indexes, pos: partOfSpeech.pos}
            console.log(wordToAdd)
            setWordList([...wordList, wordToAdd])
            console.log(wordList)
        }
    }

}

function changeHandler(e, indexes) {
    let addWord = {
        word: [e.target.value],
        index: indexes
    }
    setNewWord(addWord)
}

//for a given word, it needs to replace a word in the storyArray at every array index from the initial story
//e.g. 
    const submitHandler = (e) => {
        e.preventDefault()
        props.dispatch(addNewWordToReplacementList(newWord))
    }

    const submitWords = () => {
        let newList = props.list
        return props.dispatch(setWordList(newList))
        .then(() => {
            return props.history.push('/output')
        })
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
                {wordList.map((item, i) => (
                    <li key={i}>{item.word}: {item.pos}</li>
                ))}
            </ul>
            {wordList.map(item => (
            <form onSubmit={(e) => submitHandler(e)}>
                <label htmlFor={item.pos}>{item.pos}</label>
                <input type='text' id={item.pos} name={item.pos} onChange={(e) => changeHandler(e, item.storyArrayIndexes)}/>
                <button type="submit">Submit</button>
            </form>
            ))}
            <button onClick={() => submitWords()}>Show me my MadLib!</button>
        </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
      list: state.list,
      story: state.story
    };
  }

export default connect(mapStateToProps)(Story)

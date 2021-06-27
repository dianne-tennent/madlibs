import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import classNames from "classnames";
import { wordTagger, validateWordTypes } from '../utils/posHandlers'
import { resetWordList, grabStoryFromDatabase, addNewWordToReplacementList, replaceWordsInStory, replaceWordInWordList } from '../actions/index'

function Story(props) {

    let history = useHistory()

    let { story } = useParams();
    console.log("params", story)

useEffect(() => {
    if(story === 'user_input') {
        return
    } else {
        return props.dispatch(grabStoryFromDatabase(story))
}}, [])

let [ selectedWordList, setSelectedWordList ] = useState([])
let [ error, setError ] = useState(null)
let [ submissionErrors, setSubmissionErrors ] = useState([])
let [ hide, setHide ] = useState(true)
let [ modalDisplay, setModalDisplay ] = useState('none')

const addToWordList = (word) => {
    let wordToAdd = wordTagger(word, selectedWordList, props.madlibs.story.storyArray)
    if (wordToAdd.hasOwnProperty('errorMessage')) {
        setModalDisplay('block')
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

    const submitMadLib = (e) => {
        e.preventDefault()
        let errors = validateWordTypes(props.madlibs.wordList)
        if(Array.isArray(errors)) {
            setSubmissionErrors(errors)
            setModalDisplay('block')
            props.dispatch(resetWordList())
        } else if(props.madlibs.wordList.length === 0) {
            setError(`You haven't entered any words!`)
            setModalDisplay('block')
            return
        } else {
            props.dispatch(replaceWordsInStory())
            history.push('/output')
        }
        errors = null
    }

    const hideToggle = () => {
        setHide(!hide)
    }

    return (
        <>
            <div className="header">
                <h1>{props.madlibs.story.title}</h1>
            </div>

            <div className="story-body">

                    <div className="instructions">
                        <ol>
                            <li>Choose words from the story below</li>
                            <li>Click 'hide story' - Sssssh keep it a secret!</li>
                            <li>Get a friend to type new words into the input fields below</li>
                            <li>Click 'Show me my Madlib' to see the result!</li>
                        </ol>

                    </div>
                    <div className="confirm"><button onClick={() => hideToggle()}>{hide === true ? 'Show story' : 'Hide story'}</button></div>
                <div className="story-workspace">
                    <div className="left-column">
                        <div className={classNames({
                            story_text: true,
                            hidden: hide
                        })}>
                            {props.madlibs.story.storyArray && props.madlibs.story.storyArray.map((word, i) => {
                                return <button key={i} onClick={() => addToWordList(word)}>{word}</button>
                            })}
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="input-list">
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
                        </div>
                    </div>
                </div>
                <div className="confirm"><button onClick={(e) => submitMadLib(e)}>Show me my MadLib!</button></div>

            </div>
            <div onClick={() => setModalDisplay('none')} className="errors" style={{'display': modalDisplay}}>
                    

                    <div className="error-content">
                    <span className="close">&times;</span>
                        <p>{error && error}</p>
                        <ul>
                            {submissionErrors && submissionErrors.map(element => (
                                <li>{element}</li>
                            )
                            )}
                        </ul>
                    </div>
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

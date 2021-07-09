import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import classNames from "classnames";
import { wordTagger, validateWordTypes } from '../utils/posHandlers'
import { 
    resetWordList, 
    grabStoryFromDatabase, 
    addNewWordToReplacementList, 
    replaceWordsInStory, 
    replaceWordInWordList, 
    disableButton } from '../actions/index'

function Story(props) {

    let history = useHistory()
    let { story } = useParams();

useEffect(() => {
    if(story === 'user_input') {
        return
    } else {
        return props.dispatch(grabStoryFromDatabase(story))
}}, [])

let [ selectedWordList, setSelectedWordList ] = useState([])
let [ error, setError ] = useState(null)
let [ submissionErrors, setSubmissionErrors ] = useState([])
let [ hide, setHide ] = useState(false)
let [ errorDisplay, setErrorDisplay ] = useState('none')
let [ inputDisplay, setInputDisplay ] = useState('none')

const addToWordList = (word) => {
    let wordToAdd = wordTagger(word, selectedWordList, props.madlibs.story.storyArray)
    if (wordToAdd.hasOwnProperty('errorMessage')) {
        setErrorDisplay('block')
        return setError(wordToAdd.errorMessage)
    } else {
        setSelectedWordList([...selectedWordList, wordToAdd])
        props.dispatch(disableButton(word))
        setInputDisplay('block')
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
}

    const submitMadLib = (e) => {
        e.preventDefault()
        let errors = validateWordTypes(props.madlibs.wordList)
        if(Array.isArray(errors)) {
            setSubmissionErrors(errors)
            setErrorDisplay('block')
            props.dispatch(resetWordList())
        } else if(props.madlibs.wordList.length === 0) {
            setError(`You haven't entered any words!`)
            setErrorDisplay('block')
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
                <div className="home-icon-container">
                    <img onClick={() => history.push('/')} src="/images/home.png"/>
                </div>
                <div className="heading-container">
                    <h1>{props.madlibs.story.title}</h1>
                    <img className="story-image" src={props.madlibs.story.image}/>
                </div>
            </div>

            <div className="story-body">

                    <div className="instructions">
                        <h2>How does it work?</h2>
                            <h3>Step 1</h3>
                            <p>Click to choose words from the story below.</p>
                            <h3>Step 2</h3>
                            <p>Type new words into the input fields.</p>
                            <h3>Step 3</h3>
                            <p>Click 'Show me my Madlib' to see the result!</p>

                    </div>
                    <div className="story-workspace">
                        <div className={classNames({
                            story_text: true,
                            hidden: hide
                        })}>
                            {props.madlibs.story.storyArray && props.madlibs.story.storyArray.map((element, i) => {
                                return <button disabled={element.disabled} key={i} onClick={() => addToWordList(element.word)}>{element.word}</button>
                            })}
                        </div>

                        <div className="input-list" style={{'display': inputDisplay}}>
                            <div className="input-list-content">
                                <h2>These are the parts of speech you've selected so far:</h2>
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
                                    <div className="confirm">
                                        <button onClick={() => setInputDisplay('none')}>Add more</button>
                                        <button onClick={(e) => submitMadLib(e)}>Show me my MadLib!</button>
                                    </div>
                            </div>
                        </div>
                </div>
                {/* <div className="confirm">
                    <button onClick={() => hideToggle()}>{hide === true ? 'Show story' : 'Hide story'}</button>
                    <button onClick={(e) => submitMadLib(e)}>Show me my MadLib!</button>
                </div> */}

            </div>
            <div onClick={() => setErrorDisplay('none')} className="errors" style={{'display': errorDisplay}}>
                    

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
      madlibs: state.madlibs
    };
  }

export default connect(mapStateToProps)(Story)

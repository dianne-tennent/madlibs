import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setStory } from '../actions'

function AddStory (props) {
  const [story, setOriginalStory] = useState({})

  const blurHandler = (e) => {
    const story = { ...story, [e.target.name]: e.target.value }
    setOriginalStory(story)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (story.userStory === '') {
        return
    }
    props.dispatch(
      setStory({ story_title: 'Your story', story_text: story.userStory })
    )
    props.history.push('/play/user_input')
  }
  return (
    <div className="user-story-input">
      <div className="header">
        <h1>Use your own story</h1>
        <p>Go on, get creative! Or find some text online to play with. </p>
      </div>

      <div className="user-input-area">
        <label htmlFor="userStory">Enter your story here:</label>
        <textarea
          id="userStory"
          name="userStory"
          onBlur={(e) => blurHandler(e)}
        ></textarea>
      </div>

      <div className="confirm">
        <button type="submit" onClick={(e) => submitHandler(e)}>
          Confirm
        </button>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    madlibs: state.madlibs
  }
}

export default connect(mapStateToProps)(AddStory)

import React, { useState } from 'react'
import { connect } from "react-redux";
import { setStory } from '../actions'

function AddStory(props) {

    let [ story, setOriginalStory ] = useState({})

    const blurHandler = (e) => {
        let story = {...story,
        [e.target.name]: e.target.value
        }
        setOriginalStory(story)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.dispatch(setStory(story.userStory))
        props.history.push('/play/user_input')
    }
    return (
        <div className="story-body">
                <label htmlFor='userStory'>Enter your story here:</label>
                    <textarea 
                    id="userStory"
                    name="userStory"
                    onBlur={(e) => blurHandler(e)}></textarea>
                    <button type="submit" onClick={(e) => submitHandler(e)}>Confirm</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      madlibs: state.madlibs
    };
  }

  export default connect(mapStateToProps)(AddStory)

import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { replaceWordInStory } from '../actions';

function OutPut(props) {

const [ storyOutPut, setStoryOutPut ] = useState()

    useEffect(() => {
        

    }, [])



    return (
        <div>
            <h1>Story OutPut</h1>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      list: state.list,
      story: state.story
    };
  }

export default connect(mapStateToProps)(OutPut)

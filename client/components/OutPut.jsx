import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import { resetWordList, tagNewWords } from '../actions/index'
import classNames from 'classnames'

function OutPut(props) {

  useEffect(() => {
    props.dispatch(tagNewWords())
  }, [])

  const navigate = () => {
    props.dispatch(resetWordList())
    props.history.push('/choose')
  }

    return (
      <>
            <div className="header">
              <h1>Your Madlib!</h1>
            </div>
            <div className="story-body">
              <div className="story-output">
                {props.madlibs.newStory.map((item, i) => {
                  console.log("item.word.newWord=true", item.word.newWord === true)
                  return <>
                  <span className={item.newWord == true ? 'arrow-highlight' : ''}>{item.word.word}</span><span>{item.word.punc} </span>
                </>
              })}
              </div>
            <div className="confirm"><button onClick={() => navigate()}>Play again!</button></div>
            </div>
      </>
    )
}

function mapStateToProps(state) {
    return {
      madlibs: state.madlibs
    };
  }

export default connect(mapStateToProps)(OutPut)

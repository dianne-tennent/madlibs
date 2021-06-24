import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'

function OutPut(props) {

  const navigate = () => {
    props.history.push('/choose')
  }

    return (
      <>
            <div className="header">
              <h1>Your new story</h1>
            </div>
            <div className="story-body">
              <div className="story-output">
                <p>{props.madlibs.newStory.join(" ")}</p>
              </div>
            </div>
            <button onClick={() => navigate()}>Play again!</button>
      </>
    )
}

function mapStateToProps(state) {
    return {
      madlibs: state.madlibs
    };
  }

export default connect(mapStateToProps)(OutPut)

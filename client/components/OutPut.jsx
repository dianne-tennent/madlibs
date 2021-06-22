import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";

function OutPut(props) {




    return (
        <div>
            <h1>Story OutPut</h1>
            <p>{props.madlibs.newStory.join(" ")}</p>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      madlibs: state.madlibs
    };
  }

export default connect(mapStateToProps)(OutPut)

import React, { useEffect } from 'react'
import { Link, history } from 'react-router-dom'
import { connect } from 'react-redux'

function Home (props) {


  const navigate = (path) => {
    props.history.push(path)
  }

  return (
    <>
      <h1>Play Mad Libs!</h1>
      <button onClick={() => navigate('/how')}>How?</button>
      <button onClick={() => navigate('/choose')}>Play</button>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

export default connect(mapStateToProps)(Home)

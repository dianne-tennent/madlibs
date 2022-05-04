import React from 'react'

function HowToPlay (props) {
  const navigate = (path) => {
    props.history.push(path)
  }

  return (
    <>

      <div className="home-header">
        <h1>How to play</h1>
      </div>

      <div className="story-body">
        <div className="instructions">
          <p>Choose a story to start, or you can add your own. Then, you'll be given a list of parts of speech.
          </p>
          <p>For each one, you get to choose ANY random example of that type of word that you can think of.
          </p>
        </div>
        <div className="confirm">
          <button onClick={() => navigate('/choose')}>Click here to choose a story</button>
        </div>
      </div>
    </>
  )
}

export default HowToPlay

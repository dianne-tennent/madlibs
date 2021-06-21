import React from 'react'
import { Link, history } from 'react-router-dom'

function ChooseStory(props) {
    return (
        <>
        <div>
            <h1>Choose a story</h1>
            <button onClick={() => props.history.push('/play')}>Love Letter</button>
            <button onClick={() => props.history.push('/play')}>Job Application</button>
            <button onClick={() => props.history.push('/play')}>Letter to the Editor</button>
        </div>
        </>
    )
}

export default ChooseStory

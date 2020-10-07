import React from 'react'

import '../css/Tab.css'

// import finuxImg from '../assets/finux.png'
import finuxActiveImg from '../assets/finux_active.png'
import editImg from '../assets/edit.png'
// import editActiveImg from '../assets/edit_active.png'
import termImg from '../assets/term.png'
// import termActiveImg from '../assets/term_active.png'

function Tab() {

    return (
        <div className='tab'>
            <div className='tab-pane'>
                <img src={finuxActiveImg} className='tab-img' alt='file'></img>
                <span className='tab-text-active'>File</span>
            </div>
            <div className='tab-pane'>
                <img src={editImg} className='tab-img' alt='edit'></img>
                <span className='tab-text'>Edit</span>
            </div>
            <div className='tab-pane'>
                <img src={termImg} className='tab-img' alt='terminal'></img>
                <span className='tab-text'>Terminal</span>
            </div>
        </div>
    )
}

export default Tab
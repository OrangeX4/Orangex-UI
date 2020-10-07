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
            </div>
            <div className='tab-pane'>
                <img src={editImg} className='tab-img' alt='edit'></img>
            </div>
            <div className='tab-pane'>
                <img src={termImg} className='tab-img' alt='terminal'></img>
            </div>
        </div>
    )
}

export default Tab
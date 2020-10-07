import React from 'react'

import '../css/Tab.css'

import finuxImg from '../assets/finux.png'
import finuxActiveImg from '../assets/finux_active.png'
import editImg from '../assets/edit.png'
import editActiveImg from '../assets/edit_active.png'
import termImg from '../assets/term.png'
import termActiveImg from '../assets/term_active.png'

interface Props {
    active: 'file' | 'edit' | 'terminal'
    onChange: (state: 'file' | 'edit' | 'terminal') => void
}

function Tab(props: Props) {

    return (
        <div className='tab'>
            <div onClick={() =>props.onChange('file')} className='tab-pane'>
                <img src={(props.active === 'file') ? finuxActiveImg : finuxImg} className='tab-img' alt='file'></img>
                <span className={(props.active === 'file') ? 'tab-text-active' : 'tab-text'}>File</span>
            </div>
            <div onClick={() =>props.onChange('edit')} className='tab-pane'>
                <img src={(props.active === 'edit') ? editActiveImg : editImg} className='tab-img' alt='edit'></img>
                <span className={(props.active === 'edit') ? 'tab-text-active' : 'tab-text'}>Edit</span>
            </div>
            <div onClick={() =>props.onChange('terminal')} className='tab-pane'>
                <img src={(props.active === 'terminal') ? termActiveImg : termImg} className='tab-img' alt='terminal'></img>
                <span className={(props.active === 'terminal') ? 'tab-text-active' : 'tab-text'}>Terminal</span>
            </div>
        </div>
    )
}

export default Tab
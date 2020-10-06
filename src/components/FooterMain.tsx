import React from 'react'

import '../css/Footer.css'

import terminalImg from '../assets/terminal.png'
import newfolderImg from '../assets/newfolder.png'
import newImg from '../assets/new.png'
import selectallImg from '../assets/ok.png'


interface Props {
    onTerminal: () => void
    onSelectall: () => void
}

function FooterMain(props: Props) {

    return (
        <div className='footer'>
            <div onClick={props.onTerminal} className='footer-button'>
                <img className='footer-img' src={terminalImg} alt='terminal' />
                <span className='footer-text'>Terminal</span>
            </div>
            <div className='footer-button'>
                <img className='footer-img' src={newfolderImg} alt='newfolder' />
                <span className='footer-text'>New Folder</span>
            </div>
            <div className='footer-button'>
                <img className='footer-img' src={newImg} alt='new' />
                <span className='footer-text'>New File</span>
            </div>
            <div onClick={props.onSelectall} className='footer-button'>
                <img className='footer-img' src={selectallImg} alt='selectall' />
                <span className='footer-text'>Select All</span>
            </div>
        </div>
    )
}

export default FooterMain
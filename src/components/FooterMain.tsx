import React from 'react'

import InputButton from './InputButton'

import '../css/Footer.css'

import terminalImg from '../assets/terminal.png'
import newfolderImg from '../assets/newfolder.png'
import newImg from '../assets/new.png'
import newFolderImg from '../assets/newfolder.png'
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
            <InputButton name='New Folder' icon={newFolderImg} onConfirm={() => { }} />
            <InputButton name='New File' icon={newImg} onConfirm={() => { }} />
            <div onClick={props.onSelectall} className='footer-button'>
                <img className='footer-img' src={selectallImg} alt='selectall' />
                <span className='footer-text'>Select All</span>
            </div>
        </div>
    )
}

export default FooterMain
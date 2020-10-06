import React from 'react'

import InputButton from './InputButton'

import { message } from 'antd'

import '../css/Footer.css'

import terminalImg from '../assets/terminal.png'
import newImg from '../assets/new.png'
import newFolderImg from '../assets/newfolder.png'
import selectallImg from '../assets/ok.png'


interface Props {
    onTerminal: () => void
    onSelectall: () => void
    onNewFolder: (name: string) => void
    onNewFile: (name: string) => void
}

function FooterMain(props: Props) {

    function handleNewFolder(name: string) {
        if(name === '') {
            message.warn('New name cannot be empty!')
            return
        } else {
            props.onNewFolder(name)
        }
    }
    function handleNewFile(name: string) {
        if(name === '') {
            message.warn('New name cannot be empty!')
            return
        } else {
            props.onNewFile(name)
        }
    }

    return (
        <div className='footer'>
            <div onClick={props.onTerminal} className='footer-button'>
                <img className='footer-img' src={terminalImg} alt='terminal' />
                <span className='footer-text'>Terminal</span>
            </div>
            <InputButton name='New Folder' icon={newFolderImg} onConfirm={handleNewFolder} />
            <InputButton name='New File' icon={newImg} onConfirm={handleNewFile} />
            <div onClick={props.onSelectall} className='footer-button'>
                <img className='footer-img' src={selectallImg} alt='selectall' />
                <span className='footer-text'>Select All</span>
            </div>
        </div>
    )
}

export default FooterMain
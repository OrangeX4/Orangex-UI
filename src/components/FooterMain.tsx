import React from 'react'

import '../css/Footer.css'

import copyImg from '../assets/copy.png'
import moveImg from '../assets/move.png'


interface Props {
    onCopy: () => void
    onMove: () => void
    onRename: (newName: string) => void
    currentName?: string
    onDelete: () => void
}

function FooterMain(props: Props) {

    return (
        <div className='footer'>
            <div onClick={props.onCopy} className='footer-button'>
                <img className='footer-img' src={copyImg} alt='copy' />
                <span className='footer-text'>Copy</span>
            </div>
            <div onClick={props.onMove} className='footer-button'>
                <img className='footer-img' src={moveImg} alt='move' />
                <span className='footer-text'>Move</span>
            </div>
        </div>
    )
}

export default FooterMain
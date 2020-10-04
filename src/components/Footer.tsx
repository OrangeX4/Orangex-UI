import React from 'react'

import '../css/Footer.css'

import copyImg from '../assets/copy.png'
import moveImg from '../assets/move.png'
import renameImg from '../assets/rename.png'
import deleteImg from '../assets/delete.png'

function Footer() {

    return (
        <div className='footer'>
            <div className='footer-button'>
                <img className='footer-img' src={copyImg} alt='copy' />
                <span className='footer-text'>Copy</span>
            </div>
            <div className='footer-button'>
                <img className='footer-img' src={moveImg} alt='move' />
                <span className='footer-text'>Move</span>
            </div>
            <div className='footer-button'>
                <img className='footer-img' src={renameImg} alt='rename' />
                <span className='footer-text'>Rename</span>
            </div>
            <div className='footer-button'>
                <img className='footer-img' src={deleteImg} alt='delete' />
                <span className='footer-text'>Delete</span>
            </div>
        </div>
    )
}

export default Footer
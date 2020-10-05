import React from 'react'

import DeleteButton from './DeleteButton'

import '../css/Footer.css'

import copyImg from '../assets/copy.png'
import moveImg from '../assets/move.png'
import cancleImg from '../assets/cancle.png'


interface Props {
    onCopy: () => void
    onMove: () => void
    onUnselect: () => void
    onDelete: () => void
}

function FooterSelected(props: Props) {

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
            <div onClick={props.onUnselect} className='footer-button'>
                <img className='footer-img' src={cancleImg} alt='unselect' />
                <span className='footer-text'>Unselect</span>
            </div>
            <DeleteButton onDelete={props.onDelete} />
        </div>
    )
}

export default FooterSelected
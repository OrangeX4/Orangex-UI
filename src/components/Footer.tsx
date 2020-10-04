import React from 'react'

import { Drawer, Button, Row, Col } from 'antd'

import DeleteButton from './DeleteButton'

import '../css/Footer.css'

import copyImg from '../assets/copy.png'
import moveImg from '../assets/move.png'
import renameImg from '../assets/rename.png'

interface Props {
    onDelete: () => void
}

function Footer(props: Props) {

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

            {/* Rename Button */}
            <div className='footer-button'>
                <img className='footer-img' src={renameImg} alt='rename' />
                <span className='footer-text'>Rename</span>
            </div>

            <DeleteButton onDelete={props.onDelete} />

        </div>
    )
}

export default Footer
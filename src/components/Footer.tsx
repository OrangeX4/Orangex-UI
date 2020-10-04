import React from 'react'

import DeleteButton from './DeleteButton'
import RenameButton from './RenameButton'

import '../css/Footer.css'

import copyImg from '../assets/copy.png'
import moveImg from '../assets/move.png'


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

            <RenameButton onRename={(newName)=>{alert(newName)}} />
            <DeleteButton onDelete={props.onDelete} />

        </div>
    )
}

export default Footer
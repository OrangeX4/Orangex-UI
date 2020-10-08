import React, { useState } from 'react'

import ConfirmDrawer from './ConfirmDrawer'

import '../css/Footer.css'

import deleteImg from '../assets/delete.png'

interface Props {
    onDelete: () => void
}

function DeleteButton(props: Props) {

    const [isDisplay, setIsDisplay] = useState(false)
    function handleDelete(){
        setIsDisplay(false)
        props.onDelete()
    }

    return (
        <div className='footer-button'>
            <div onClick={() => setIsDisplay(true)}>
                <img className='footer-img' src={deleteImg} alt='delete' />
                <span className='footer-text'>Delete</span>
            </div>
            <ConfirmDrawer isDisplay={isDisplay} onConfirm={handleDelete} onClose={() => setIsDisplay(false)}>Are you sure to delete the item?</ConfirmDrawer>
        </div>
    )
}

export default DeleteButton
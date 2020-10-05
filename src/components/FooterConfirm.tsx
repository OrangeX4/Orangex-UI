import React from 'react'

import '../css/Footer.css'

import okImg from '../assets/ok.png'
import cancleImg from '../assets/cancle.png'

interface Props {
    onCancle: () => void
    onOk: () => void
}

function FooterConfirm(props: Props) {

    return (
        <div onClick={props.onCancle} className='footer'>
            <div className='footer-button'>
                <img className='footer-img' src={cancleImg} alt='cancle' />
                <span className='footer-text'>Cancle</span>
            </div>
            <div onClick={props.onOk} className='footer-button'>
                <img className='footer-img' src={okImg} alt='ok' />
                <span className='footer-text'>Ok</span>
            </div>
        </div>
    )
}

export default FooterConfirm
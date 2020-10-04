import React from 'react'

import '../css/Footer.css'

import okImg from '../assets/ok.png'
import cancleImg from '../assets/cancle.png'


function FooterActive() {

    return (
        <div className='footer'>
            <div className='footer-button'>
                <img className='footer-img' src={cancleImg} alt='cancle' />
                <span className='footer-text'>Cancle</span>
            </div>
            <div className='footer-button'>
                <img className='footer-img' src={okImg} alt='ok' />
                <span className='footer-text'>Ok</span>
            </div>
        </div>
    )
}

export default FooterActive
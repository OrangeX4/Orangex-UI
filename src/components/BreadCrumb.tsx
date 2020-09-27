import React from 'react'
import copy from 'copy-to-clipboard';

import '../css/BreadCrumb.css'

interface Props {
    text: string;
}

function Breadcrumb(props: Props) {

    return (
        <p className='breadcrumb' onClick={() => { copy(props.text) ? alert('Copy success') : alert('Copy fail') }}>{props.text.replace(/\//g, ' / ')}</p>
    )
}

export default Breadcrumb
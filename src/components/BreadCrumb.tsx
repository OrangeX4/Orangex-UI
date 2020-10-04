import React from 'react'
import copy from 'copy-to-clipboard'
import { message } from 'antd'

import '../css/BreadCrumb.css'

interface Props {
    text: string;
}

function Breadcrumb(props: Props) {

    return (
        <p className='breadcrumb' onClick={() => { copy(props.text) ? message.success('Copy success') : message.success('Copy fail') }}>{props.text.replace(/\//g, ' / ')}</p>
    )
}

export default Breadcrumb
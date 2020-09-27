import React from 'react'

import '../css/BreadCrumb.css'

interface Props {
    text: string;
}

function Breadcrumb(props: Props) {

    return (
        <p className='breadcrumb'>{props.text.replace(/\//g, ' / ')}</p>
    )
}

export default Breadcrumb
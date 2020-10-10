import React from 'react'

interface Props {
    title: string
    content: string
}

function TerminalItem(props: Props) {

    return (
        <div className='terminal-item'>
            <div className='terminal-text'>
                <div className='terminal-text-title'>{props.title}</div>
                <div className='terminal-text-content'>{props.content}</div>
            </div>
            <div className='terminal-buttoncontainer'>
                <a className='terminal-button' href='/#'>Run</a>
            </div>
        </div>
    )
}

export default TerminalItem
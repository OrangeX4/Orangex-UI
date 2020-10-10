import React from 'react'

import { Divider } from 'antd'

import TerminalItem from './TerminalItem'

import '../css/Terminal.css'

interface Props {
    onRun: (title: string, type: string) => void
    onDelete: (title: string, type: string) => void
}

function Terminal(props: Props) {

    return (
        <div className='terminal'>
            <div className='terminal-out'>Out:</div>

            <Divider>File</Divider>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'current-file')} onRun={(title) => props.onRun(title, 'current-file')} onClick={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'default-file')} onRun={(title) => props.onRun(title, 'current-file')} onClick={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>

            <Divider>Current</Divider>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'current')} onRun={(title) => props.onRun(title, 'current')} onClick={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'current')} onRun={(title) => props.onRun(title, 'current')} onClick={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>

            <Divider>Default</Divider>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'default')} onRun={(title) => props.onRun(title, 'default')} onClick={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'default')} onRun={(title) => props.onRun(title, 'default')} onClick={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>

        </div>
    )
}

export default Terminal
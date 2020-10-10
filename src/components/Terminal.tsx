import React from 'react'

import { Divider } from 'antd'

import TerminalItem from './TerminalItem'

import '../css/Terminal.css'

interface Item {
    title: string
    content: string
}

interface DefaultJson {
    default: Item[]
    defaultFile: {
        [suffixName: string]: Item[]
    }
}

interface currentJson {
    current: Item[]
    currentFile: {
        [suffixName: string]: Item[]
    }
}

interface Props {
    defaultJson: DefaultJson
    currentJson: currentJson
    onRun: (title: string, type: 'default'|'current'|'default-file'|'current-file') => void
    onDelete: (title: string, type: 'default'|'current'|'default-file'|'current-file') => void
    onChange: (oldTitle: string, newTitle: string, newContent: string, type: 'default'|'current'|'default-file'|'current-file') => void 
}

function Terminal(props: Props) {

    return (
        <div className='terminal'>
            <div className='terminal-out'>Out:</div>

            <Divider>File</Divider>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'current-file')} onRun={(title) => props.onRun(title, 'current-file')} onChange={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'default-file')} onRun={(title) => props.onRun(title, 'current-file')} onChange={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>

            <Divider>Current</Divider>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'current')} onRun={(title) => props.onRun(title, 'current')} onChange={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'current')} onRun={(title) => props.onRun(title, 'current')} onChange={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>

            <Divider>Default</Divider>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'default')} onRun={(title) => props.onRun(title, 'default')} onChange={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>
            <TerminalItem onDelete={(title) => props.onDelete(title, 'default')} onRun={(title) => props.onRun(title, 'default')} onChange={(title) => alert('click ' + title)} title='Title' content='content'></TerminalItem>
        </div>
    )
}

export default Terminal
import React from 'react'

import { Divider } from 'antd'

import TerminalItem from './TerminalItem'

import { getSuffix } from '../utils/utils'

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
    fileName: string
    defaultJson: DefaultJson
    currentJson: currentJson
    onRun: (title: string, type: 'default' | 'current' | 'default-file' | 'current-file') => void
    onDelete: (title: string, type: 'default' | 'current' | 'default-file' | 'current-file') => void
    onChange: (oldTitle: string, newTitle: string, newContent: string, type: 'default' | 'current' | 'default-file' | 'current-file') => void
    onAdd: (title: string, content: string, type: 'default' | 'current' | 'default-file' | 'current-file') => void
}

function Terminal(props: Props) {

    function getFileView() {
        const NodeList = [] as JSX.Element[]
        const currentFile = props.currentJson.currentFile
        const defaultFile = props.defaultJson.defaultFile
        for (const key in currentFile) {
            if (key === props.fileName) {
                currentFile[key].forEach((value) => {
                    NodeList.push(<TerminalItem
                        onDelete={(title) => props.onDelete(title, 'current-file')}
                        onRun={(title) => props.onRun(title, 'current-file')}
                        onChange={(oldTitle, newTitle, newContent) => props.onChange(oldTitle, newTitle, newContent, 'current-file')}
                        title={value.title}
                        content={value.content}
                    ></TerminalItem>)
                })
            }
        }
        for (const key in defaultFile) {
            if (key === getSuffix(props.fileName)) {
                defaultFile[key].forEach((value) => {
                    NodeList.push(<TerminalItem
                        onDelete={(title) => props.onDelete(title, 'default-file')}
                        onRun={(title) => props.onRun(title, 'default-file')}
                        onChange={(oldTitle, newTitle, newContent) => props.onChange(oldTitle, newTitle, newContent, 'default-file')}
                        title={value.title}
                        content={value.content}
                    ></TerminalItem>)
                })
            }
        }
        return NodeList
    }

    return (
        <div className='terminal'>
            <div className='terminal-out'>Out:</div>

            <Divider>File</Divider>
            {getFileView()}
            <Divider>Current</Divider>
            {props.currentJson.current.map((value) => {
                return (<TerminalItem
                    onDelete={(title) => props.onDelete(title, 'current')}
                    onRun={(title) => props.onRun(title, 'current')}
                    onChange={(oldTitle, newTitle, newContent) => props.onChange(oldTitle, newTitle, newContent, 'current')}
                    title={value.title}
                    content={value.content}
                ></TerminalItem>)
            })}
            <Divider>Default</Divider>
            {props.defaultJson.default.map((value) => {
                return (<TerminalItem
                    onDelete={(title) => props.onDelete(title, 'default')}
                    onRun={(title) => props.onRun(title, 'default')}
                    onChange={(oldTitle, newTitle, newContent) => props.onChange(oldTitle, newTitle, newContent, 'default')}
                    title={value.title}
                    content={value.content}
                ></TerminalItem>)
            })}
        </div>
    )
}

export default Terminal
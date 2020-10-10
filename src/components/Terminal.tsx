import React from 'react'

import { Divider } from 'antd'

import TerminalItem from './TerminalItem'

import { getSuffix } from '../utils/utils'

import addItemImg from '../assets/additem.png'

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
    current: string
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
                        current={props.current}
                        fileName={props.fileName}
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
                        current={props.current}
                        fileName={props.fileName}
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
            <div className='terminal-item terminal-item-double'>
                <div className='terminal-imgbox-double'>
                    <img className='terminal-img' src={addItemImg} />
                    <div className='terminal-img-text'>Add to current</div>
                </div>
                <div className='terminal-imgbox-double terminal-imgbox-double-line'>
                    <img className='terminal-img' src={addItemImg} />
                    <div className='terminal-img-text'>Add to default</div>
                </div>
            </div>
            <Divider>Current</Divider>
            {props.currentJson.current.map((value) => {
                return (<TerminalItem
                    current={props.current}
                    fileName={props.fileName}
                    onDelete={(title) => props.onDelete(title, 'current')}
                    onRun={(title) => props.onRun(title, 'current')}
                    onChange={(oldTitle, newTitle, newContent) => props.onChange(oldTitle, newTitle, newContent, 'current')}
                    title={value.title}
                    content={value.content}
                    ></TerminalItem>)
                })}
            <div className='terminal-item'>
                <div className='terminal-imgbox'>
                    <img className='terminal-img' src={addItemImg} />
                    <div className='terminal-img-text'>Add</div>
                </div>
            </div>
            <Divider>Default</Divider>
            {props.defaultJson.default.map((value) => {
                return (<TerminalItem
                    current={props.current}
                    fileName={props.fileName}
                    onDelete={(title) => props.onDelete(title, 'default')}
                    onRun={(title) => props.onRun(title, 'default')}
                    onChange={(oldTitle, newTitle, newContent) => props.onChange(oldTitle, newTitle, newContent, 'default')}
                    title={value.title}
                    content={value.content}
                    ></TerminalItem>)
                })}
            <div className='terminal-item'>
                <div className='terminal-imgbox'>
                    <img className='terminal-img' src={addItemImg} />
                    <div className='terminal-img-text'>Add</div>
                </div>
            </div>
        </div>
    )
}

export default Terminal
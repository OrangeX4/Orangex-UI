import React, { useState, useEffect } from 'react'

import ItemList from './components/ItemList'
import Breadcrumb from './components/BreadCrumb'
import Footer from './components/Footer'
import Tab from './components/Tab'
import Terminal from './components/Terminal'

import { message } from 'antd'
import copy from 'copy-to-clipboard'

import { Controlled as CodeMirror } from 'react-codemirror2'
import './utils/codemirror'

import './css/App.css'
import './css/Editor.css'

import exampleJson from './json/example.json'
import keyboardJson from './json/keyboard.json'
import commandJson from './json/command.json'

import { setUrl, getMIME, get, post } from './utils/utils'


function App() {

    // Main path data stream
    const [state, setState] = useState(exampleJson)

    // setUrl('http://127.0.0.1:1984/')
    setUrl('http://192.168.137.1:1984/')

    function forward(dirname: string) {
        get(`dir?name=${dirname}`, (res) => {
            if (res.isExist) {
                setState(res)
                setSelectedDirs({})
                setSelectedFiles({})
            }
        })
    }

    // Init current folder
    // eslint-disable-next-line
    useEffect(() => { forward('.') }, [])


    // selected dirs and selected files
    interface SelectedItems {
        [ItemName: string]: boolean
    }
    const [selectedDirs, setSelectedDirs] = useState({} as SelectedItems)
    const [selectedFiles, setSelectedFiles] = useState({} as SelectedItems)

    function handleUnselect() {
        setSelectedDirs({})
        setSelectedFiles({})
    }
    function handleSelectall() {
        const newSelectedDirs = {} as SelectedItems
        state.dirs.forEach((dir) => {
            newSelectedDirs[dir.name] = true
        })
        setSelectedDirs(newSelectedDirs)

        const newSelectedFiles = {} as SelectedItems
        state.files.forEach((file) => {
            newSelectedFiles[file.name] = true
        })
        setSelectedFiles(newSelectedFiles)
    }

    // new file
    function handleNewFile(filename: string) {
        get(`newfile?name=${state.current}/${filename}`, (res) => {
            forward(state.current)
            if (res.success) message.success('Success to create new file.')
            else message.warn('Fail to create new file.')
        })
    }
    // new folder
    function handleNewFolder(foldername: string) {
        get(`newdir?name=${state.current}/${foldername}`, (res) => {
            forward(state.current)
            if (res.success) message.success('Success to create new folder.')
            else message.warn('Fail to create new folder.')
        })
    }
    // rename file
    function handleRename(oldName: string, newName: string) {
        get(`rename?oldname=${state.current}/${oldName}&newname=${state.current}/${newName}`, (res) => {
            forward(state.current)
            if (res.success) message.success('Success to rename.')
            else message.warn('Fail to rename.')
        })
    }
    // delete file
    function handleDelete(dirs: string[], files: string[]) {
        post('delete', JSON.stringify({ current: state.current, dirs: dirs, files: files }), (res) => {
            forward(state.current)
            if (res.success) message.success('Success to delete.')
            else message.warn('Fail to delete.')
        })
    }
    // copy
    function handleCopy(oldDir: string, dirs: string[], files: string[]) {
        if (state.current === oldDir) {
            message.warn('New directory be supposed to be different from the old directory.')
            return
        } else {
            post('copy', JSON.stringify({ oldDir: oldDir, newDir: state.current, dirs: dirs, files: files }), (res) => {
                forward(state.current)
                if (res.success) message.success('Success to copy.')
                else message.warn('Fail to copy.')
            })
        }
    }
    // move
    function handleMove(oldDir: string, dirs: string[], files: string[]) {
        if (state.current === oldDir) {
            message.warn('New directory be supposed to be different from the old directory.')
            return
        } else {
            post('move', JSON.stringify({ oldDir: oldDir, newDir: state.current, dirs: dirs, files: files }), (res) => {
                forward(state.current)
                if (res.success) message.success('Success to move.')
                else message.warn('Fail to move.')
            })
        }
    }

    // Tab
    const [currentTab, setCurrentTab] = useState('file' as 'file' | 'edit' | 'terminal')

    // curren file
    const [currentFile, setCurrentFile] = useState('title.cpp')
    const [content, setContent] = useState('')
    const [cmEditor, setCmEditor] = useState(null as any)

    function openFile(name: string) {
        setCurrentFile(name)
        post('read', JSON.stringify({
            path: `${state.current}/${name}`
        }), (res) => {
            if (res.success) {
                setContent(res.data)
            } else message.warn('Fail to open file')
        })
        setCurrentTab('edit')
    }

    function handleSaveFile() {
        post('write', JSON.stringify({
            path: `${state.current}/${currentFile}`,
            data: content
        }), (res) => {
            if (res.success) message.success('Success to save the file.')
            else message.warn('Fail to open the file.')
            forward(state.current)
        })
    }

    function handlePaste() {
        cmEditor.focus()
        get('clipboard', (res) => {
            cmEditor.focus()
            cmEditor.replaceSelection(res.data)
        })
    }

    function handleSelection(editor: any) {
        if (editor.getSelection() !== '') {
            if (copy(editor.getSelection())) message.success('Success to copy.')
            else message.warn('Fail to copy.')
        }
    }

    // Terminal
    const [currentJson, setCurrentJson] = useState(commandJson)
    const [defaultJson, setDefaultJson] = useState(commandJson)

    function getView() {
        switch (currentTab) {
            case 'file':
                return (
                    <div className='app'>
                        <Breadcrumb text={state.current} />
                        <ItemList setSelectedFiles={setSelectedFiles} setSelectedDirs={setSelectedDirs} selectedFiles={selectedFiles} selectedDirs={selectedDirs} state={state} forward={forward} openFile={openFile} />
                        <Footer
                            onDelete={handleDelete}
                            onRename={handleRename}
                            onTerminal={() => alert('terminal')}
                            onSelectall={handleSelectall}
                            onUnselect={handleUnselect}
                            onNewFolder={handleNewFolder}
                            onNewFile={handleNewFile}
                            current={state.current}
                            onCopy={handleCopy}
                            onMove={handleMove}
                            selectedDirs={selectedDirs}
                            selectedFiles={selectedFiles}
                        />
                    </div>
                )

            case 'edit':
                return (
                    <div className='orangex-edit-main'>
                        <div className='orangex-edit-title'>
                            <span>{currentFile}</span>
                            <a onClick={handleSaveFile} className='orangex-edit-title-button' href='/#'>Save</a>
                            <a onClick={() => { cmEditor.focus(); cmEditor.redo() }} className='orangex-edit-title-button' href='/#'>Redo</a>
                            <a onClick={() => { cmEditor.focus(); cmEditor.undo() }} className='orangex-edit-title-button' href='/#'>Undo</a>
                        </div>
                        <div className='orangex-edit-codemirror'>
                            <CodeMirror
                                value={content}
                                options={{
                                    mode: getMIME(currentFile),
                                    theme: 'material',
                                    lineNumbers: true,
                                    lineWrapping: false,
                                    matchBrackets: true,
                                    indentUnit: 4
                                }}
                                onSelection={handleSelection}
                                editorDidMount={(editor) => setCmEditor(editor)}
                                onBeforeChange={(editor, data, value) => {
                                    setContent(value)
                                }}
                                onChange={(editor, data, value) => {

                                }}
                            />
                        </div>
                        <div className='orangex-edit-keyboard-root'>
                            {(() => {
                                const keyList = []
                                for (const key in keyboardJson.data) {
                                    keyList.push(<span onClick={() => { cmEditor.focus(); cmEditor.replaceSelection((keyboardJson.data as any)[key]) }} className='orangex-edit-keyboard-item'>{key}</span>)
                                }
                                return keyList
                            })()}
                            <span onClick={() => { cmEditor.focus(); cmEditor.replaceSelection('\t') }} className='orangex-edit-keyboard-item orangex-edit-keyboard-item-text'>tab</span>
                            <span onClick={handlePaste} className='orangex-edit-keyboard-item orangex-edit-keyboard-item-text'>paste</span>
                        </div>
                    </div>
                )

            case 'terminal':
                return (
                    <div className='app'>
                        <Terminal
                            current={state.current}
                            fileName={currentFile}
                            onChange={() => { message.info('change') }}
                            onRun={(title, type) => { message.info(`Run ${title} of ${type}`) }}
                            onDelete={(title, type) => { message.info(`Delete ${title} of ${type}`) }}
                            onAdd={(title, content, type) => { message.info(`Add ${title} of ${type}`) }}
                            defaultJson={defaultJson}
                            currentJson={currentJson}
                        />
                    </div>
                )

            default:
                return (
                    <div className='app'>404 Not Founded</div>
                )
        }
    }

    // Render
    return (
        <div id='main'>
            { getView()}
            <Tab active={currentTab} onChange={(tab) => setCurrentTab(tab)} />
        </div>
    )
}

export default App

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

import { setUrl, getSuffix, getMIME, get, post, replace } from './utils/utils'


function App() {

    // Main path data stream
    const [state, setState] = useState(exampleJson)

    setUrl('http://127.0.0.1:1984/')
    // setUrl('http://192.168.137.1:1984/')

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
    interface CurrentJson {
        current: Item[]
        currentFile: {
            [suffixName: string]: Item[]
        }
    }
    const [currentJson, setCurrentJson] = useState(commandJson as CurrentJson)
    const [defaultJson, setDefaultJson] = useState(commandJson as DefaultJson)

    useEffect(() => {
        get(`config?current=${state.current}`, (res) => {
            if (res.success) {
                setCurrentJson(res.current)
                setDefaultJson(res.default)
            } else message.warn('Fail to load config!')

        })
    }, [state])

    function saveDefaultConfig() {
        post('saveDefaultConfig', JSON.stringify({
            data: JSON.stringify(defaultJson)
        }), (res) => {
            forward(state.current)
            if (res.success) {
                message.success('Success to add config.')
            } else message.warn('Fail to add config.')
        })
    }

    function saveCurrentConfig() {
        post('saveCurrentConfig', JSON.stringify({
            current: state.current,
            data: JSON.stringify(currentJson)
        }), (res) => {
            forward(state.current)
            if (res.success) {
                message.success('Success to add config.')
            } else message.warn('Fail to add config.')
        })
    }

    function handleTerminalAdd(title: string, content: string, type: 'default' | 'current' | 'default-file' | 'current-file') {
        if (title === '') {
            message.warn('Title should not be empty!')
            return
        }
        switch (type) {
            case 'default':
                const defaultList: Item[] = []
                defaultJson.default.forEach((value) => { if (value.title === title) defaultList.push(value) })
                if (defaultList.length > 0) {
                    defaultList[0].title = title
                    defaultList[0].content = content
                }
                else defaultJson.default.push({ title: title, content: content })
                saveDefaultConfig()
                break
            case 'current':
                const currentList: Item[] = []
                currentJson.current.forEach((value) => { if (value.title === title) currentList.push(value) })
                if (currentList.length > 0) {
                    currentList[0].title = title
                    currentList[0].content = content
                }
                else currentJson.current.push({ title: title, content: content })
                saveCurrentConfig()
                break
            case 'default-file':
                const defaultFileList: Item[] = []
                let defaultFiles = defaultJson.defaultFile[getSuffix(currentFile)]
                if (defaultFiles === undefined || defaultFiles === undefined) {
                    defaultJson.defaultFile[getSuffix(currentFile)] = []
                    defaultFiles = defaultJson.defaultFile[getSuffix(currentFile)]
                }
                defaultFiles.forEach((value) => { if (value.title === title) defaultFileList.push(value) })
                if (defaultFileList.length > 0) {
                    defaultFileList[0].title = title
                    defaultFileList[0].content = content
                }
                else defaultFiles.push({ title: title, content: content })
                saveDefaultConfig()
                break
            case 'current-file':
                const currentFileList: Item[] = []
                let currentFiles = currentJson.currentFile[getSuffix(currentFile)]
                if (currentFiles === undefined || currentFiles === undefined) {
                    currentJson.currentFile[getSuffix(currentFile)] = []
                    currentFiles = currentJson.currentFile[getSuffix(currentFile)]
                }
                currentFiles.forEach((value) => { if (value.title === title) currentFileList.push(value) })
                if (currentFileList.length > 0) {
                    currentFileList[0].title = title
                    currentFileList[0].content = content
                }
                else currentFiles.push({ title: title, content: content })
                saveCurrentConfig()
                break
        }
    }

    function handleTerminalDelete(title: string, type: 'default' | 'current' | 'default-file' | 'current-file') {
        if (title === '') {
            message.warn('Title should not be empty!')
            return
        }
        switch (type) {
            case 'default':
                const defaultList: Item[] = []
                defaultJson.default.forEach((value) => { if (value.title !== title) defaultList.push(value) })
                defaultJson.default = defaultList
                saveDefaultConfig()
                break
            case 'current':
                const currentList: Item[] = []
                currentJson.current.forEach((value) => { if (value.title !== title) currentList.push(value) })
                currentJson.current = currentList
                saveCurrentConfig()
                break
            case 'default-file':
                const defaultFileList: Item[] = []
                defaultJson.defaultFile[getSuffix(currentFile)].forEach((value) => { if (value.title !== title) defaultFileList.push(value) })
                defaultJson.defaultFile[getSuffix(currentFile)] = defaultFileList
                saveDefaultConfig()
                break
            case 'current-file':
                const currentFileList: Item[] = []
                currentJson.currentFile[getSuffix(currentFile)].forEach((value) => { if (value.title !== title) currentFileList.push(value) })
                currentJson.currentFile[getSuffix(currentFile)] = currentFileList
                saveCurrentConfig()
                break
        }
    }

    function handleTerminalChange(oldTitle: string, newTitle: string, newContent: string, type: "default" | "current" | "default-file" | "current-file") {
        if (newTitle === '') {
            message.warn('Title should not be empty!')
            return
        }
        switch (type) {
            case 'default':
                const defaultList: Item[] = []
                defaultJson.default.forEach((value) => { if (value.title === oldTitle) defaultList.push(value) })
                if (defaultList.length > 0) {
                    defaultList[0].title = newTitle
                    defaultList[0].content = newContent
                } else message.warn("Can't find the item.")
                saveDefaultConfig()
                break
            case 'current':
                const currentList: Item[] = []
                currentJson.current.forEach((value) => { if (value.title === oldTitle) currentList.push(value) })
                if (currentList.length > 0) {
                    currentList[0].title = newTitle
                    currentList[0].content = newContent
                }
                else message.warn("Can't find the item.")
                saveCurrentConfig()
                break
            case 'default-file':
                const defaultFileList: Item[] = []
                let defaultFiles = defaultJson.defaultFile[getSuffix(currentFile)]
                if (defaultFiles === undefined || defaultFiles === undefined) {
                    defaultJson.defaultFile[getSuffix(currentFile)] = []
                    defaultFiles = defaultJson.defaultFile[getSuffix(currentFile)]
                }
                defaultFiles.forEach((value) => { if (value.title === oldTitle) defaultFileList.push(value) })
                if (defaultFileList.length > 0) {
                    defaultFileList[0].title = newTitle
                    defaultFileList[0].content = newContent
                }
                else message.warn("Can't find the item.")
                saveDefaultConfig()
                break
            case 'current-file':
                const currentFileList: Item[] = []
                let currentFiles = currentJson.currentFile[getSuffix(currentFile)]
                if (currentFiles === undefined || currentFiles === undefined) {
                    currentJson.currentFile[getSuffix(currentFile)] = []
                    currentFiles = currentJson.currentFile[getSuffix(currentFile)]
                }
                currentFiles.forEach((value) => { if (value.title === oldTitle) currentFileList.push(value) })
                if (currentFileList.length > 0) {
                    currentFileList[0].title = newTitle
                    currentFileList[0].content = newContent
                }
                else message.warn("Can't find the item.")
                saveCurrentConfig()
                break
        }
    }

    const [outContent, setOutContent] = useState('Out:')

    function handleTerminalRun(title: string, content: string) {
        post('run', JSON.stringify({
            data: replace(content, state.current, currentFile)
        }), (res) => {
            if (res.success) {
                setOutContent('Run:\n' + replace(content, state.current, currentFile) + '\n\nOut:\n' + res.out)
            } else {
                setOutContent('Run:\n' + replace(content, state.current, currentFile) + '\n\nError:\n' + JSON.stringify(res.err))
            }
        })
    }

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
                            <a onClick={() => { cmEditor.focus(); copy(content); message.success('Success to copy all content')}} className='orangex-edit-title-button' href='/#'>Copy</a>
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
                            out={outContent}
                            onChange={handleTerminalChange}
                            onRun={handleTerminalRun}
                            onDelete={handleTerminalDelete}
                            onAdd={handleTerminalAdd}
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

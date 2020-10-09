import React, { useState, useEffect } from 'react'

import Item from './components/Item'
import Breadcrumb from './components/BreadCrumb'
import Footer from './components/Footer'
import Tab from './components/Tab'
import ConfirmDrawer from './components/ConfirmDrawer'

import { message } from 'antd'

import { Controlled as CodeMirror } from 'react-codemirror2'
import './utils/codemirror'

import './css/App.css'

import folderImg from './assets/folder.png'
import fileImg from './assets/file.png'
import fileDocImg from './assets/file_doc.png'
import fileImageImg from './assets/file_image.png'
import fileVideoImg from './assets/file_video.png'

import exampleJson from './json/example.json'
import suffixJson from './json/suffix.json'

import {setUrl, get, post} from './utils/utils'


function App() {

    // Main data stream
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


    // Current selected items
    interface SelectedItems {
        [ItemName: string]: boolean
    }

    const [selectedDirs, setSelectedDirs] = useState({} as SelectedItems)
    const [selectedFiles, setSelectedFiles] = useState({} as SelectedItems)

    function handleSelectedDirChange(dirName: string) {
        const newSelectedDirs = JSON.parse(JSON.stringify(selectedDirs))
        newSelectedDirs[dirName] = newSelectedDirs[dirName] ? false : true
        setSelectedDirs(newSelectedDirs)
    }

    function handleSelectedFileChange(fileName: string) {
        const newSelectedFiles = JSON.parse(JSON.stringify(selectedFiles))
        newSelectedFiles[fileName] = newSelectedFiles[fileName] ? false : true
        setSelectedFiles(newSelectedFiles)
    }


    // Handle event
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

    // file type
    function getFileType(name: string) {

        let type = 'file' as 'file' | 'document' | 'video' | 'image'
        if (name.lastIndexOf('.') === -1) {
            return type
        }
        const suffix = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
        suffixJson.document.forEach((value) => {
            if (suffix === value) type = 'document'
        })
        suffixJson.image.forEach((value) => {
            if (suffix === value) type = 'image'
        })
        suffixJson.video.forEach((value) => {
            if (suffix === value) type = 'video'
        })
        return type
    }
    function getFileIcon(name: string) {

        switch (getFileType(name)) {
            case 'document':
                return fileDocImg
            case 'image':
                return fileImageImg
            case 'video':
                return fileVideoImg
            default:
                return fileImg
        }
    }

    // Tab
    const [currentTab, setCurrentTab] = useState('file' as 'file' | 'edit' | 'terminal')

    // curren file
    const [currentFile, setCurrentFile] = useState('Title')
    const [content, setContent] = useState('')

    const [isDrawerDisplay, setIsDrawerDisplay] = useState(false)
    const [savedFileName, setSavedFileName] = useState('')

    function handleFileClick(name: string) {
        switch (getFileType(name)) {
            case 'document':
                setCurrentFile(name)
                post('read', JSON.stringify({
                    path: `${state.current}/${name}`
                }), (res) => {
                    if (res.success) {
                        setContent(res.data)
                    } else message.warn('Fail to open file')
                })
                setCurrentTab('edit')
                break
            case 'file':
                setSavedFileName(name)
                setIsDrawerDisplay(true)
                break
            default:
        }

    }
    function handleDrawerConfirm(name: string) {
        setCurrentFile(name)
        post('read', JSON.stringify({
            path: `${state.current}/${name}`
        }), (res) => {
            if (res.success) {
                setContent(res.data)
            } else message.warn('Fail to open file')
        })
        setCurrentTab('edit')
        setIsDrawerDisplay(false)
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
    interface SuffixJson {
        mime: {
            [name: string]: string
        }
        document: string[]
        image: string[]
        video: string[]
    }
    function getMIME(name: string) {
        const suffix = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
        return (suffixJson as SuffixJson).mime[suffix]
    }

    function getView() {
        switch (currentTab) {
            case 'file':
                return (
                    <div className='app'>
                        <Breadcrumb text={state.current} />
                        <div className='main'>
                            <Item onClick={() => { forward(state.current + '/..') }} name='..' description='Return to parent folder' icon={folderImg} />
                            <Item onClick={() => { forward(state.current + '/.') }} name='.' description='Refresh current folder' icon={folderImg} />
                            {state.dirs.map((dir) => <Item
                                onLongPress={() => handleSelectedDirChange(dir.name)}
                                isSelect={selectedDirs[dir.name]}
                                onClick={() => { forward(state.current + '/' + dir.name) }}
                                name={dir.name}
                                description={dir.items + ' Items'}
                                icon={folderImg} key={dir.name}
                            />)}
                            {state.files.map((file) => <Item
                                onClick={() => handleFileClick(file.name)}
                                onLongPress={() => handleSelectedFileChange(file.name)}
                                isSelect={selectedFiles[file.name]}
                                name={file.name}
                                description={file.showSize + ' | ' + file.lastTime}
                                icon={getFileIcon(file.name)} key={file.name}
                            />)}
                            <ConfirmDrawer isDisplay={isDrawerDisplay} onConfirm={() => handleDrawerConfirm(savedFileName)} onCancle={() => setIsDrawerDisplay(false)}>Are you sure to edit the file?</ConfirmDrawer>
                        </div>
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
                    <div className='finux-edit-main'>
                        <div onClick={handleSaveFile} className='finux-edit-title'>{currentFile}</div>
                        <div className='finux-edit-codemirror'>
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
                                onBeforeChange={(editor, data, value) => {
                                    setContent(value)
                                }}
                                onChange={(editor, data, value) => {

                                }}
                            />
                        </div>
                    </div>
                )

            case 'terminal':
                return (
                    <div className='app'>Terminal</div>
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

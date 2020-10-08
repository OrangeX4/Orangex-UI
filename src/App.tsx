import React, { useState, useEffect } from 'react'

import Item from './components/Item'
import Breadcrumb from './components/BreadCrumb'
import Footer from './components/Footer'
import Tab from './components/Tab'

import { message } from 'antd'

import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/ruby/ruby'
import 'codemirror/mode/lua/lua'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/htmlembedded/htmlembedded'
import 'codemirror/mode/css/css'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'
import 'codemirror/mode/php/php'
import 'codemirror/mode/perl/perl'
import 'codemirror/mode/go/go'
import 'codemirror/mode/dart/dart'


import './css/App.css'

import folderImg from './assets/folder.png'
import fileImg from './assets/file.png'
import fileDocImg from './assets/file_doc.png'
import fileImageImg from './assets/file_image.png'
import fileVideoImg from './assets/file_video.png'

import exampleJson from './json/example.json'
import suffixJson from './json/suffix.json'


function App() {

    // Main data stream
    const [state, setState] = useState(exampleJson)

    // const [url] = useState('http://127.0.0.1:1984/')
    const [url] = useState('http://192.168.137.1:1984/')

    function get(suffix: string, callback: (res: string) => void) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url + suffix, true)
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.send()
        xhr.onreadystatechange = () => {
            // alert(xhr.readyState + '  ' + xhr.status)
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText)
            }
        }
    }
    function post(suffix: string, content: string, callback: (response: string) => void) {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url + suffix, true)
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.send(content)
        xhr.onreadystatechange = () => {
            // alert(xhr.readyState + '  ' + xhr.status)
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText)
            }
        }
    }
    function forward(dirname: string) {
        get(`dir?name=${dirname}`, (responseText) => {
            const res = JSON.parse(responseText)
            if (res.isExist) {
                setState(res)
                setSelectedDirs({})
                setSelectedFiles({})
            }
        })
    }

    // eslint-disable-next-line
    useEffect(() => { forward('.') }, [])


    // new file
    function handleNewFile(filename: string) {
        get(`newfile?name=${state.current}/${filename}`, (response) => {
            forward(state.current)
            const res = JSON.parse(response)
            if (res.success) message.success('Success to create new file.')
            else message.warn('Fail to create new file.')
        })
    }
    // new folder
    function handleNewFolder(foldername: string) {
        get(`newdir?name=${state.current}/${foldername}`, (response) => {
            forward(state.current)
            const res = JSON.parse(response)
            if (res.success) message.success('Success to create new folder.')
            else message.warn('Fail to create new folder.')
        })
    }
    // rename
    function handleRename(oldName: string, newName: string) {
        get(`rename?oldname=${state.current}/${oldName}&newname=${state.current}/${newName}`, (response) => {
            forward(state.current)
            const res = JSON.parse(response)
            if (res.success) message.success('Success to rename.')
            else message.warn('Fail to rename.')
        })
    }
    // delete
    function handleDelete(dirs: string[], files: string[]) {
        post('delete', JSON.stringify({ current: state.current, dirs: dirs, files: files }), (response) => {
            forward(state.current)
            const res = JSON.parse(response)
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
            post('copy', JSON.stringify({ oldDir: oldDir, newDir: state.current, dirs: dirs, files: files }), (response) => {
                forward(state.current)
                const res = JSON.parse(response)
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
            post('move', JSON.stringify({ oldDir: oldDir, newDir: state.current, dirs: dirs, files: files }), (response) => {
                forward(state.current)
                const res = JSON.parse(response)
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

    function handleFileClick(name: string) {
        switch (getFileType(name)) {
            case 'document':
                setCurrentFile(name)
                post('read', JSON.stringify({
                    path: `${state.current}/${name}`
                }), (response) => {
                    const res = JSON.parse(response)
                    if (res.success) {
                        setContent(res.data)
                    } else message.warn('Fail to open file')
                })
                setCurrentTab('edit')
                break
            default:
        }

    }
    function handleSaveFile() {
        post('write', JSON.stringify({
            path: `${state.current}/${currentFile}`,
            data: content
        }), (response) => {
            const res = JSON.parse(response)
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
                                    matchBrackets: true
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

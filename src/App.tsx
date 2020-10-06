import React, { useState, useEffect } from 'react'

import Item from './components/Item'
import Breadcrumb from './components/BreadCrumb'
import Footer from './components/Footer'

import { message } from 'antd'

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
        xhr.send()
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
            if(res.success) message.success('Success to create new file.')
            else message.warn('Fail to create new file.')
        })
    }
    // new folder
    function handleNewFolder(foldername: string) {
        get(`newdir?name=${state.current}/${foldername}`, (response) => {
            forward(state.current)
            const res = JSON.parse(response)
            if(res.success) message.success('Success to create new folder.')
            else message.warn('Fail to create new folder.')
        })
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

    // Render
    return (
        <div className='App'>
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
                    onLongPress={() => handleSelectedFileChange(file.name)}
                    isSelect={selectedFiles[file.name]}
                    name={file.name}
                    description={file.showSize + ' | ' + file.lastTime}
                    icon={getFileIcon(file.name)} key={file.name}
                />)}
            </div>
            <Footer
                onDelete={(dirs, files) => alert(`delete: ${dirs} ${files}`)}
                onRename={(old, newn) => { alert(`old:${old} new:${newn}`) }}
                onTerminal={() => alert('terminal')}
                onSelectall={handleSelectall}
                onUnselect={handleUnselect}
                onNewFolder={handleNewFolder}
                onNewFile={handleNewFile}
                onCopy={(dirs, files) => alert(`copy: ${dirs} ${files}`)}
                onMove={(dirs, files) => alert(`move: ${dirs} ${files}`)}
                selectedDirs={selectedDirs}
                selectedFiles={selectedFiles}
            ></Footer>
        </div>
    )
}

export default App

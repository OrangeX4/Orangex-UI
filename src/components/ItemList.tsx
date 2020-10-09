import React, { useState } from 'react'

import Item from './Item'
import ConfirmDrawer from './ConfirmDrawer'

import { getFileType } from '../utils/utils'

import folderImg from '../assets/folder.png'
import fileImg from '../assets/file.png'
import fileDocImg from '../assets/file_doc.png'
import fileImageImg from '../assets/file_image.png'
import fileVideoImg from '../assets/file_video.png'

export interface State {
    isExist: boolean;
    current: string;
    dirs: {
        name: string;
        items: number;
    }[];
    files: {
        name: string;
        size: number;
        showSize: string;
        lastTime: string;
    }[];
}

interface SelectedItems {
    [ItemName: string]: boolean
}

interface Props {
    forward: (path: string) => void
    openFile: (name: string) => void
    state: State
    selectedDirs: SelectedItems
    selectedFiles: SelectedItems
    setSelectedDirs: React.Dispatch<React.SetStateAction<SelectedItems>>
    setSelectedFiles: React.Dispatch<React.SetStateAction<SelectedItems>>
}

function ItemList(props: Props) {
    
    const [isDrawerDisplay, setIsDrawerDisplay] = useState(false)
    const [savedFileName, setSavedFileName] = useState('')

    function handleSelectedDirChange(dirName: string) {
        const newSelectedDirs = JSON.parse(JSON.stringify(props.selectedDirs))
        newSelectedDirs[dirName] = newSelectedDirs[dirName] ? false : true
        props.setSelectedDirs(newSelectedDirs)
    }

    function handleSelectedFileChange(fileName: string) {
        const newSelectedFiles = JSON.parse(JSON.stringify(props.selectedFiles))
        newSelectedFiles[fileName] = newSelectedFiles[fileName] ? false : true
        props.setSelectedFiles(newSelectedFiles)
    }
    function handleFileClick(name: string) {
        switch (getFileType(name)) {
            case 'document':
                props.openFile(name)
                break
            case 'file':
                setSavedFileName(name)
                setIsDrawerDisplay(true)
                break
            default:
        }

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

    return (
        <div className='main'>
            <Item onClick={() => { props.forward(props.state.current + '/..') }} name='..' description='Return to parent folder' icon={folderImg} />
            <Item onClick={() => { props.forward(props.state.current + '/.') }} name='.' description='Refresh current folder' icon={folderImg} />
            {props.state.dirs.map((dir) => <Item
                onLongPress={() => handleSelectedDirChange(dir.name)}
                isSelect={props.selectedDirs[dir.name]}
                onClick={() => { props.forward(props.state.current + '/' + dir.name) }}
                name={dir.name}
                description={dir.items + ' Items'}
                icon={folderImg} key={dir.name}
            />)}
            {props.state.files.map((file) => <Item
                onClick={() => handleFileClick(file.name)}
                onLongPress={() => handleSelectedFileChange(file.name)}
                isSelect={props.selectedFiles[file.name]}
                name={file.name}
                description={file.showSize + ' | ' + file.lastTime}
                icon={getFileIcon(file.name)} key={file.name}
            />)}
            <ConfirmDrawer isDisplay={isDrawerDisplay} onConfirm={() => props.openFile(savedFileName)} onCancle={() => setIsDrawerDisplay(false)}>Are you sure to edit the file?</ConfirmDrawer>
        </div>
    )
}

export default ItemList
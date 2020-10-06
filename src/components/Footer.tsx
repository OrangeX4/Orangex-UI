import React, { useState, useEffect } from 'react'

import FooterMain from './FooterMain'
import FooterConfirm from './FooterConfirm'
import FooterSelected from './FooterSelected'
import FooterSingle from './FooterSingle'

import { message } from 'antd'

interface SelectedItems {
    [ItemName: string]: boolean
}

interface Props {
    current: string
    selectedDirs: SelectedItems
    selectedFiles: SelectedItems
    onCopy: (oldDir: string, dirs: string[], files: string[]) => void
    onMove: (oldDir: string, dirs: string[], files: string[]) => void
    onRename: (oldName: string, newName: string) => void
    onDelete: (dirs: string[], files: string[]) => void
    onUnselect: () => void
    onTerminal: () => void
    onSelectall: () => void
    onNewFolder: (name: string) => void
    onNewFile: (name: string) => void
}

function Footer(props: Props) {

    // State
    const [state, setState] = useState('main' as 'main' | 'selected' | 'single' | 'confirm')
    function getStateView() {
        switch (state) {
            case 'main':
                return (<FooterMain
                    onTerminal={props.onTerminal}
                    onSelectall={props.onSelectall}
                    onNewFolder={props.onNewFolder}
                    onNewFile={props.onNewFile}
                ></FooterMain>)
            case 'selected':
                return (<FooterSelected
                    onCopy={onCopy}
                    onMove={onMove}
                    onUnselect={props.onUnselect}
                    onDelete={handleDelete}
                />)
            case 'single':
                return (<FooterSingle
                    onCopy={onCopy}
                    onMove={onMove}
                    onRename={handleRename}
                    onDelete={handleDelete}
                    currentName={getCurrentName()}
                />)
            case 'confirm':
                return (<FooterConfirm onCancle={handleCancle} onOk={handleOk} />)
        }
    }
    useEffect(() => {
        const count = getArray(props.selectedDirs).length + getArray(props.selectedFiles).length
        switch (state) {
            case 'main':
                if (count === 1) setState('single')
                else if (count > 1) setState('selected')
                break
            case 'single':
                if (count === 0) setState('main')
                else if (count > 1) setState('selected')
                break
            case 'selected':
                if (count === 0) setState('main')
                else if (count === 1) setState('single')
                break
            default:
        }
    }, [props.selectedDirs, props.selectedFiles, state])

    // Delete
    function handleDelete() {
        props.onDelete(getArray(props.selectedDirs), getArray(props.selectedFiles))
        props.onUnselect()
    }

    // Rename
    function getCurrentName() {
        if (getArray(props.selectedDirs).length > 0) return getArray(props.selectedDirs)[0]
        else if (getArray(props.selectedFiles).length > 0) return getArray(props.selectedFiles)[0]
        else return ''
    }
    function handleRename(newName: string) {
        const oldName = getCurrentName()
        if (newName === '') {
            message.warn('New name cannot be empty!')
            return
        } else if (oldName === '') {
            message.warn('Please select one item at least!')
            return
        } else if (oldName === newName) {
            message.warn('New name should be different from the old name!')
            return
        } else {
            props.onRename(oldName, newName)
            props.onUnselect()
        }
    }


    // Copy and Move
    const [currentFunc, setHandleFunc] = useState('copy' as 'copy' | 'move')
    const [oldDir, setOldDir] = useState('.')
    const [savedDirs, setSavedDirs] = useState(getArray(props.selectedDirs))
    const [savedFiles, setSavedFiles] = useState(getArray(props.selectedFiles))

    function getArray(items: SelectedItems): string[] {
        const itemsArray = []
        for (const key in items) {
            if (items[key]) itemsArray.push(key)
        }
        return itemsArray
    }

    function onCopy() {
        setOldDir(props.current)
        setSavedDirs(getArray(props.selectedDirs))
        setSavedFiles(getArray(props.selectedFiles))
        setHandleFunc('copy')
        setState('confirm')
    }

    function onMove() {
        setOldDir(props.current)
        setSavedDirs(getArray(props.selectedDirs))
        setSavedFiles(getArray(props.selectedFiles))
        setHandleFunc('move')
        setState('confirm')
    }

    function handleCopy() {
        props.onCopy(oldDir, savedDirs, savedFiles)
    }

    function handleMove() {
        props.onMove(oldDir, savedDirs, savedFiles)
    }

    function handleCancle() {
        props.onUnselect()
        setState('main')
    }

    function handleOk() {
        switch (currentFunc) {
            case 'copy':
                handleCopy()
                break
            case 'move':
                handleMove()
                break
            default:
        }
        props.onUnselect()
        setState('main')
    }

    // Render
    return getStateView()
}

export default Footer

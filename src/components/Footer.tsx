import React, { useState, useEffect } from 'react'

import FooterMain from './FooterMain'
import FooterConfirm from './FooterConfirm'
import FooterSelected from './FooterSelected'
import FooterSingle from './FooterSingle'

interface SelectedItems {
    [ItemName: string]: boolean
}

interface Props {
    selectedDirs: SelectedItems
    selectedFiles: SelectedItems
    onCopy: (dirs: string[], files: string[]) => void
    onMove: (dirs: string[], files: string[]) => void
    onRename: (oldName: string, newName: string) => void
    onDelete: () => void
    onUnselect: () => void
}

function Footer(props: Props) {

    // State
    const [state, setState] = useState('main' as 'main' | 'selected' | 'single' | 'confirm')
    function getStateView() {
        switch (state) {
            case 'main':
                return (<FooterMain></FooterMain>)
            case 'selected':
                return (<FooterSelected
                    onCopy={onCopy}
                    onMove={onMove}
                    onUnselect={props.onUnselect}
                    onDelete={props.onDelete}
                />)
                break
            case 'single':
                return (<FooterSingle
                    onCopy={onCopy}
                    onMove={onMove}
                    onRename={handleRename}
                    onDelete={props.onDelete}
                />)
                break
            case 'confirm':
                return (<FooterConfirm onCancle={handleCancle} onOk={handleOk} />)
                break
        }
    }
    useEffect(() => {
        const count = getArray(props.selectedDirs).length + getArray(props.selectedFiles).length
        switch (state) {
            case 'main':
                if (count == 1) setState('single')
                else if (count > 1) setState('selected')
                break
            case 'single':
                if (count == 0) setState('main')
                else if (count > 1) setState('selected')
                break
            case 'selected':
                if (count == 0) setState('main')
                else if (count == 1) setState('single')
                break
            default:
        }
    }, [props.selectedDirs, props.selectedFiles])

    // Rename
    function handleRename(newName: string) {
        if (getArray(props.selectedDirs).length > 0) props.onRename(getArray(props.selectedDirs)[0], newName)
        else if (getArray(props.selectedFiles).length > 0) props.onRename(getArray(props.selectedFiles)[0], newName)
    }

    // Copy and Move
    const [currentFunc, setHandleFunc] = useState('copy' as 'copy' | 'move')
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
        setSavedDirs(getArray(props.selectedDirs))
        setSavedFiles(getArray(props.selectedFiles))
        setHandleFunc('copy')
        setState('confirm')
    }

    function onMove() {
        setSavedDirs(getArray(props.selectedDirs))
        setSavedFiles(getArray(props.selectedFiles))
        setHandleFunc('move')
        setState('confirm')
    }

    function handleCopy() {
        props.onCopy(savedDirs, savedFiles)
    }

    function handleMove() {
        props.onMove(savedDirs, savedFiles)
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

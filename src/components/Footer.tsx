import React, { useState, useEffect } from 'react'

import FooterMain from './FooterMain'
import FooterConfirm from './FooterConfirm'

interface SelectedItems {
    [ItemName: string]: boolean
}

interface Props {
    selectedDirs: SelectedItems
    selectedFiles: SelectedItems
    onCopy: (dirs: string[], files: string[]) => void
    onMove: (dirs: string[], files: string[]) => void
}

function Footer(props: Props) {

    // State
    const [state, setState] = useState('main' as 'main'|'confirm')
    function getStateView() {
        switch(state) {
            case 'main':
                return (<FooterMain
                    onCopy={onCopy}
                    onMove={onMove}
                    onRename={(newName) => alert(`rename: ${newName}`)}
                    onDelete={() => alert('delete')}
                />)
                break
            case 'confirm':
                return (<FooterConfirm onCancle={() => setState('main')} onOk={handleOk} />)
                break
        }
    }

    // Copy and Move
    const [currentFunc, setHandleFunc] = useState('copy' as 'copy'|'move')
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
        setState('main')
    }

    // Render
    return getStateView()
}

export default Footer

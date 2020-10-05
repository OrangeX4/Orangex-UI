import React, { useState, useEffect } from 'react'

import FooterMain from './FooterMain'
import FooterActive from './FooterActive'

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

    const [isActive, setIsActive] = useState(false)
    const [currentFunc, setHandleFunc] = useState('copy')
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
        setIsActive(true)
    }

    function onMove() {
        setSavedDirs(getArray(props.selectedDirs))
        setSavedFiles(getArray(props.selectedFiles))
        setHandleFunc('move')
        setIsActive(true)
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
        setIsActive(false)
    }


    // Render
    return (<div>
        {isActive ? <FooterActive onCancle={() => setIsActive(false)} onOk={handleOk} /> : <FooterMain
            onCopy={onCopy}
            onMove={onMove}
            onRename={(newName) => alert(`rename: ${newName}`)}
            onDelete={() => alert('delete')}
        />}
    </div>
    )
}

export default Footer

import React, { useState, useEffect } from 'react'

import Item from './components/Item'
import Breadcrumb from './components/BreadCrumb'
import FooterMain from './components/FooterMain'
import FooterActive from './components/FooterActive'

import './css/App.css'

import example from './test/example.json'


function App() {

  // Main data stream
  const [state, setState] = useState(example)

  function forward(dirname: string) {
    const url = 'http://127.0.0.1:1984/dir?dir=' + dirname
    // const url = 'http://192.168.137.1:1984/dir?dir=' + dirname

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.send()
    xhr.onreadystatechange = function () {
      // alert(xhr.readyState + '  ' + xhr.status)
      if (xhr.readyState === 4 && xhr.status === 200) {
        var res = JSON.parse(xhr.responseText)
        if (res.isExist) {
          setState(res)
          setSelectedDirs({})
          setSelectedFiles({})
        }
      }
    };
  }

  useEffect(() => {
    forward('.')
  }, [])


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


  // Footer
  const [isActive, setIsActive] = useState(false)
  const [currentFunc, setHandleFunc] = useState('copy')
  const [savedDirs, setSavedDirs] = useState(getArray(selectedDirs))
  const [savedFiles, setSavedFiles] = useState(getArray(selectedFiles))

  function getArray(items: SelectedItems): string[] {
    const itemsArray = []
    for(const key in items){
      if(items[key]) itemsArray.push(key)
    }
    return itemsArray
  }

  function onCopy() {
    setSavedDirs(getArray(selectedDirs))
    setSavedFiles(getArray(selectedFiles))
    setHandleFunc('copy')
    setIsActive(true)
  }

  function onMove() {
    setSavedDirs(getArray(selectedDirs))
    setSavedFiles(getArray(selectedFiles))
    setHandleFunc('move')
    setIsActive(true)
  }

  function handleCopy() {
    alert('copy\n' + JSON.stringify(savedDirs) + JSON.stringify(savedFiles))
  }
  
  function handleMove() {
    alert('move\n' + savedDirs + savedFiles)
  }

  function handleOk() {
    switch(currentFunc){
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
  return (
    <div className='App'>
      <Breadcrumb text={state.current} />
      <div className='main'>
        <Item onClick={() => { forward(state.current + '/..') }} name='..' description='Return to parent folder' icon='folder' />
        <Item onClick={() => { forward(state.current + '/.') }} name='.' description='Refresh current folder' icon='folder' />
        {state.dirs.map((dir) => <Item onLongPress={() => handleSelectedDirChange(dir.name)} isSelect={selectedDirs[dir.name]} onClick={() => { forward(state.current + '/' + dir.name) }} name={dir.name} description={dir.items + ' Items'} icon='folder' key={dir.name} />)}
        {state.files.map((file) => <Item onLongPress={() => handleSelectedFileChange(file.name)} isSelect={selectedFiles[file.name]} name={file.name} description={file.showSize + ' | ' + file.lastTime} icon='file' key={file.name} />)}
      </div>
      {isActive ? <FooterActive onCancle={() => setIsActive(false)} onOk={handleOk} /> : <FooterMain
        onCopy={onCopy}
        onMove={onMove}
        onRename={(newName) => alert(`rename: ${newName}`)}
        onDelete={() => alert('delete')}
      />}
    </div>
  );
}

export default App

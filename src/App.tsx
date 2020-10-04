import React, { useState, useEffect } from 'react'

import Item from './components/Item'
import Breadcrumb from './components/BreadCrumb'
import Footer from './components/Footer'
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
  interface SelectedDirs {
    [ItemName: string]: boolean
  }
  interface SelectedFiles {
    [ItemName: string]: boolean
  }

  const [selectedDirs, setSelectedDirs] = useState({} as SelectedDirs)
  const [selectedFiles, setSelectedFiles] = useState({} as SelectedFiles)

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
      {isActive ? <FooterActive /> : <Footer />}
    </div>
  );
}

export default App

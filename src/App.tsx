import React, { useState, useEffect } from 'react'

import Item from './components/Item'
import Breadcrumb from './components/BreadCrumb'

import example from './test/example.json'

function App() {
  // eslint-disable-next-line
  const [state, setState] = useState(example);

  function forward(dirname: string) {
    var url = 'http://192.168.137.1:1984/dir?dir=' + dirname

    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.send()
    xhr.onreadystatechange = function () {
      // alert(xhr.readyState + '  ' + xhr.status)
      if (xhr.readyState === 4 && xhr.status === 200) {
        var res = JSON.parse(xhr.responseText)
        if (res.isExist) {
          setState(res)
        }
      }
    };
  }

  // didMount
  useEffect(() => {
    forward('/home')
  }, [])

  return (
    <div className='App'>
      <Breadcrumb text={state.current} />
      <Item onClick={() => { forward('..') }} name='..' description='Return to parent folder' icon='folder' />
      <Item onClick={() => { forward('.') }} name='.' description='Refresh current folder' icon='folder' />
      {state.dirs.map((dir) => <Item onClick={() => { forward(dir.name) }} name={dir.name} description={dir.items + ' Items'} icon='folder' key={dir.name} />)}
      {state.files.map((file) => <Item name={file.name} description={file.showSize + ' | ' + file.lastTime} icon='file' key={file.name} />)}
    </div>
  );
}

export default App

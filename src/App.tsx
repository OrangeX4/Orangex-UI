import React from 'react'

import Item from './components/Item'
import Breadcrumb from './components/BreadCrumb'

import example from './test/example.json'

function App() {
  return (
    <div className='App'>
      <Breadcrumb text={example.current} />
      <Item name='..' description='Return to parent folder' icon='folder' />
      <Item name='.' description='Refresh current folder' icon='folder' />
      {example.dirs.map((dir) => <Item name={dir.name} description={dir.items + ' Items'} icon='folder' key={dir.name} />)}
      {example.files.map((file) => <Item name={file.name} description={file.showSize + ' | ' + file.lastTime} icon='file' key={file.name} />)}
    </div>
  );
}

export default App

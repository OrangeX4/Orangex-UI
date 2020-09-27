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
    </div>
  );
}

export default App

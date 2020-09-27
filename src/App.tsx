import React from 'react'

import Item from './components/Item'

function App() {
  return (
    <div className="App">
      <Item name=".." description="Return to parent folder" icon='folder'></Item>
      <Item name="." description="Refresh current folder" icon='folder'></Item>
    </div>
  );
}

export default App

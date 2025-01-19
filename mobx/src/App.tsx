import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './component/TaskList'
import TaskStore from './store/TaskStore'
import { observer } from 'mobx-react'

const App =() => {

  return (
    <>
      <TaskList />
      {/* {TaskStore.lengthCounter} */}
    </>
  )
}

export default App

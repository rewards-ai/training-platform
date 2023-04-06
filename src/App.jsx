import './App.css'
import DisplayWindow from './components/DisplayWIndow/DisplayWindow'
import Navbar from './components/Navbar/Navbar'
import VideoStream from './components/VideoStream/VideoStream'
import { useState } from 'react'

function App() {
  const [isWin, setIsWin] = useState(0)
  return (
    <div className="App">
      {/* <VideoStream /> */}
      <Navbar isWin={isWin} setIsWin={setIsWin} />
      <DisplayWindow isWin={isWin} setIsWin={setIsWin}/>
    </div>
  )
}

export default App

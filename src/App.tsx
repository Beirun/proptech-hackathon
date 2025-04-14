
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
        <Route path="/testing" element={<h1 className='text-xl'>testing</h1>} />
    </Routes> 
  )
}

export default App

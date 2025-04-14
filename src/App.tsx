
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import Dashboard from './pages/User/Dashboard.tsx'
function App() {

  return (
    <Routes>
        <Route path="/testing" element={<h1 className='text-xl'>testing</h1>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes> 
  )
}

export default App

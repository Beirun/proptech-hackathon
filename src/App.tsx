
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import Dashboard from './pages/Client/Dashboard.tsx'
import AgentDashboard from './pages/Agent/Dashboard.tsx'
import PropertyList from './pages/Client/PropertyList.tsx'
import AgentHistory from './pages/Agent/History.tsx'
function App() {

  return (
    <Routes>
        <Route path="/testing" element={<h1 className='text-xl'>testing</h1>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/list" element={<PropertyList/>}/>
        <Route path="/dashboard/agent" element={<AgentDashboard/>}/>
        <Route path="/history/agent" element={<AgentHistory/>}/>
    </Routes> 
  )
}

export default App


import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import Dashboard from './pages/Client/Dashboard.tsx'
import AgentDashboard from './pages/Agent/Dashboard.tsx'
import PropertyList from './pages/Client/PropertyList.tsx'
import AgentHistory from './pages/Agent/History.tsx'
import UserProfile from './pages/UserProfile.tsx'
import YourPosts from './pages/Agent/YourPosts.tsx'
import PropertyView from './pages/Client/PropertyView.tsx'
import AdminDashboard from './pages/Admin/Dashboard.tsx'
function App() {

  return (
    <Routes>
        <Route path="/testing" element={<h1 className='text-xl'>testing</h1>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/properties" element={<PropertyList/>}/>
        <Route path="/properties/:id" element={<PropertyView/>}/>
        <Route path="/dashboard/agent" element={<AgentDashboard/>}/>
        <Route path="/dashboard/admin" element={<AdminDashboard/>}/>
        <Route path="/posts" element={<YourPosts/>}/>
        <Route path="/history/agent" element={<AgentHistory/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
    </Routes> 
  )
}

export default App

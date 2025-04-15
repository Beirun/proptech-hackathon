import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [role, setRole] = useState("");

  useEffect(() => {
    const sessionRole = sessionStorage.getItem("role");
    setRole(sessionRole ?? "");
  }, []);
  const isActive = (pathname: string) => {
    return location.pathname === pathname || location.pathname.startsWith(pathname)
  }
  return (
    <aside className="bg-base-100 border-r-2 border-gray-300 min-h-screen h-full w-80 top-0">
      <div className="flex flex-col items-start gap-4 p-4">
        <div className="w-full text-center border-b border-gray-400 py-5">

        <p>Welcome to <br /><span className="text-4xl font-mono">NestSpace</span></p>
        </div>
      <button onClick={() => role === "agent" ?  navigate('/dashboard/agent'): navigate('/dashboard')} className={`cursor-pointer flex ${(isActive('/dashboard/agent') && role === "agent") || (isActive('/dashboard') && role === "customer") ? 'text-primary' : ''}`}>
      {((isActive('/dashboard/agent') && role === "agent") || (isActive('/dashboard') && role === "customer")) &&
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      }

        Dashboard</button>
      {
        (role === "customer") &&
        <button onClick={() => navigate('/properties')} className={`cursor-pointer flex ${isActive('/properties') ? 'text-primary' : ''}`}>
      {isActive('/properties') &&
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      }

        Properties</button>
        }

{
        (role === "agent") &&
        <button onClick={() => navigate('/posts')} className={`cursor-pointer flex ${isActive('/posts') ? 'text-primary' : ''}`}>
      {isActive('/posts') &&
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      }

        Your Posts</button>
        }
      <button onClick={() => navigate('/history/agent')} className={`cursor-pointer flex ${isActive('/history/agent') ? 'text-primary' : ''}`}>
      {isActive('/history/agent') &&
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      }
        History</button>
      <button onClick={() => navigate('/user-profile')} className={`cursor-pointer flex ${isActive('/user-profile') ? 'text-primary' : ''}`}>
      {isActive('/user-profile') &&
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      }
        Profile</button>
      <button
        onClick={() => {
          sessionStorage.removeItem("token");
          navigate('/signin')}}
      className="cursor-pointer">Logout</button>
      </div>
    </aside>
  )
}

export default Sidebar
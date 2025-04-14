import { useNavigate, useLocation } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (pathname: string) => {
    return location.pathname === pathname
  }
  return (
    <aside className="bg-base-100 border-r-2 border-gray-300 min-h-screen h-full w-80 top-0">
      <div className="flex flex-col items-start gap-4 p-4">
        <div className="w-full text-center border-b border-gray-400 py-5">

        <p>Welcome to <br /><span className="text-4xl font-mono">NestSpace</span></p>
        </div>
      <button onClick={() => navigate('/dashboard/agent')} className={`cursor-pointer flex ${isActive('/dashboard/agent') ? 'text-primary' : ''}`}>
      {isActive('/dashboard/agent') &&
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      }

        Dashboard</button>
      <button onClick={() => navigate('/history/agent')} className={`cursor-pointer flex ${isActive('/history/agent') ? 'text-primary' : ''}`}>
      {isActive('/history/agent') &&
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      }
        History</button>
      </div>
    </aside>
  )
}

export default Sidebar
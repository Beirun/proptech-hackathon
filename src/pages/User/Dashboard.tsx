import Sidebar from "../../components/Sidebar";
const Dashboard = () => {
  return (
    <div className="drawer w-screen lg:drawer-open mx-auto">
      <input type="checkbox" id="drawer" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="sticky top-0 z-30 flex h-16 w-full justify-center backdrop-blur transition-shadow duration-100 print:hidden shadow-sm">
          <nav className="navbar w-full">
            <div className="flex flex-1 items-center md:gap-1 lg:gap-2">
              <label
                htmlFor="drawer"
                className="btn btn-circle btn-ghost drawer-button swap swap-rotate lg:hidden"
              >
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" /> 

                {/* hamburger icon */}
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                {/* close icon */}
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
            </div>
          </nav>
        </div>
        <div className="max-w-[100vw] relative bg-gray-100">
            <div>Test</div>
        </div>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;

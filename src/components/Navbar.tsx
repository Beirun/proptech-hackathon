const Navbar = () => {
  return (
    <div className="sticky top-0 z-30 flex h-16 bg-base-100 w-full lg:shadow-none shadow-sm shadow-gray-500  justify-center lg:bg-transparent transition-shadow duration-100 print:hidden ">
      <nav className="navbar w-full">
        <div className="flex flex-1 items-center md:gap-3 lg:gap-2">
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
          <div className="lg:hidden font-mono text-3xl">NetSpace</div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

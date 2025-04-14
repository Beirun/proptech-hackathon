import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="h-screen  w-screen flex justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center justify-center lg:w-1/3 md:w-2/3 lg:h-[95%] h-full rounded-lg shadow-lg shadow-gray-300 border-2 border-gray-300 bg-slate-50 w-full gap-2 ">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2 lg:mb-5  lg:mt-0 -mt-20">
            Sign Up
          </h1>

          <div className="w-full flex justify-center">
            <fieldset className="fieldset w-2/3">
              <legend className="fieldset-legend">First Name</legend>
              <label className="input input-md lg:input-lg rounded-md w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-[1em] opacity-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <input type="text" placeholder="Enter First Name" required />
              </label>
            </fieldset>
          </div>

          <div className="w-full flex justify-center">
            <fieldset className="fieldset w-2/3">
              <legend className="fieldset-legend">Last Name</legend>
              <label className="input input-md lg:input-lg rounded-md w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-[1em] opacity-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <input type="text" placeholder="Enter Last Name" required />
              </label>
            </fieldset>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-2/3 flex gap-10 justify-between">
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Age</legend>
                <select
                  defaultValue="Age"
                  className="select select-md lg:select-lg"
                >
                  <option disabled={true}>Age</option>
                  {[...Array(100 - 18).keys()].map((i) => (
                    <option key={i + 18}>{i + 18}</option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  defaultValue="Gender"
                  className="select select-md lg:select-lg"
                >
                  <option disabled={true}>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer Not To Say</option>
                </select>
              </fieldset>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <fieldset className="fieldset w-2/3">
              <legend className="fieldset-legend">Address</legend>
              <label className="input input-md lg:input-lg rounded-md w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="h-[1em] opacity-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <input placeholder="Enter Address" required />
              </label>
            </fieldset>
          </div>
          <div className="w-full flex justify-center">
            <fieldset className="fieldset w-2/3">
              <legend className="fieldset-legend">Email</legend>
              <label className="input input-md lg:input-lg rounded-md w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input type="email" placeholder="Enter Email" required />
              </label>
            </fieldset>
          </div>

          <div className="w-full flex justify-center">
            <fieldset className="fieldset w-2/3">
              <legend className="fieldset-legend">Password</legend>

              <label className="input input-md lg:input-lg rounded-md w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Enter Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
              </label>
            </fieldset>
          </div>
          {/* <div className="w-full flex justify-center">
            <fieldset className="fieldset w-2/3">
              <legend className="fieldset-legend">Password</legend>

              <label className="input input-md lg:input-lg rounded-md w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Enter Confirm Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
              </label>
              
            </fieldset>
          </div> */}
          <div className="flex w-full justify-center">
            <div className="w-2/3 flex mt-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-xs"
              />
              <p className="ml-2 -mt-1 text-md lg:text-lg">Agree to{" "}
            <Link
              to="/signup"
              className="cursor-pointer hover:underline text-primary font-semibold text-lg"
            >
              Terms and Conditions
            </Link></p>
            </div>
          </div>
          <button className="btn btn-primary btn-md lg:btn-lg rounded-md w-2/3 my-5">
            Sign Up
          </button>
          <div>
            Already have an account?{" "}
            <Link
              to="/signin"
              className="cursor-pointer hover:underline text-primary font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

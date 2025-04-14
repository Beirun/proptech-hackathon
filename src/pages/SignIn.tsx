import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <div className="lg:w-screen h-dvh w-screen flex justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center justify-center lg:w-1/3 md:w-2/3 lg:h-7/10 h-full rounded-lg shadow-lg shadow-gray-300 border-2 border-gray-300 bg-slate-50 w-full gap-5">
          <h1 className="text-5xl font-bold text-gray-800">Sign In</h1>
          <div className="w-full flex justify-center">
            <fieldset className="fieldset w-2/3">
              <legend className="fieldset-legend">Email</legend>
              <label className="input input-lg rounded-md w-full">
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
                <input type="email" placeholder="Enter your email" required />
              </label>
            </fieldset>
          </div>

          <div className="w-full flex justify-center">
            <fieldset className="fieldset w-2/3">
              <legend className="fieldset-legend">Password</legend>

              <label className="input input-lg rounded-md w-full">
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
                  placeholder="Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
              </label>
              <div className="w-full text-right py-4">
                <Link
                  to="/reset"
                  className="cursor-pointer hover:underline text-primary font-semibold text-lg"
                >
                  Forgot password?
                </Link>
              </div>
            </fieldset>
          </div>
          <button className="btn btn-primary btn-lg rounded-md w-2/3 my-5">
            Sign In
          </button>
          <div>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="cursor-pointer hover:underline text-primary font-semibold text-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

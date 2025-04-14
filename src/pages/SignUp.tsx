import { Link } from "react-router-dom";
import { useState } from "react";

type User = {
  email: string;
  password: string;
  lname: string;
  fname: string;
  bday: Date;
  address: string;
  gender: string;
  role: string
};

const SignUp = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    lname: "",
    fname: "",
    bday: new Date(),
    address: "",
    gender: "",
    role: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUser({ ...user, bday: new Date(value) });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user); // Or send to API
  };

  const handleTogglePassword = () =>{
    setShowPassword((prev)=>!prev)
  }
  
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
        
        <div className="flex flex-col items-center justify-center lg:w-1/3 md:w-2/3 h-full rounded-lg shadow-lg shadow-gray-300 border-2 border-gray-300 bg-slate-50 w-full gap-2">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2 lg:mb-5 lg:mt-0 -mt-20">
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
                <input
                  name="fname"
                  value={user.fname}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter First Name"
                  required
                />
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
                <input
                  name="lname"
                  value={user.lname}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Last Name"
                  required
                />
              </label>
            </fieldset>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-2/3 flex gap-10 justify-between">
                {/* <p className="pointer-events-none absolute bg-base-100 py-1 mt-10 z-10 px-5 pr-10 text-md lg:text-lg">{user.bday != new Date("Jan 1, 1000") ? "Birthdate" : ""}</p> */}
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Birthdate</legend>
                <input
                  name="bday"
                  value={user.bday.toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  type="date"
                  className="input input-md lg:input-lg rounded-md"
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleSelectChange}
                  className="select select-md lg:select-lg"
                >
                  <option disabled={true} value="">
                    Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer Not To Say</option>
                </select>
              </fieldset>
            </div>
          </div>
          <div className="w-full flex justify-center">
                {/* <p className="pointer-events-none absolute bg-base-100 py-1 mt-10 z-10 px-5 pr-10 text-md lg:text-lg">{user.bday != new Date("Jan 1, 1000") ? "Birthdate" : ""}</p> */}
            
              <fieldset className="fieldset w-2/3">
                <legend className="fieldset-legend">Role</legend>
                <select
                  name="role"
                  value={user.role}
                  onChange={handleSelectChange}
                  className="select select-md lg:select-lg w-full"
                >
                  <option disabled={true} value="">
                    Role
                  </option>
                  <option>Client</option>
                  <option>Agent</option>
                </select>
              </fieldset>
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
                <input
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  required
                />
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
                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter Email"
                  required
                />
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
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
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
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
                <label className="swap">
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox"  onChange={handleTogglePassword}/>

                  {/* volume on icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="swap-on h-[1em] opacity-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  {/* volume off icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="swap-off h-[1em] opacity-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </label>
              </label>
            </fieldset>
          </div>

          <div className="flex w-full justify-center">
            <div className="w-2/3 flex mt-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-xs"
              />
              <p className="ml-2 -mt-1 text-md lg:text-lg">
                Agree to{" "}
                <Link
                  to="/signup"
                  className="cursor-pointer hover:underline text-primary font-semibold text-lg"
                >
                  Terms and Conditions
                </Link>
              </p>
            </div>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary btn-md lg:btn-lg rounded-md w-2/3 my-5">
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


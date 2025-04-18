import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignInInput = {
  email: string;
  password: string;
}

type SignInResult = {
  token: string,
  user: {
    id: number,
    role: "admin" | "agent" | "customer"
  }
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState } = useForm<SignInInput>();
  const navigator = useNavigate();

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.log("Error");
      return;
    }

    const result = await response.json() as SignInResult;
    console.log(result)
    sessionStorage.setItem("token", result.token);
    sessionStorage.setItem("role", result.user.role)

    // redirect
    if (result.user.role === "admin") {
      navigator("#") // go to admin
    }
    else if (result.user.role === "agent") {
      navigator("/dashboard/agent")
    }
    else {
      navigator("/dashboard") // go to customer
    }
  };


  return (
    <>
      <div className="lg:w-screen h-dvh w-screen flex justify-center items-center bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center lg:w-1/3 md:w-2/3 lg:h-7/10 h-full rounded-lg shadow-lg shadow-gray-300 border-2 border-gray-300 bg-slate-50 w-full gap-5">
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
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                />
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
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  //minLength={8}
                  //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  //title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
                <label className="swap">
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox" onChange={() => setShowPassword((prev) => !prev)} />

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
              {/* <div className="w-full text-right py-4">
                <Link
                  to="/reset"
                  className="cursor-pointer hover:underline text-primary font-semibold text-lg"
                >
                  Forgot password?
                </Link>
              </div> */}
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
        </form>
      </div>
    </>
  );
};

export default SignIn;


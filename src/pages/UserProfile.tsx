import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
const UserProfile = () => {
  return (
    <div className="drawer w-screen lg:drawer-open mx-auto">
      <input type="checkbox" id="drawer" className="drawer-toggle" />

      <div className="drawer-content">
        <Navbar />
        <div className="max-w-[100vw] relative px-20 flex flex-col justify-center">
          <div className="w-full flex flex-row justify-between ">
            <h1 className="text-2xl font-bold px-60">Your Information</h1>
          </div>
          <div className="w-full h-[80vh] flex justify-center">

          <div className="w-7/10 h-full flex flex-row  mt-5 rounded-3xl py-5 px-10 border-2 border-gray-300 shadow-lg shadow-gray-500/50">
            <div className="w-1/3 h-full flex flex-col gap-5 ml-10">
                
                <div className="w-70 h-70 rounded-full bg-[url('/src/assets/react.svg')] bg-cover bg-center mt-10"></div>
                    <div className="btn bg-primary">Upload Profile Picture</div>
                    <button className=" text-red-400 cursor-pointer">Remove</button>
                </div>
                <div className="w-3/4 h-full flex flex-col px-25 py-10 justify-between">
                    {/*
                    body: t.Object({
                        email: t.String(),
                        password: t.String({ minLength: 8 }),
                        lname: t.String(),
                        fname: t.String(),
                        bday: t.Date(),
                        address: t.String(),
                        gender: t.String(),
                        role: t.String({ examples: ["admin", "agent", "customer"] }),
                    }),
                    */}
                    <div className="w-full flex flex-row justify-between items-center gap-5">

                        <p className="font-bold">First Name:</p>
                        <div className="w-7/10 flex flex-row justify-center">

                            <input type="text" value={"fname"} className="input w-full focus:outline-none" />
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center gap-5">

                        <p className="font-bold">Last Name:</p>
                        <div className="w-7/10 flex flex-row justify-center">

                            <input type="text" value={"lname"} className="input w-full focus:outline-none" />
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center gap-5">

                        <p className="font-bold">Email:</p>
                        <div className="w-7/10 flex flex-row justify-center">

                            <input type="text" value={"email"} className="input w-full focus:outline-none" />
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center gap-5">

                        <p className="font-bold">Address:</p>
                        <div className="w-7/10 flex flex-row justify-center">

                            <input type="text" value={"address"} className="input w-full focus:outline-none" />
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center gap-5">

                        <p className="font-bold">Gender:</p>
                        <div className="w-7/10 flex flex-row justify-center">

                            <input type="text" value={"gender"} className="input w-full focus:outline-none" />
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center gap-5">

                        <p className="font-bold">Birthday:</p>
                        <div className="w-7/10 flex flex-row justify-center">

                            <input type="text" value={"birthday"} className="input w-full focus:outline-none" />
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center gap-5">

                        <p className="font-bold">Password:</p>
                        <div className="w-7/10 flex flex-row justify-center">

                            <input type="text" value={"password"} className="input w-full focus:outline-none" />
                        </div>
                    </div>
                    <button className="btn bg-primary">Edit</button>
                    <button className="btn bg-secondary">Save</button>
                </div>
          </div>
          </div>
        </div>
      </div>
      
      <div className="drawer-side z-40">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default UserProfile;

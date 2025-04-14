import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
const Dashboard = () => {
  return (
    <div className="drawer w-screen lg:drawer-open mx-auto">
      <input type="checkbox" id="drawer" className="drawer-toggle" />

      <div className="drawer-content">
        <Navbar />
        <div className="max-w-[100vw] relative px-20 flex flex-col justify-center">
          <div className="w-full flex flex-row justify-between ">
            <h1 className="text-2xl font-bold">Browse Postings</h1>
            <div className="flex flex-row gap-5 w-1/3">

            <input type="text" className="input focus:outline-none w-full" placeholder="Search" />
            <button className="btn rounded-lg bg-blue-400 font-bold" >Go</button>
            </div>
          </div>
          </div>
          <div className="w-full p-4 gap-4 flex flex-wrap mt-5 justify-center">
        {[...Array(10).keys()].map(()=>(

          <div className="card w-[30%] flex flex-row justify-between border-2 border-gray-300  rounded-2xl p-2">
            <figure>
              <img src="src/assets/sacred-heart-center.jpg" alt="" />
            </figure>
            <div className="card-body">
              <div className="card-title text-2xl font-bold">Title</div>
              <p className="text-sm">Name</p>
              <p className="text-lg">Address</p>
              <p className="text-lg">Description/Content</p>
              <p className="text-lg">Amount:</p>
              
            </div>
          </div>
        ))}
          
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

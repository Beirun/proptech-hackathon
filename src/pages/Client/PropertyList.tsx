import Navbar from "../../components/Navbar";
import PropertyCard from "../../components/PropertyCard";
import Sidebar from "../../components/Sidebar";

const PropertyList = () => {
  return (
    <div className="drawer max-w-[100vw] lg:drawer-open">
      <input type="checkbox" id="drawer" className="drawer-toggle" />

      <div className="drawer-content">
        <Navbar />

        <div className="max-w-[100vw] relative bg-gray-100">
          <div className="w-full flex items-center px-10 py-10 ">
          <label className="input w-full lg:max-w-2/3 grow input-lg">
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
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
          </div>
          <div className="w-full     px-10 py-5 flex flex-wrap justify-center items-center gap-y-10 lg:gap-x-5 gap-x-10">
            {[...Array(10).keys()].map((index) => (
              <PropertyCard
                key={index}
                title="Title"
                propertyType="Property Type"
                image="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp"
                location="Location"
                owner="Owner"
                price="₱ 500,000.00"
                description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
                index={index}
                max={10}
              />
            ))}
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

export default PropertyList;

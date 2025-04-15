import Navbar from "../../components/Navbar";
import PropertyCard from "../../components/PropertyCard";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import Resizer from "react-image-file-resizer";
interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  imageName: string;
  latitude: string | null;
  longitude: string | null;
  description: string;
  type: {
    id: number;
    name: string;
  };
}
const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("Missing token!");
      return;
    }

    const response = await fetch("/api/properties", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("Fetching failed");
      return;
    }
    //
    const result = (await response.json()) as Property[];
    console.log("properties", result);
    for (const property of result) {
      const resizeFile = (imageUrl: string) =>
        fetch(imageUrl)
          .then((response) => response.blob())
          .then((blob) => {
            return new Promise((resolve) => {
              Resizer.imageFileResizer(
                blob,
                450,
                200,
                "JPEG",
                50,
                0,
                (uri) => {
                  resolve(uri);
                },
                "base64",
                450,
                200
              );
            });
          });

      try {
        const resizedImageUrl = await resizeFile(
          `/api/files/${property.imageName}`
        );
        property.imageName = resizedImageUrl as string;
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
    setProperties(result);
  };
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
            {properties.length === 0
              ? [...Array(10).keys()].map(() => (
                  <div className="flex w-[350px] min-w-[250px] flex-wrap flex-col gap-4">
                    <div className="grow skeleton h-50 w-full"></div>
                    <div className="grow skeleton h-4 w-28"></div>
                    <div className="grow skeleton h-4 w-full"></div>
                    <div className="grow skeleton h-4 w-full"></div>
                  </div>
                ))
              : properties.map((property, index) => (
                  <PropertyCard
                    key={index}
                    title={property.name}
                    propertyType={property.type.name}
                    image={property.imageName}
                    location={property.location}
                    owner={""}
                    price={property.price.toString()}
                    description={property.description}
                    index={index}
                    id={property.id} 
                    max={properties.length}
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

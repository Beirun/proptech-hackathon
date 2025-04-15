import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LeafletMouseEvent } from "leaflet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  status: "rent" | "buy";
  type: {
    id: number;
    name: string;
  };
}
const PropertyList = () => {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [property, setProperty] = useState<Property>({
    id: 0,
    name: "",
    location: "",
    price: 0,
    imageName: "",
    latitude: null,
    longitude: null,
    description: "",
    status: "rent",
    type: {
      id: 0,
      name: "",
    },
  });
  // i have no idea what i'm doing
  useEffect(() => {
    fetchPostData();
  }, []);

  const handleRentClick = async() => {
    const token = sessionStorage.getItem("token");
    const response = await fetch( "/api/properties", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: property.id,}),
    });
  }
  const fetchPostData = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    console.log(id);
    const response = await fetch(`/api/properties/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      alert("Failed to fetch property.");
      return;
    }

    const result = (await response.json()) as Property;
    console.log(result);
    const resizeFile = (imageUrl: string) =>
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          return new Promise((resolve) => {
            Resizer.imageFileResizer(
              blob,
              1000,
              500,
              "JPEG",
              100,
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
        `/api/files/${result.imageName}`
      );
      result.imageName = resizedImageUrl as string;
    } catch (error) {
      console.error("Error resizing image:", error);
    }
    setProperty((prev) => ({
      ...prev,
      id: result.id,
      name: result.name,
      location: result.location,
      description: result.description,
      price: result.price,
      longitude: result.longitude ? result.longitude : "",
      latitude: result.latitude ? result.latitude : "",
      rent: result.status === "rent",
      buy: result.status === "buy",
      imageName: result.imageName,
    }));
    setIsLoaded(true)
  };

  const markerIcon = new Icon({
    iconUrl: "./../../../src/assets/location.png",
    iconSize: [45, 90],
  });

  return (
    <div className="drawer max-w-[100vw] lg:drawer-open">
      <input type="checkbox" id="drawer" className="drawer-toggle" />

      <div className="drawer-content">
        <Navbar />
        <div className="max-w-[100vw] relative bg-gray-100">
          {!isLoaded  ?
          (
            <div className="flex container mx-auto flex-wrap flex-col gap-7">
            <div className="grow skeleton h-150 w-full"></div>
            <div className="grow skeleton h-4 w-28"></div>
            <div className="grow skeleton h-4 w-full"></div>
            <div className="grow skeleton h-4 w-full"></div>
            <div className="grow skeleton h-4 w-full"></div>
            <div className="grow skeleton h-4 w-full"></div>
          </div>

        
          )
          : (
            
          <div className="container mx-auto p-4">
            <div className="card  bg-base-100 shadow-xl">
              <figure>
                <img
                  src={property.imageName}
                  alt={property.name}
                  className="w-full h-160 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">
                  {property.name}
                </h2>
                <p className="text-gray-500">{property.location}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <span className="badge badge-outline">
                    {property.type.name}
                  </span>
                </div>
                <p className="text-lg font-semibold text-primary mt-4">
                  {property.price}
                </p>
                <p className="mt-4">{property.description}</p>
                <div className="divider"></div>
                <div className="flex items-center space-x-4">
                  {/* <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src={property.agent.avatar} alt={property.agent.name} />
                  </div>
                </div>
                <div>
                  <p className="font-bold">{property.agent.name}</p>
                  <p className="text-sm text-gray-500">{property.agent.email}</p>
                </div> */}
                </div>
                <div className="card-actions mt-6">
                  {property.status === "rent" ? (
                    <>
                    <button 
                    onClick={() => {
                      (
                        document.getElementById("create_post") as HTMLDialogElement
                      )?.showModal();
                    }}
                    className="btn btn-outline btn-md btn-success">Rent</button>
                    <dialog id="create_post" className="modal w-full h-full ">
            <div className="modal-box w-full lg:w-3/5 h-[200px] bg-white flex flex-col gap-5 ">
              <div className="modal-title text-xl text-center font-bold">
                  Confirm Rent
              </div>
              <div className="modal-body text-lg ">
                Do you want to rent this property?
              </div>
              <div className="modal-actions text-right">
                <form method="dialog">
                  <button onClick={handleRentClick} className="btn btn-primary btn-lg">Rent</button>
                </form>
              </div>
            </div>
          </dialog>
                    </>
                  ):(
                    <>
                    <button 
                    onClick={() => {
                      (
                        document.getElementById("buy") as HTMLDialogElement
                      )?.showModal();
                    }}
                    className="btn btn-outline btn-md btn-primary">Buy</button>
                    <dialog id="buy" className="modal w-full h-full ">
            <div className="modal-box w-full lg:w-3/5 h-[200px] bg-white flex flex-col gap-5 ">
              <div className="modal-title text-xl text-center font-bold">
                  Confirm Buy
              </div>
              <div className="modal-body text-lg ">
                Do you want to Buy this property?
              </div>
              <div className="modal-actions text-right">
                <form method="dialog">
                  <button onClick={handleRentClick} className="btn btn-primary btn-lg">Rent</button>
                </form>
              </div>
            </div>
          </dialog>
                        </>
                  )}
                  <button 
                  onClick={() => {
                    (
                      document.getElementById("sched") as HTMLDialogElement
                    )?.showModal();
                  }}
                  className="btn btn-outline btn-accent">
                    Schedule Visit
                  </button>
                  <dialog id="sched" className="modal w-full h-full ">
            <div className="modal-box w-full lg:w-3/5 h-6/7 bg-white flex flex-col gap-5 ">
              
            </div>
          </dialog>
                </div>
                <div className="divider"></div>
                <MapContainer
                  center={[+property.latitude!, +property.longitude!]}
                  zoom={17}
                  style={{ height: "70vh" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  <Marker
                    position={[+property.latitude!, +property.longitude!]}
                    icon={markerIcon}
                  ></Marker>
                </MapContainer>
              </div>
            </div>
          </div>
          )}
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

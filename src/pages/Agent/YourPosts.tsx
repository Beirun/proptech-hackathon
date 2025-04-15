import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LeafletMouseEvent } from "leaflet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
interface PostData {
  id?: number;
  image: File | null;
  title: string;
  address: string;
  description: string;
  amount: string;
  longitude : string;
  latitude : string;
  rent : boolean;
  buy : boolean;
  imageName: string;
}
    
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
}

const YourPosts = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [postData, setPostData] = useState<PostData>({
    image: null,
    title: "",
    address: "",
    description: "",
    amount: "",
    longitude : "",
    latitude: "",
    rent: false,
    buy: false,
    imageName: ""
  });
  const [modalFunction, setModalFunction] = useState<"create"|"edit">("create");

  // i have no idea what i'm doing
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
    console.log("properties",result)
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

  const buttonClicked = (action: string) => {
    if (action === "create") {
      setModalFunction("create");
    } else if (action === "edit") {
      setModalFunction("edit");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        setPostData((prevData) => ({
          ...prevData,
          image: files[0],
        }));
      }
    } else {
      setPostData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddressChange = (    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostData((prev)=>({...prev}))
  }

  const handleSubmitPost: React.MouseEventHandler = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    let imageName: string|undefined = undefined;
    // upload image
    if (!postData.image) {
      alert("Image missing");
    }
    else {
      const formData = new FormData();
      formData.append("files", postData.image);
      const fileResponse = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!fileResponse.ok) {
        alert("Image upload failed");
      }

      const fileNames = (await fileResponse.json()) as string[];
      imageName = fileNames[0];
    };

    const body = {
      name: postData.title,
      location: postData.address,
      price: parseInt(postData.amount),
      imageName: postData.image ? imageName : postData.imageName,
      latitude: postData.latitude,
      longitude: postData.longitude,
      description: postData.description,
      typeId: 3, //temporary
      status: "rent", // <temporary></temporary>
    };
    console.log("token", token)
    console.log(body);

    // create property
    const response = await fetch( modalFunction === "edit" ? `/api/properties/${postData.id}` : "/api/properties", {
      method: modalFunction === "edit" ? "PUT" : "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });

    
    // console.log(response.);

    if (!response.ok) {
      alert("Post failed");
      return;
    }

    alert("Post success");
    fetchPostData();
  };




  const handleMapClick = (e : LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    console.log(lat, lng);
    setPostData((postData) => ({ ...postData, latitude: lat.toString(), longitude: lng.toString() }));

    
  };

  interface MapEventsHandlerProps {
    handleMapClick: (e: LeafletMouseEvent) => void;
  }

  const markerIcon = new Icon({
    iconUrl: "./../../../src/assets/location.png",
    iconSize: [45, 90],
  });
  const MapEventsHandler = ({ handleMapClick } : MapEventsHandlerProps) => {
    useMapEvents({
      click: (e : any) => handleMapClick(e),
    });
    return null;
  };

  const clearPost = () => {
    setPostData({
      imageName: "",
      image: null,
      title: "",
      address: "",
      description: "",
      amount: "",
      longitude : "",
      latitude: "",
      rent: false,
      buy: false
    });
  }

  const handleEdit = async (propertyId: number) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    const response = await fetch(`/api/properties/${propertyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if(!response.ok) {
      alert("Failed to fetch property.")
      return;
    }

    const result = (await response.json()) as Property;
    setPostData((prev) => ({
      ...prev,
      id: result.id,
      title: result.name,
      address: result.location,
      description: result.description,
      amount: result.price.toString(),
      longitude : result.longitude ? result.longitude : "",
      latitude: result.latitude ? result.latitude : "",
      rent: result.status === "rent",
      buy: result.status === "buy",
      imageName: result.imageName
    }))
  }

  const handleDelete = async (propertyId: number) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    const response = await fetch(`/api/properties/${propertyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if(!response.ok) {
      alert("Failed to fetch property.")
      return;
    }

    alert("Delete success");
    fetchPostData();
  } 

  return (
    <div className="drawer max-w-[100vw] lg:drawer-open ">
      <input type="checkbox" id="drawer" className="drawer-toggle" />
      
      <div className="drawer-content">
        <Navbar />
        
        <div className="max-w-[100vw] relative ">
          <div className="w-full flex px-5 pt-2 lg:px-20 flex-row justify-between ">
            <h1 className="text-2xl font-bold">Your Posts</h1>
            <button
              className="btn h-10 bg-primary rounded-lg font-bold flex justify-center items-center gap-2"
              onClick={() => {
                buttonClicked("create");
                (
                  document.getElementById("create_post") as HTMLDialogElement
                )?.showModal();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Create Post
            </button>
          </div>

          {/*ADD POST MODAL */}
          <dialog id="create_post" className="modal w-full h-full ">
            <div className="modal-box w-full lg:w-3/5 h-6/7 bg-white flex flex-col gap-5 ">
              <h3 className="font-bold text-lg pb-5 border-b-2 border-gray-300">
                {modalFunction}
              </h3>
              <p>Select Image</p>
              <input
                type="file"
                id="file"
                name="file"
                className="file-input w-full required focus:outline-none"
                onChange={handleInputChange}
              />
              <p>Title</p>
              <input
                type="text"
                id="title"
                name="title"
                className="input w-full required focus:outline-none"
                value={postData.title}
                onChange={handleInputChange}
              />
              <p>Address</p>
              <input
                type="text"
                id="address"
                name="address"
                className="input disabled w-full required focus:outline-none"
                value={postData.address}
                onClick={()=> {
                    (
                        document.getElementById("open_geo") as HTMLDialogElement
                      )?.showModal();
                }}
                onChange={handleAddressChange}
              />
              <p>Description</p>
              <textarea
                id="description"
                name="description"
                className="input w-full h-1/4 required focus:outline-none text-top p-2 overflow-y-auto"
                value={postData.description}
                onChange={handleInputChange}
              />
              <p>Amount (PHP)</p>
              <input
                type="text"
                id="amount"
                name="amount"
                className="input w-full required focus:outline-none"
                value={postData.amount}
                onChange={handleInputChange}
              />
              <div className="w-full flex gap-5 justify-center">
                <div className=" flex gap-5 justify-end">
                  <p>Rent</p>
                  <input type="checkbox" onClick={()=> (setPostData((prev)=>({...prev, rent : !prev.rent})))}/>
                </div>
                and/or
                <div className="flex gap-5 justify-end">
                  <p>Buy</p>
                  <input type="checkbox" onClick={()=> (setPostData((prev)=>({...prev, buy : !prev.buy})))}/>
                </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn bg-secondary" onClick={() => clearPost()} >Discard</button>
                </form>
                <button onClick={handleSubmitPost} className="btn bg-primary">
                  Post
                </button>
              </div>
            </div>
          </dialog>

          <dialog id="open_geo" className="modal" onClose={async()=> {
            const newLocation = async (latitude : string, longitude : string) => {
                try {
                    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    return data;
            
                  } catch (error) {
                    console.error('Error fetching address:', error);
                  }
            }
            const data = await newLocation(postData.latitude, postData.longitude); 
            const display = data.display_name.split(', ')
            console.log("display",display)
            const location = display.join(", ");
            setPostData((prev) => ({...prev, address : location})) 
          }}>
          <div className="modal-box w-full lg:w-11/12 lg:max-w-[70vw] h-6/7 bg-white flex flex-col justify-center ">
          <div className="text-xl font-semibold text-center pb-2">PINPOINT LOCATION</div>
          <MapContainer
            center={[10.296939927155103, 123.89691254931093]}
            zoom={15}
            style={{ height: "calc(79.252vh - 6px)" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {postData.latitude && postData.longitude && (
              <Marker
                position={[+postData.latitude, +postData.longitude]}
                icon={markerIcon}
              ></Marker>
            )}
            <MapEventsHandler handleMapClick={handleMapClick} />
          </MapContainer>
          <div className=" text-right pt-2">
            <form method="dialog">

            <button className="btn btn-secondary px-10">Select</button>
            </form>
            </div>

          </div>
          </dialog>
        </div>
        <div className="w-full p-4 gap-4 flex flex-wrap mt-5 justify-center">
          {properties.length === 0
              ? [...Array(10).keys()].map(() => (
                  <div className="flex w-[350px] min-w-[250px] flex-wrap flex-col gap-7">
                    <div className="grow skeleton h-50 w-full"></div>
                    <div className="grow skeleton h-4 w-28"></div>
                    <div className="grow skeleton h-4 w-full"></div>
                    <div className="grow skeleton h-4 w-full"></div>
                  </div>
                ))
              :
            properties.map((property) => {
              return (
                <div
                  key={property.id}
                  className="card max-w-[350px] border-2 border-gray-300  p-2"
                >
                  <figure>
                    {/* <img src={`/api/files/${property.imageName}`} alt="" /> */}
                    <img src={property.imageName}  alt="" className="h-70 object-cover" />
                    {/* <img src={resizedImageUrl as string} alt="" /> */}
                  </figure>
                  <div className="card-body">
                    <div className="card-title text-2xl font-bold">
                      {property.name}
                    </div>
                    <p className="text-md">{property.description}</p>
                    <p className="text-lg">{property.location}</p>
                    <p className="text-lg">${property.price}</p>
                    <p className={` ${property.status === "rent" ? "text-primary" : "text-error" } text-lg`}>
                      {property.status === "rent" ? "For Rent" : "For Sale" }
                    </p> 
                    <div className="card-actions w-full justify-end">
                      <button
                        className="btn bg-primary text-lg px-5"
                        onClick={() => { 
                          handleEdit(property.id);
                          buttonClicked("edit");
                          (
                            document.getElementById(
                              "create_post"
                            ) as HTMLDialogElement
                          )?.showModal();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                        Edit
                      </button>
                      <button className="btn bg-secondary text-lg px-5" onClick={() => handleDelete(property.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );  
            })}
        </div>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default YourPosts;

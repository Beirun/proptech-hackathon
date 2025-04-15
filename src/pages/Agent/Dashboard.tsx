import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LeafletMouseEvent } from "leaflet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
interface PostData {
  image: File | null;
  title: string;
  address: string;
  description: string;
  amount: string;
  lng : string;
  lat : string;
  rent : boolean;
  buy : boolean;
}
    
interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  status: string;
  imageName: string;
}

const Dashboard = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [postData, setPostData] = useState<PostData>({
    image: null,
    title: "",
    address: "",
    description: "",
    amount: "",
    lng : "",
    lat: "",
    rent: false,
    buy: false
  });
  const [modalFunction, setModalFunction] = useState("");
 const [isLoaded, setIsLoaded] = useState(false);
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
    setIsLoaded(true);
  };

  const buttonClicked = (action: string) => {
    if (action === "create") {
      setModalFunction("Create Post");
    } else if (action === "edit") {
      setModalFunction("Edit Post");
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

    // upload image
    if (!postData.image) {
      alert("Image missing");
      return;
    }

    const formData = new FormData();
    formData.append("files", postData.image);
    const fileResponse = await fetch("/api/files", {
      method: "POST",
      body: formData,
    });

    if (!fileResponse.ok) {
      alert("Image upload failed");
      return;
    }

    const fileNames = (await fileResponse.json()) as string[];
    const imageName = fileNames[0];

    // create property
    const response = await fetch("/api/properties", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: postData.title,
        location: postData.address,
        price: postData.amount,
        imageName: imageName,
        typeId: 3, //temporary
        status: "rent", // temporary
      }),
    });

    if (!response.ok) {
      alert("Post failed");
      return;
    }

    alert("Post success");
  };


  const agent = {
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    avatar: 'https://i.pravatar.cc/100?img=5',
  };

  const stats = [
    { label: 'Total Listings', value: 24 },
    { label: 'Properties Sold', value: 8 },
    { label: 'Properties Rented', value: 12 },
  ];

  const properties2 = [
    {
      id: 1,
      title: 'Modern 3-Bedroom Condo',
      address: '123 Mango Ave, Cebu City',
      price: '₱8,500,000',
      type: 'For Sale',
      image: 'https://via.placeholder.com/400x200',
    },
    {
      id: 2,
      title: 'Cozy Studio Apartment',
      address: '456 Banilad St, Cebu City',
      price: '₱15,000/month',
      type: 'For Rent',
      image: 'https://via.placeholder.com/400x200',
    },
    // Add more properties as needed
  ];

  const handleMapClick = (e : LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setPostData((postData) => ({ ...postData, lat: lat.toString(), lng: lng.toString() }));
    
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

  return (
    <div className="drawer max-w-[100vw] lg:drawer-open ">
      <input type="checkbox" id="drawer" className="drawer-toggle" />
      
      <div className="drawer-content">
        <Navbar />
        
        <div className="max-w-[100vw] relative ">
        {!isLoaded ?(
            <>
            <div className="flex gap-10 justify-center">

            {[...Array(2).keys()].map(() => (
              <div className="flex w-[45%] min-w-[250px] flex-wrap gap-4">
                <div className="grow skeleton h-80 w-full"></div>
                <div className="grow skeleton h-4 w-28"></div>
                <div className="grow skeleton h-4 w-full"></div>
                <div className="grow skeleton h-4 w-full"></div>
                <div className="grow skeleton h-4 w-full"></div>
                <div className="grow skeleton h-4 w-full"></div>
              </div>
            ))}
            
            </div>
            <div className="flex justify-center">

            <div className="flex w-[95%] min-w-[250px] flex-wrap gap-4 pt-10">
                <div className="grow skeleton h-50 w-full"></div>
                <div className="grow skeleton h-4 w-28"></div>
                <div className="grow skeleton h-4 w-full"></div>
                <div className="grow skeleton h-4 w-full"></div>
                <div className="grow skeleton h-4 w-full"></div>
              </div>
            </div>
            </>
          ) :(
        <div className="container mx-auto p-4">
      {/* Agent Profile */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={agent.avatar} alt={agent.name} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">{agent.name}</h2>
          <p className="text-gray-500">{agent.email}</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="text-lg font-semibold">{stat.label}</h3>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Property Listings */}
      <h3 className="text-xl font-bold mb-4">Your Listings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {properties.slice(properties.length - 2,properties.length).map((property) => (
          <div key={property.id} className="card bg-base-100 shadow-md">
            <figure>
              <img src={property.imageName} alt={property.name} className="w-full h-80 object-cover" />
            </figure>
            <div className="card-body">
              <h4 className="card-title">{property.name}</h4>
              <p className="text-gray-500">{property.location}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="badge badge-outline">{property.status}</span>
                <span className="text-primary font-semibold">{property.price}</span>
              </div>
              {/* <div className="card-actions mt-4">
                <button className="btn btn-sm btn-outline btn-primary">Edit</button>
                <button className="btn btn-sm btn-outline btn-error">Delete</button>
              </div> */}
            </div>
          </div>
        ))}
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

export default Dashboard;

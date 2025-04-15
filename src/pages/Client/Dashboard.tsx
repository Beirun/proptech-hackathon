import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
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

const Dashboard = () => {
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

  const [property2, setProperty2] = useState<Property>({
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

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

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
      const response1 = await fetch(`/api/properties/16`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response1.ok) {
        alert("Failed to fetch property 1.");
        return;
      }

      const result1 = (await response1.json()) as Property;

      try {
        const resizedImageUrl = await resizeFile(`/api/files/${result1.imageName}`);
        result1.imageName = resizedImageUrl as string;
      } catch (error) {
        console.error("Error resizing image:", error);
      }

      setProperty(result1);

      const response2 = await fetch(`/api/properties/13`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response2.ok) {
        alert("Failed to fetch property 2.");
        return;
      }

      const result2 = (await response2.json()) as Property;

      try {
        const resizedImageUrl = await resizeFile(`/api/files/${result2.imageName}`);
        result2.imageName = resizedImageUrl as string;
      } catch (error) {
        console.error("Error resizing image:", error);
      }
      setProperty2(result2);
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setIsLoaded(true);
  };

  const client = {
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    avatar: "https://i.pravatar.cc/100?img=12",
  };

  const scheduledVisits = [
    {
      id: 1,
      propertyTitle: "Modern 3-Bedroom Condo",
      date: "April 20, 2025",
      time: "10:00 AM",
      agent: "Maria Santos",
    },
    {
      id: 2,
      propertyTitle: "Cozy Studio Apartment",
      date: "April 22, 2025",
      time: "2:00 PM",
      agent: "Carlos Reyes",
    },
  ];

  const recentInteractions = [
    {
      id: 1,
      message: "Your request to schedule a visit has been confirmed.",
      date: "April 14, 2025",
    },
    {
      id: 2,
      message: "New property matching your preferences has been added.",
      date: "April 13, 2025",
    },
  ];

  return (
    <div className="drawer w-screen lg:drawer-open mx-auto">
      <input type="checkbox" id="drawer" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
        <div className="max-w-[100vw] relative px-5 lg:px-20 flex flex-col justify-center">
          {!isLoaded ?(
            <>
            <div className="flex gap-10">

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
            <div className="flex w-[95%] min-w-[250px] flex-wrap gap-4 pt-10">
                <div className="grow skeleton h-50 w-full"></div>
                <div className="grow skeleton h-4 w-28"></div>
                <div className="grow skeleton h-4 w-full"></div>
                <div className="grow skeleton h-4 w-full"></div>
                <div className="grow skeleton h-4 w-full"></div>
              </div>
            </>
          ) :(
            
          <div className="container mx-auto p-4">
            {/* Client Profile */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={client.avatar} alt={client.name} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">{client.name}</h2>
                <p className="text-gray-500">{client.email}</p>
              </div>
            </div>

            {/* Recommended Properties */}
            <h3 className="text-xl font-bold mb-4">Recommended Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[property, property2].map((property) => (
                <div key={property.id} className="card bg-base-100 shadow-md">
                  <figure>
                    <img
                      src={property.imageName}
                      alt={property.name}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h4 className="card-title">{property.name}</h4>
                    <p className="text-gray-500">{property.location}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="badge badge-outline">{property.type.name}</span>
                      <span className="text-primary font-semibold">
                        ₱{property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="card-actions mt-4">
                      <button className="btn btn-sm btn-outline btn-primary">View Property Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scheduled Visits */}
            <h3 className="text-xl font-bold mb-4">Scheduled Visits</h3>
            <div className="overflow-x-auto mb-6">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledVisits.map((visit) => (
                    <tr key={visit.id}>
                      <td>{visit.propertyTitle}</td>
                      <td>{visit.date}</td>
                      <td>{visit.time}</td>
                      <td>{visit.agent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Interactions */}
            <h3 className="text-xl font-bold mb-4">Recent Interactions</h3>
            <ul className="list-disc list-inside">
              {recentInteractions.map((interaction) => (
                <li key={interaction.id}>
                  <span className="font-semibold">{interaction.date}:</span> {interaction.message}
                </li>
              ))}
            </ul>
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

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const History = () => {
  const [history, setHistory] = useState<{
    name: string;
    description: string;
    client: {
      id: number;
      fname: string;
      lname: string;
    },
    amount: string;
    status: "rented" | "purchased"
  }[]>([]);

  const fetchHistory = async () => {
    const token = await sessionStorage.getItem("token");
    if(!token) {
      alert("Missing token!");
      return;
    }

    const rentResponse = await fetch("/api/history/rent", { 
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const purchaseResponse = await fetch("/api/history/purchase", { 
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if(!rentResponse.ok && !purchaseResponse.ok) {
      alert("Failed to fetch history!");
      return;
    }

    const rents = (await rentResponse.json()) as {
      name: string,
      description: string,
      paidAt: Date,
      client: {
          id: number,
          fname: string,
          lname: string
      },
      amount: string
    }[];
    const purchases = (await purchaseResponse.json()) as {
      name: string,
      description: string,
      paidAt: Date,
      client: {
          id: number,
          fname: string,
          lname: string
      },
      amount: string
    }[];

    rents.forEach((rent) => {
      setHistory((prev) => [...prev, {...rent, status: "rented"}]) 
    });
    purchases.forEach((purchase) => {
      setHistory((prev) => [...prev, {...purchase, status: "purchased"}])
    });
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (

    <div className="drawer max-w-[100vw] lg:drawer-open ">
      <input type="checkbox" id="drawer" className="drawer-toggle" />

      <div className="drawer-content">
        <Navbar />

        <div className="max-w-[100vw] relative px-20 flex flex-col justify-center">
          <div className="w-full flex flex-row justify-between ">
            <h1 className="text-2xl font-bold">Your History</h1>
            <div className="flex flex-row gap-5 w-1/3">

            <input type="text" className="input focus:outline-none w-full" placeholder="Search" />
            <button className="btn rounded-lg bg-primary font-bold" >Go</button>
            </div>
          </div>

        </div>
        <div className="w-full p-4 gap-4 flex flex-wrap mt-5 justify-center">
        {history.map((item)=>(

          <div className="card max-w-[350px]  border-2 border-gray-300  rounded-2xl p-2">
            <figure>
              <img src="src/assets/sacred-heart-center.jpg" alt="" />
            </figure>
            <div className="card-body">
              <div className="card-title text-2xl font-bold">{item.name}</div>
              <p className="text-sm">Name</p>
              <p className="text-lg"></p>
              <p className="text-lg">{item.description}</p>
              <p className="text-lg">₱{item.amount}</p>
              <p className="text-lg">
                { item.status === "rented" ? "Rented by: " : "Purchased by: " }
                {item.client.fname} { item.client.lname }
              </p>
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

export default History;

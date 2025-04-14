import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState} from "react";
import Resizer from "react-image-file-resizer";
interface PostData {
  image: File | null;
  title: string;
  address: string;
  description: string;
  amount: string;
}

interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
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
  });
  const [modalFunction, setModalFunction] = useState("");


  // i have no idea what i'm doing
  useEffect(() => {
    fetchPostData();
  }, []);

//   const resizeFile = (file : Blob) =>
//     new Promise((resolve) => {
//       Resizer.imageFileResizer(
//         file,
//         450,
//         300,
//         "JPEG",
//         100,
//         0,
//         (uri) => {
//           resolve(uri);
//         },
//         "base64"
//       );
//     });
  const fetchPostData = async () => {
    const token = sessionStorage.getItem("token");
    if(!token) {
      console.log("Missing token!");
      return;
    }

    const response = await fetch("/api/properties", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if(!response.ok) {
      console.log("Fetching failed")
      return;
    }

    const result = await response.json() as Property[];
    setProperties(result);
  }

  const buttonClicked = (action: string) => {
    if(action === "create"){
      setModalFunction("Create Post");
    }
    else if(action === "edit"){
      setModalFunction("Edit Post");
    }
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmitPost: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    
    const token = sessionStorage.getItem("token");
    if(!token) {
      alert("Please log in first.");
      return;
    }

    // upload image
    if (!postData.image) {
      alert("Image missing")
      return;
    }

    const formData = new FormData();
    formData.append("files", postData.image)
    const fileResponse = await fetch("/api/files", {
      method: "POST",
      body: formData
    });
    
    if (!fileResponse.ok) {
      alert("Image upload failed")
      return;
    }

    const fileNames = await fileResponse.json() as string[];
    const imageName = fileNames[0];

    // create property
    const response = await fetch("/api/properties", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: postData.title,
        location: postData.address,
        price: postData.amount,
        imageName: imageName,
        typeId: 3, //temporary
        status: "rent" // temporary
      })
    });

    if (!response.ok) {
      alert("Post failed")
      return;
    }

    alert("Post success")
  };

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
                (document.getElementById("create_post") as HTMLDialogElement)?.showModal()
              }
              }
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
            <div className="modal-box w-3/5 h-6/7 bg-white flex flex-col gap-5 ">
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
                className="input w-full required focus:outline-none"
                value={postData.address}
                onChange={handleInputChange}
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
              <input type="checkbox"/>
              </div>
              and/or
              <div className="flex gap-5 justify-end">

              <p>Buy</p>
              <input type="checkbox" />
              </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn bg-secondary">Discard</button>
                </form>
                <button onClick={handleSubmitPost} className="btn bg-primary">Post</button>
              </div>
            </div>
          </dialog>
        </div>
        <div className="w-full p-4 gap-4 flex flex-wrap mt-5 justify-center">
          {properties.length > 0 && properties.map( (property) => {
            // const resizeFile = (file : Blob) =>
            //         new Promise((resolve) => {
            //           Resizer.imageFileResizer(
            //             file,
            //             450,
            //             300,
            //             "JPEG",
            //             100,
            //             0,
            //             (uri) => {
            //               resolve(uri);
            //             },
            //             "base64"
            //           );
            //         });
            const resizeFile = (imageUrl: string) =>
              fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                  return new Promise((resolve) => {
                    Resizer.imageFileResizer(
                      blob,
                      450,
                      200,
                      "JPEG",
                      100,
                      0,
                      (uri) => {
                        resolve(uri);
                      },
                      "base64"
                    );
                  });
                });
                let resizedImage :string = "";
                resizeFile(`/api/files/${property.imageName}`)
                .then((resizedImageUrl : any) => {
                    resizedImage = resizedImageUrl;
                    console.log(resizedImage);
                });
                console.log("re", resizedImage)
            // const resizedImageUrl : any = resizeFile(`/api/files/${property.imageName}`);
            // console.log(resizedImageUrl)
            return(
                <div key={property.id} className="card max-w-[350px] border-2 border-gray-300  p-2">
              <figure>
                <img src={`/api/files/${property.imageName}`} alt="" />
                {/* <img src={resizedImage} alt="" /> */}
              </figure>
              <div className="card-body">
                <div className="card-title text-2xl font-bold">{property.name}</div>
                <p className="text-lg">{property.location}</p>
                <p className="text-lg">${property.price}</p>
                <div className="card-actions w-full justify-end">
                  <button className="btn bg-primary text-lg px-5"
                    onClick={() => {
                      buttonClicked("edit");
                      (document.getElementById("create_post") as HTMLDialogElement)?.showModal()
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
                  <button className="btn bg-secondary text-lg px-5">
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
          )})}
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


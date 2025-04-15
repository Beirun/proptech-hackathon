import React from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  id : number
  title: string;
  propertyType: string;
  image: string;
  location: string;
  owner: string;
  price: string;
  index: number;
  max: number;
  description: string;
};
const PropertyCard: React.FC<Props> = ({
  id,
  title,
  propertyType,
  image,
  location,
  owner,
  price,
  index,
  max,
  description
}) => {
  const navigate = useNavigate();
  return (
    <div className={`card max-w-[350px] bg-base-100 shadow-sm card-md  ${index === max-1 ? "grow-0 lg:grow-0" : "lg:grow"}`}>
      <figure className="h-50  lg:h-70 ">
        <img
          src={image}
          alt="photo"
          className="h-70 object-cover" 
          //   className="size-10 object-cover"
        />
        {/* <div  style={{ backgroundImage: `url(${image})` }} className={`bg-cover w-100 h-100`} /> */}
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{title} | P {price}</h2>
        <p>{propertyType} | {location}</p>
        <p>{owner}</p>
        <p>{description}</p>
        <div className="card-actions justify-end ">
          <button onClick={() => navigate(`/properties/${id}`)} className="btn btn-primary">View Property</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

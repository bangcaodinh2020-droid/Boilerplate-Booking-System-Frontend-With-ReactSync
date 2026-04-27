import { useNavigate } from "react-router-dom";
import { useChannel } from "@bangcao2020/reactsync";
import { useState } from "react";
export const IncludedAccommodationItem = (props: any) => {
  const [selectedAccommodation, setSelectedAccommodation ] = useChannel("selectedAccommodation", {});
  const [isSelected, setIsSelected] = useState(false);
  const [isMobile,] = useChannel("isMobile", false);
  const navigate = useNavigate();

  const onMoreBtnClick = (id:string) => {
     
     setSelectedAccommodation(props.accommodationDetail);
     navigate("/accommodationdetail");
     
  };

  const onAccommodationSelected = (accommodationDetail:any)=>{
         setSelectedAccommodation({...accommodationDetail});
         setIsSelected(true);
          //console.log(newAccommodation);
  }


  return (
    <div className={"row m-2 rounded-1 border border-primary p-2 " }>
       <div className={"row "} onClick={()=>{onAccommodationSelected(props.accommodationDetail)}}>
      <div className="col-5 col-md-2">
        <div className="rounded-1 border border-primary p-2" style={{width:100, height:100}}>
        <img
              className="rounded-2"
              src={`/images/${props.accommodationDetail.accommodation_id}_1.jpg`}
              alt={props.accommodationDetail.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        </div>
      </div>
      <div className="col-7 col-md-10">
      <div className="row">Start date: {props.accommodationDetail.start_date}</div>
       <div className="row">End_date: {props.accommodationDetail.end_date}</div>
       <div className="row">Number of guest: {props.accommodationDetail.number_of_guests}</div>
       
      <div className="row">Cabin: {(props.accommodationDetail.Accommodation !== undefined)? props.accommodationDetail.Accommodation.name: props.accommodationDetail.name}</div>
       <div className="row">Type: {(props.accommodationDetail.Accommodation !== undefined)? props.accommodationDetail.Accommodation.type: props.accommodationDetail.type}</div>
       <div className="row">Beds: {(props.accommodationDetail.Accommodation !== undefined)? props.accommodationDetail.Accommodation.capacity: props.accommodationDetail.capacity}</div>
       <div className="row">Price: {(props.accommodationDetail.Accommodation !== undefined)? props.accommodationDetail.Accommodation.price_per_night:props.accommodationDetail.price_per_night}</div>
       <div className="row">Description: {(props.accommodationDetail.Accommodation !== undefined)? props.accommodationDetail.Accommodation.description: props.accommodationDetail.description}</div>
        </div>
   
      </div>
    </div>
  );
};
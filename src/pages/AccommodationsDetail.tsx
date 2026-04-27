import { useChannel } from "@bangcao2020/reactsync";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useEffect } from "react";
import { accommodations } from "../mockData";
import { AccommodationItem } from "../components/AccommodationItem";
import accommodationService from "../services/AccommodationService";
import AuthService from "../services/AuthService";

export default function AccommodationsDetail(props: any) {
  const [newAccommodation, setNewAccommodation] = useChannel("newAccommodation", {});
  const [selectedAccommodation, setSelectedAccommodation] = useChannel("selectedAccommodation", {});
  const [accommodationDetail, setAccommodationDetail] = useChannel("accommodationDetail", {});
  
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(()=>{
    
    console.log(selectedAccommodation);
    
    //if(selectedAccommodation!= undefined && selectedAccommodation.accommodation_id != undefined)
    if(id != undefined)
    accommodationService.fetchOne(parseInt(id)).then(result=>{
        console.log(result);
        //setAccommodationDetail(result.data.data);
        const data = result.data.data;
        data.images=[""+ id + "_1.jpg", ""+ id + "_2.jpg", ""+ id + "_3.jpg"];
        setAccommodationDetail(data);
    });
  
  },[selectedAccommodation]);
  const onBackBtnClick = () => {
        navigate("/accommodations");
        
  };
  

   const onBookBtnClick = () => {
    if(AuthService.isLogined())
    {
      setNewAccommodation({});
      setSelectedAccommodation(props.accommodation);
      navigate("/newbooking/" + props.accommodation.accommodation_id );
    }
    else 
    {
      navigate("/login");
    }
    
    
  };
  return (
      <MainLayout>
        <div  className="row p-5">
          <div className="row">Cabin: {accommodationDetail.name}</div>
          
          {
          (accommodationDetail.images !== undefined) && accommodationDetail.images.map((image: any, index: number)=>{
            return <div key={index} className="col-3 rounded-1 border border-primary p-2" style={{width:128, height:128}}>
              <img src={"/images/"+ image} width={100} height={100}/>
            
            </div>
          })
          }
          <div className="row">
          <div className="col-6">
          <div className="row">Type: {accommodationDetail.type}</div>
          <div className="row">Beds: {accommodationDetail.capacity}</div>
          <div className="row">Price: {accommodationDetail.price_per_night}</div>
          <div className="row">Description: {accommodationDetail.description}</div>
          </div>
          <div className="col-6">
            <ul>
             {
          (accommodationDetail.Amenities !== undefined) && accommodationDetail.Amenities.map((amenty: any, index: number)=>{
            return <li key={index} className="row">-{amenty.amenity_name}</li>
          })
          }
          </ul>
          </div>
          </div>
    
          <div className="row">
          
          <div className="col-6">
          <button className="rounded-1 bg-primary text-light m-2" onClick={onBackBtnClick}>Back</button>
          </div>
          <div className="col-6">
          <button className="rounded-1 bg-primary text-light m-2" onClick={()=>{onBookBtnClick()}}>Book</button>
          </div>
          </div>
      </div>
     </MainLayout>
     
  
  )
}

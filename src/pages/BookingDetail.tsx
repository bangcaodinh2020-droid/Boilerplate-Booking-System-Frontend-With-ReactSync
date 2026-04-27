import { useChannel } from "@bangcao2020/reactsync";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState} from "react";
//import { accommodations } from "../mockData";
import { IncludedAccommodationItem } from "../components/IncludedAccommodationItem";
import bookingService from "../services/BookingService";

export default function BookingDetail(props: any) {
  const [selectedBooking, setSelectedBooking] = useChannel("selectedBooking", "");
  
  const [selectedBookingDetail, setSelectedBookingDetail] = useState(selectedBooking);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    
    if(id != undefined)
    bookingService.fetchOne(parseInt(id)).then((result)=>{
        console.log(result.data.data);
        setSelectedBookingDetail(result.data.data);
    });
  },[selectedBooking]);

  const onBackBtnClick = () => {
        navigate("/bookings");
        
  };
  const onEditBtnClick = () => {
        navigate("/editbooking/"+ id);
        
  };
   const onCreateBtnClick = () => {
     
     setSelectedBooking({});
     navigate("/newbooking");
     
  };
  return (
      <MainLayout>
         <div className="container m-0">
            <div className="row justify-content-center m-0">
              <div className="col-12 col-md-2" >
                             <button className="rounded-1 bg-primary text-light" onClick={()=>onCreateBtnClick()}>New Booking</button>
              </div>
              <div className="col-12 col-md-8" >
                <div  className="row p-0">
                  <div  className="row">Booking #{selectedBookingDetail.booking_id}</div>
                  <div  className="row">User Id:{selectedBookingDetail.user_id}</div>
                  <div  className="row">Status:{selectedBookingDetail.status}</div>
                  <div  className="row">Total guest:{selectedBookingDetail.total_guests}</div>
                  <div  className="row">Create at:{selectedBookingDetail.created_at}</div>
                  <div  className="row">Start date:{selectedBookingDetail.start_date}</div>
                  <div  className="row">End date:{selectedBookingDetail.end_date}</div>
                  <div  className="row">Total price:{selectedBookingDetail.total_price}</div>

                  {selectedBookingDetail.BookingDetails !== undefined && selectedBookingDetail.BookingDetails.map((accommodation: any, index: number) => {
                                return <IncludedAccommodationItem accommodationDetail={accommodation} key={index}></IncludedAccommodationItem>
                              })}
                
                  <div className="row">
                    <div className="col-6">
                    <button className="rounded-1 bg-primary text-light m-2" onClick={onEditBtnClick}>Edit</button>
                    </div>
                    <div className="col-6">
                      <button className="rounded-1 bg-primary text-light m-2" onClick={onBackBtnClick}>Back</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2" ></div>
          </div>
      </div>
     </MainLayout>
     
  
  )
}

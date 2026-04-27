import { useNavigate } from "react-router-dom";
import { useChannel } from "@bangcao2020/reactsync";
import bookingService from "../services/BookingService";
import { useEffect } from "react";


export const BookingItem = (props: any) => {
  
  const [selectedBooking, setSelectedBooking] = useChannel("selectedBooking", "");
  const [bookings, setBookings] = useChannel("bookings", []);
  const [isMobile,] = useChannel("isMobile", false);
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(props);

  },[props])
  const onMoreBtnClick = (id:string) => {
     
     setSelectedBooking(props.booking);
     navigate("/bookingdetail/"+ id);
     
  };
  const onEditBtnClick = (id:string) => {
     //setNewAccommodation({});
     setSelectedBooking(props.booking);
     navigate("/editbooking/"+ id);
     
  };

  const onDeleteBtnClick=(booking:any)=>{
    // const rests = bookings.filter(( book: any) => { return book !== booking});
    //     console.log(bookings);
    //     console.log(rests)
      
      bookingService.deleteOne(booking.booking_id).then((result)=>{
        console.log(result);
        const rests = bookings.filter(( book: any) => { return book != booking});
        console.log(bookings);
        console.log(rests)
        setBookings(rests);
      })

   }

  

  return (
    <div className="row m-2 rounded-1 border border-primary p-2">
       <div className="col-12 col-md-10">
       <div className="row">
          <div className="col-4 col-md-2 p-2 me-3"
          style={{ width: 150, height: 150 }}
          >
            <img
                className="rounded-2"
                src={`/images/${props.booking.BookingDetails[0].accommodation_id}_1.jpg`}
                alt={props.booking.BookingDetails[0].Accommodation.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
          </div>
          <div className="col-6 col-md-8">
            <div className="row">Id: {props.booking.booking_id}</div>
            <div className="row">Date: {props.booking.user}</div>
            <div className="row">Guest: {props.booking.total_guests}</div>
            <div className="row">Price: {props.booking.price_per_night}</div>
            <div className="row">Description: {props.booking.description}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-2 ">
        <div className="row">
          
           
              <div className="col-4 col-md-12 ">
              <button className="btn btn-primary mb-2 w-100" onClick={()=>onEditBtnClick(props.booking.booking_id)}>Edit</button>
              </div>
            
           
              <div className="col-4 col-md-12">
              <button className="btn btn-primary mb-2 w-100" onClick={()=>onMoreBtnClick(props.booking.booking_id)}>Detail</button>
              </div>
           
           
              <div className="col-4 col-md-12 ">
              <button className="btn btn-primary mb-2 w-100" onClick={()=>onDeleteBtnClick(props.booking)}>Cancel</button>
              </div>
            
         
        </div>
      </div>
    </div>
  );
};
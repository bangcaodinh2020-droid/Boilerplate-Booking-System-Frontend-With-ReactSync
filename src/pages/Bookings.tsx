
import { useChannel } from "@bangcao2020/reactsync";
import { BookingItem } from "../components/BookingItem";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import bookingService from "../services/BookingService";
import AuthService from "../services/AuthService";
export default function Bookings(props: any) {
  const [bookings, setBookings] = useChannel("bookings", []);
 
  const [selectedBooking, setSelectedBooking] = useChannel("selectedBooking", "");
 
 
  const navigate = useNavigate();
  useEffect(()=>{
    
    const userData = AuthService.getCurrentUser();
    //if(isLogined)
    if(userData != null)
    bookingService.fetchAll().then(result=>{
          console.log(result.data);
          setBookings(result.data.data);
    });
  
    
  }, [])

  const onCreateBtnClick = () => {
     
     //setSelectedBooking(props.booking);
     if(AuthService.isLogined())
    {
      setSelectedBooking({});
      navigate("/newbooking");
    }
    else 
    {

      navigate("/login");
    }
    
     
  };



  
  return (
    
      <MainLayout>
        <div className="container m-0 p-0">
            <div className="row justify-content-center m-0 p-0">
           <div className="col-12 col-md-2" >
             <button className="rounded-1 bg-primary text-light" onClick={()=>onCreateBtnClick()}>New Booking</button>
           </div>
           <div className="col-12 col-md-8" >
            {
              bookings.map((booking: any, index: number) => {
                return <BookingItem booking={booking} key={index}></BookingItem>
              })
            }
          </div>
          <div className="col-12 col-md-2" >

          </div>

          </div>
          </div>
      </MainLayout>
   
  );
};
import { useChannel } from "@bangcao2020/reactsync";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { IncludedAccommodationItem } from "../components/IncludedAccommodationItem";
import bookingService from "../services/BookingService";
import accommodationService from "../services/AccommodationService";
export default function BookingEditor(props: any) {
 
  const [accommodations, setAccommodations] = useChannel("accommodations", []);
  const [newAccommodation, setNewAccommodation] = useChannel("newAccommodation", {});
  const [selectedAccommodation, setSelectedAccommodation ] = useChannel("selectedAccommodation", {});
  const [selectedBooking, setSelectedBooking] = useChannel("selectedBooking", "");
  const [bookings, setBookings] = useChannel("bookings", []);
  const [bookingDetails, setBookingDetails] = useState<any>([]);
  const [isMobile,] = useChannel("isMobile", false);
  const [isChanged, setIsChanged] = useState(false);
  const [addBtnDisable, setAddBtnDisable] = useState(true);
  
  const [numOptions, setNumOptions] = useState<number[]>([]);
  const [saveBtnDisable, setSaveBtnDisable] = useState(true);
  
  const navigate = useNavigate();

 useEffect(()=>{
        
        if(accommodations.length<=0)
        {
         accommodationService.fetchAll().then(result=>{
            console.log(result);
            setAccommodations(result.data.data);
         })
        }
        setBookingDetails(selectedBooking.BookingDetails);
        console.log(selectedAccommodation);
        if(selectedAccommodation!=undefined && selectedAccommodation.Accommodation != undefined)
        {
        const nums: number [] = range(selectedAccommodation.Accommodation.capacity);
         setNumOptions(nums);
        }
        console.log(selectedAccommodation);
        console.log(newAccommodation)
        setAddBtnDisable(selectedAccommodation.Accommodation == undefined);
        //const tmp = {...selectedAccommodation};
        //setNewAccommodation(tmp);


  }, [accommodations, selectedAccommodation])


  const onSaveBtnClick = () => {
        
        
        if(selectedBooking.booking_id == undefined)
        {
         selectedBooking.booking_id = bookings.length;
         const booking = {...selectedBooking}
         bookings.push(booking);
        }

        setBookings(bookings);
        //setSelectedBooking(newBooking);
        const newBooking = {...selectedBooking}
        newBooking.total_guests = 0;
        newBooking.BookingDetails.forEach((cabin: any)=>{
            if(cabin.number_of_guests != undefined)
            newBooking.total_guests += parseInt(cabin.number_of_guests);
            if(newBooking.start_date > cabin.start_date)
               newBooking.start_date = cabin.start_date;
            if(newBooking.end_date < cabin.end_date)
               newBooking.end_date = cabin.end_date;
        })
        setSelectedBooking(newBooking);
        
        console.log(newBooking);
        
        bookingService.updateOne(newBooking).then(result=>{
         console.log(result.data);
         const booking = result.data;
         setSelectedBooking(booking);
        
         navigate("/bookingdetail/"+ booking.booking_id);
        });
        
  };

  

  const onAddBtnClick = () => {
        if(!checkValid(newAccommodation))
         return;
      
        newAccommodation.id = (selectedBooking.accommodations != undefined && selectedBooking.accommodations.length >0) ? selectedBooking.accommodations.length : 0;
        const accommodation = {...newAccommodation}
        if((selectedBooking.BookingDetails != undefined && selectedBooking.BookingDetails.length >0))
        selectedBooking.BookingDetails.push(accommodation);
        else
        selectedBooking.BookingDetails = [accommodation];
      
        setBookingDetails(selectedBooking.BookingDetails);
        //setBookings(bookings);
        const booking = {...selectedBooking}
        setSelectedBooking(booking);
        
        setSaveBtnDisable(false);
        console.log(selectedBooking);
        
  };
  const checkValid=(newAccommodationForm:any)=>{
        console.log(newAccommodationForm);
        return (newAccommodationForm.accommodation_id != undefined 
         && newAccommodationForm.start_date != undefined
         && newAccommodationForm.end_date != undefined
         && newAccommodationForm.number_of_guests != undefined 
      )
  }
  const onUpdateBtnClick = () => {

        if(newAccommodation.number_of_guests != undefined)
         selectedAccommodation.number_of_guests = parseInt(newAccommodation.number_of_guests);
        if(newAccommodation.start_date != undefined)
         selectedAccommodation.start_date = newAccommodation.start_date;
        if(newAccommodation.end_date != undefined)
         selectedAccommodation.end_date = newAccommodation.end_date;
        setSelectedAccommodation({...selectedAccommodation});
        
        if(selectedBooking.booking_id == undefined)
        {
         selectedBooking.booking_id = bookings.length;
         const booking = {...selectedBooking}
         bookings.push(booking);
        }

        setBookings(bookings);
        //setSelectedBooking(newBooking);
        const newBooking = {...selectedBooking}
       
        newBooking.total_guests = 0;
        newBooking.BookingDetails.forEach((cabin: any)=>{
             if(cabin.accommodation_id == selectedAccommodation.accommodation_id)
             {
               cabin.number_of_guests = selectedAccommodation.number_of_guests;
                cabin.start_date = selectedAccommodation.start_date;
                 cabin.end_date = selectedAccommodation.end_date;

             }

            if(cabin.number_of_guests != undefined)
            newBooking.total_guests += parseInt(cabin.number_of_guests);
            if(newBooking.start_date > cabin.start_date)
               newBooking.start_date = cabin.start_date;
            if(newBooking.end_date < cabin.end_date)
               newBooking.end_date = cabin.end_date;
            
        })
        setSelectedBooking(newBooking);
        

      //   console.log(newBooking);
      //   console.log(selectedAccommodation);
      //   console.log(newAccommodation);
        
        bookingService.updateOne(newBooking).then(result=>{
         console.log(result.data);
         setSelectedBooking(result.data);
         
         setIsChanged(false);
         setSelectedAccommodation({});
         setNewAccommodation({});
        });
        
  }

   const onCancelBtnClick = () => {
      setSelectedAccommodation({});
    
      navigate("/bookings");
   }

  const onAccomodationChanged = (event: any)=>{
         const cabinId = event.target.value;
         
         newAccommodation.accommodation_id = cabinId;
         const  accommodation= accommodations.find((cabin: any)=> cabin.accommodation_id == cabinId)
         newAccommodation.capacity = accommodation.capacity;
         newAccommodation.price_per_night = accommodation.price_per_night;
         newAccommodation.Accommodation = accommodation;
         setNewAccommodation(newAccommodation);
         const nums: number [] = range(newAccommodation.capacity);
         setNumOptions(nums);
         setIsChanged(selectedAccommodation.Accommodation != undefined);
         console.log(newAccommodation);
  }
  const onStartDateChanged = (event: any)=>{
         const startDate = event.target.value;
         newAccommodation.start_date = startDate;
         selectedBooking.start_date =startDate;
          console.log(newAccommodation);
          setIsChanged(selectedAccommodation.Accommodation != undefined);
  }
  const onEndDateChanged = (event: any)=>{
         const endDate = event.target.value;
         newAccommodation.end_date = endDate;
         selectedBooking.end_date = endDate;
         setIsChanged(selectedAccommodation.Accommodation != undefined);
          console.log(newAccommodation);
  }
  const onGuestChanged = (event: any)=>{
         const numberOfGuest = event.target.value;
         newAccommodation.number_of_guests = numberOfGuest;
          console.log(newAccommodation);
          setIsChanged(selectedAccommodation.Accommodation != undefined);
  }

  const  range=(n:number)=> {
          const ret = [];
          for(let i =1; i<= n; i++)
          {
            ret.push(i);
          }
          return ret;
}




  return (
      <MainLayout>
      
      <><div className="row m-2">
       
      <h4 className="col-12">Edit Booking</h4>
      
      
      <div className="col-12 col-md-6">
       <div className="row">
          
         <div className="row "> Select accommodation:</div>
         <div className="row "> 
           
            <select 
            className="custom-select" 
            id="inputGroupSelect01" 
            disabled={selectedAccommodation.Accommodation != undefined}
            onChange={onAccomodationChanged}>
               <option defaultValue={""} >Choose...</option>
               { (accommodations.length >0) &&
                  accommodations.map((cabin: any, index:number)=>{
                     return <option value={cabin.accommodation_id} key={index} 
                     selected={(selectedAccommodation!= undefined && selectedAccommodation.Accommodation!= undefined && selectedAccommodation.Accommodation.accommodation_id == cabin.accommodation_id )}>{cabin.name}</option>
                  })
               }
               
            </select>
         </div>
       
      </div>
      <div className="row ">
          
         <div className="row "> Start date: </div>
         <div className="row "> 
           
            <input type="date" id="datestart" onChange={onStartDateChanged} defaultValue={(selectedAccommodation!= undefined)? selectedAccommodation.start_date:""}></input>
            </div>
         
      </div>
      <div className="row">
          
         <div className="row"> End date:</div>
         <div className="row "> 
            
            <input type="date" id="dateend" onChange={onEndDateChanged} defaultValue={(selectedAccommodation!= undefined )? selectedAccommodation.end_date:""}></input>
         </div>
       
      </div>
      <div className="row">
          
         <div className="row "> Guests:</div>
         <div className="row ">
            
             <select className="custom-select" id="numberOfGuest" onChange={onGuestChanged} defaultValue={(selectedAccommodation!=undefined)? selectedAccommodation.number_of_guests :""}>
               <option defaultValue={""}>Choose...</option>
               {
                 (numOptions).map((num: number)=>{
                  console.log(num);
                  return <option value={num} key={num}
                  selected={(selectedAccommodation!= undefined && selectedAccommodation.number_of_guests!= undefined && selectedAccommodation.number_of_guests == num )}
                  >{num}</option>
                 })
               }
              
            </select>
         </div>
       
      </div>
      <div className="row">
         <div className="col-6">
            {(addBtnDisable)&&
            <button 
             className="rounded-1 bg-primary text-light m-2"
             //disabled={(selectedAccommodation.Accommodation !== undefined)}
             
             onClick={onAddBtnClick}>ADD</button>
            }
         </div>
         <div className="col-6">
             {isChanged&& <button className="rounded-1 bg-primary text-light m-2" onClick={onUpdateBtnClick}>Update</button>}
         </div>
      </div>
      </div>
      
      <div className="col-12 col-md-6">
          {bookingDetails !== undefined && bookingDetails.map((accommodation: any, index: number) => {
                                 return <IncludedAccommodationItem accommodationDetail={accommodation} key={index}></IncludedAccommodationItem>
                               })}
         

      </div>
      
      </div>
      
      
      
    
      <div className="row">
       <div className="col-6">
      <button disabled={saveBtnDisable} className="btn rounded-1 bg-primary text-light m-2" onClick={onSaveBtnClick}>Save</button>
      </div>
      <div className="col-6">
      <button className="rounded-1 bg-primary text-light m-2" onClick={onCancelBtnClick}>Cancel</button>
      </div>
      </div>
      </>
     </MainLayout>
     
  
  )
}

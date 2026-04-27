import axios from 'axios';
import AuthService from './AuthService.js';
import {baseUrl, 
  bookingsEndpoint, 
  getBookingDetailEndpoint, 
  postBookingEndpoint, 
  putBookingDetailEndpoint,
 deleteBookingDetailEndpoint} from '../utils.tsx';
//When moving to to Azure and connecting the sites to each other we have to change the url
//const NOTES_API_URL = 'https://apinotes-d8eyhgcsgddrbzgv.francecentral-01.azurewebsites.net/api/notes';
const BOOKINGS_API_URL = baseUrl + bookingsEndpoint;
const BOOKING_DETAIL_API_URL = baseUrl + getBookingDetailEndpoint;
const CREATE_BOOKING_API_URL = baseUrl + postBookingEndpoint;
const UPDATE_BOOKING_API_URL = baseUrl + putBookingDetailEndpoint;
const DELETE_BOOKING_API_URL = baseUrl + deleteBookingDetailEndpoint;


class BookingService {
   async fetchAll() {
    return await axios.get(BOOKINGS_API_URL, { headers: AuthService.authHeader() } );
  }
  async fetchOne(id:number){
    console.log(BOOKING_DETAIL_API_URL+id);
    return await axios.get(BOOKING_DETAIL_API_URL+id, { headers: AuthService.authHeader() })
  }
  async createOne(booking:any)
  {
     try {
      const response = await axios.post(CREATE_BOOKING_API_URL, {
        status: "pending",
        details: booking.BookingDetails,
       
      }, {
        headers: AuthService.authHeaderJson()
      });

      return response.data;

    } catch (error) {
      console.error('booking error: ', error);
      throw error;
    }

  }
   async updateOne( booking:any)
  {
     try {
      const response = await axios.put(UPDATE_BOOKING_API_URL+booking.booking_id, {
        status: "pending",
        details: booking.BookingDetails,
       
      }, {
        headers: AuthService.authHeaderJson()
      });

      return response.data;

    } catch (error) {
      console.error('booking error: ', error);
      throw error;
    }

  }

  async deleteOne(id:string)
  {
     try {
      const response = await axios.delete(DELETE_BOOKING_API_URL+id, 
  
        {
        headers: AuthService.authHeaderJson()
      });

      return response.data;

    } catch (error) {
      console.error('booking error: ', error);
      throw error;
    }

  }
}

//export default new UserService();

const bookingService =  new BookingService(); 
export default bookingService;
//0505838567
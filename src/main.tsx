import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {CampingSite} from './App.tsx'
import { accommodations, accommodations_bookings, mockData } from './mockData.tsx';
import { BrowserRouter } from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Bootstrap Icons
//import 'bootstrap-icons/font/bootstrap-icons.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <RouterProvider router = { router}/> */}
    <BrowserRouter>
    <CampingSite id="campingSite" data={{
      syncData:{
        count:10,
        accommodations:[],
        bookings:[],
        activeMenu: "",
        isMobile:false,
        isAdmin: true,
        isLogined:false,
        user:undefined,
        selectedAccommodation:{},
        selectedBooking:{},

      }}}></CampingSite>
      </BrowserRouter>
  </StrictMode>,
)

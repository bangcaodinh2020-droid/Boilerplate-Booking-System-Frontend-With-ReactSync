import { useChannel } from "@bangcao2020/reactsync";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isMobileDevice } from "../mockData";
import { useLocation } from "react-router-dom";
import AuthService from "../services/AuthService";
export const MenuBar = (props: any) => {
  
  const [isMobile, setIsMobile] = useChannel("isMobile", false);
  const [isLogined, setIsLogined] = useChannel("isLogined", false);
  const [activeItem, setActiveItem] = useState("");

  const location = useLocation();
    useEffect(()=>{
           const userData = AuthService.getCurrentUser();
           if(userData!=null)
           setIsLogined(true);
           setMenuItem(location.pathname);
           setIsMobile(isMobileDevice);
           console.log(isLogined);
    }, [isLogined]);
  const navigate = useNavigate();
  const onBtnClick = (item:string) => {
       setActiveItem(item);
       navigate("/"+ item);
       
      
  };

  const setMenuItem=(item:string)=>{
    console.log(item);
    if(item == "/bookings")
      setActiveItem("bookings");
    else if(item == "/home")
      setActiveItem("home");
    else if(item == "/about")
      setActiveItem("about");
    else if(item == "/accommodations")
      setActiveItem("accommodations");
    else if(item == "/signup")
      setActiveItem("signup");
    else if(item == "/login")
      setActiveItem("login");
    else if(item == "/accommodationDetail")
      setActiveItem("accommodations");
    else if(item.startsWith("/bookingdetail") || item.startsWith("/newbooking"))
    {
      
      setActiveItem("bookings");
    }

  }

  const onLoginBtnClick = (item:string) => {
       setActiveItem(item);
       navigate("/"+ item);
       //setIsLogined(true);
      
  };


  const onLogoutBtnClick = (item:string) => {
       AuthService.logout();
     
       setActiveItem("login");
       setIsLogined(false);
       navigate("/login");
       window.location.reload();
      
  };

  return (
    <div className="row p-0 m-0">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/index"></a>
    {isMobile && <span className="navbar-text">
        Campingsite
      </span>}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className={(activeItem =="home")? "nav-item bg-primary rounded-1 text-light m-2 p-2" : "nav-item m-2 p-2"} onClick={()=>onBtnClick("home")}>
                Home
        </li>
        
        <li className={(activeItem =="about")? "nav-item bg-primary rounded-1 text-light m-2 p-2" : "nav-item m-2 p-2"} onClick={()=>onBtnClick("about")}>
                About
        </li>
        <li className={(activeItem =="accommodations")? "nav-item bg-primary rounded-1 text-light m-2 p-2" : "nav-item m-2 p-2"} onClick={()=>onBtnClick("accommodations")}>
                Accommodations
        </li>

         <li className={(activeItem =="bookings")? "nav-item bg-primary rounded-1 text-light m-2 p-2" : "nav-item m-2 p-2"} onClick={()=>onBtnClick("bookings")}>
                Bookings
        </li>
        {(isLogined ==false)&&<li className={(activeItem =="signup")? "nav-item bg-primary rounded-1 text-light m-2 p-2" : "nav-item m-2 p-2"} onClick={()=>onBtnClick("signup")}>
                Register
        </li>}

         {(isLogined ==false) &&<li className={(activeItem =="login")? "nav-item bg-primary rounded-1 text-light m-2 p-2" : "nav-item m-2 p-2"} onClick={()=>onLoginBtnClick("login")}>
                Login
        </li>}
        {(isLogined ==true) &&<li className={(activeItem =="logout")? "nav-item bg-primary rounded-1 text-light m-2 p-2" : "nav-item m-2 p-2"} onClick={()=>onLogoutBtnClick("logout")}>
                Logout
        </li>}
       
       
       
      </ul>
      
    </div>
  </div>
</nav>
      
    </div>
  );
};
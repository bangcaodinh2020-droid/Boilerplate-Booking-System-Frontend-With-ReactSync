import { useChannel } from "@bangcao2020/reactsync";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthService from "../services/AuthService";

export default function Login(props: any) {
  const [userForm, ] = useChannel("userForm", {});
  const [user, setUser] = useChannel("user", {});// authenticated user
  
  const [isLogined, setIsLogined] = useChannel("isLogined", false);
  
  const navigate = useNavigate();

  const onSubmitBtnClick = () => {
      
        if(validate())
        {
         AuthService.login(userForm).then(result=>{
            
             setUser(result.data);
             //console.log(result);
             
             navigate("/bookings");
             setIsLogined(true);

         })
      
        }
  };

  const validate=()=>{
   return true;
  }
  const onCancelBtnClick = () => {
        navigate("/accommodations");
  };

  const onEmailChanged = (event: any)=>{
         const email = event.target.value;
         
         userForm.email = email;
        
  }
  const onPasswordChanged = (event: any)=>{
         const password = event.target.value;
         userForm.password = password;
         
  }
 
  

  return (
      <MainLayout>
      

      <div className="container">
            <div className="row justify-content-center">
                 <div className="col-12 col-md-4">
                  <div className="row justify-content-center">
                  
                  <h4 className="col-4">Login</h4>
                  
                  </div>
                  
                  <div className="row mt-3">
                     
                     <div className="row"> Email</div>
                     <div className="row"> <input onChange={onEmailChanged}></input></div>
                  
                  </div>
                  <div className="row mt-3">
                     
                     <div className="row "> Password</div>
                     <div className="row "> <input onChange={onPasswordChanged}></input></div>
                  
                  </div>
                 
               
                  
                  <div className="row">
                     <div className="col-6">
                     <button className="rounded-1 bg-primary text-light m-2" onClick={onSubmitBtnClick}>Login</button>
                     </div>
                     <div className="col-6">
                     <button className="rounded-1 bg-primary text-light m-2" onClick={onCancelBtnClick}>Cancel</button>
                     </div>
                  </div>
            </div>
         </div>
      </div>
     </MainLayout>
     
  
  )
}

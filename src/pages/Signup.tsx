import { useChannel } from "@bangcao2020/reactsync";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthService from "../services/AuthService";
export default function SignUp(props: any) {
  const [newAccountForm, setNewAccountForm] = useChannel("newAccountForm", {});
 
  const navigate = useNavigate();
  const onSubmitBtnClick = () => {
        
        //TODO: revoke API call the sign up end point, if success, navigate to login page.
        if(validate())
        {
         console.log(newAccountForm);
         AuthService.register(newAccountForm).then(result=>{
             //setResponseMessage(result.message)
             console.log(result);
             
             navigate("/login");
         })
      
        }
        
        
  };

  const validate=()=>{
   return true;
  }

  const onFirstnameChanged = (event: any)=>{
         const firstname = event.target.value;
         
         newAccountForm.firstname = firstname;
        setNewAccountForm({...newAccountForm});
  }
  const onLastnameChanged = (event: any)=>{
         const lastname = event.target.value;
         
         newAccountForm.lastname = lastname;
        setNewAccountForm({...newAccountForm});
  }
  const onPhoneChanged = (event: any)=>{
         const phone = event.target.value;
         
         newAccountForm.phone_number = phone;
        setNewAccountForm({...newAccountForm});
  }
  const onEmailChanged = (event: any)=>{
         const email = event.target.value;
         
         newAccountForm.email = email;
        setNewAccountForm({...newAccountForm});
  }
  const onPasswordChanged = (event: any)=>{
         const newPassword = event.target.value;
         newAccountForm.password = newPassword;
         newAccountForm.isShortPassword = (newPassword.length <8);
         
         setNewAccountForm({...newAccountForm});
  }
  const onConfirmChanged = (event: any)=>{
         const newConfirmPassword = event.target.value;
         newAccountForm.isWrongConfirmPassword = (newConfirmPassword != newAccountForm.password);
         setNewAccountForm({...newAccountForm});
       
  }
  

  return (
      <MainLayout>
         <div className="container">
            <div className="row justify-content-center">
                 <div className="col-12 col-md-4">
                  <div className="row justify-content-center">
                  
                  <h4 className="col-12 col-md-4">Sign up</h4>
                  
                  </div>
                  
                  <div className="row mt-3">
                     
                     <div className="row"> First name</div>
                     <div className="row"> <input onChange={onFirstnameChanged}></input></div>
                  
                  </div>
                  <div className="row mt-3">
                     
                     <div className="row"> Last name</div>
                     <div className="row"> <input onChange={onLastnameChanged}></input></div>
                  
                  </div>
                  <div className="row mt-3">
                     
                     <div className="row"> Phone number</div>
                     <div className="row"> <input onChange={onPhoneChanged}></input></div>
                  
                  </div>
                  <div className="row mt-3">
                     
                     <div className="row"> Email</div>
                     <div className="row"> <input onChange={onEmailChanged}></input></div>
                  
                  </div>
                  
                  <div className="row mt-3">
                     
                     <div className="row "> Password</div>
                     <div className="row "> <input onChange={onPasswordChanged}></input></div>
                      {(newAccountForm.isShortPassword==true)&&<label className="text-danger">Password longer than 8 characters</label>}
                  </div>
                  <div className="row mt-3">
                     
                     <div className="row"> Confirm password</div>
                     <div className="row"> <input onChange={onConfirmChanged}></input></div>
                     {(newAccountForm.isWrongConfirmPassword==true)&&<label className="text-danger">confirm password is wrong</label>}
                  </div>
               
                  
                  <div className="row">
                     <div className="col-6">
                     <button className="rounded-1 bg-primary text-light m-2" onClick={onSubmitBtnClick}>Sign Up</button>
                     </div>
                     <div className="col-6">
                     <button className="rounded-1 bg-primary text-light m-2" onClick={onSubmitBtnClick}>Cancel</button>
                     </div>
                  </div>
            </div>
         </div>
      </div>
     </MainLayout>
     
  
  )
}

import { useChannel } from "@bangcao2020/reactsync";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthService from "../services/AuthService";
import { useEffect } from "react";

export default function Logout(props: any) {
  const [userForm, setUserForm] = useChannel("userForm", {});
  const [user, setUser] = useChannel("user", {});
  
  
  const navigate = useNavigate();
  useEffect(()=>{
        setUserForm({});
        setUser(undefined);
        navigate("/login");
  });
  
  return (
      <></>
     
  
  )
}

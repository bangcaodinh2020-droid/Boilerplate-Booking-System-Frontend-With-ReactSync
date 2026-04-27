import { useEffect, useState } from "react";
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { MenuBar } from "../components/MenuBar";
import { isMobileDevice } from "../mockData";
export default function MainLayout(props: any) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{
         setIsMobile(isMobileDevice);
  }, []);

  return (
    <>
    {isMobile == false && <Header></Header>}
    <MenuBar></MenuBar>
     <main className="flex-fill container py-4 m-0 px-0" id="main">
      {props.children}
      
      </main>
     <div className="row" style={{height:50}}></div>
    <Footer></Footer>
     
    </>
  )
}

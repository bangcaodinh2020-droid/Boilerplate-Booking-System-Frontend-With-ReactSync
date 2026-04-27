import { useChannel } from "@bangcao2020/reactsync";
import { AccommodationItem } from "../components/AccommodationItem";
import accommodationService from "../services/AccommodationService";

import { useEffect } from "react";

import MainLayout from "../layouts/MainLayout";

export default function Accommodations(props: any) {
  const [accommodations, setAccommodations] = useChannel( "accommodations", []);
  
  useEffect(() => {
    console.log("fetching...")
    accommodationService.fetchAll().then((result) => {
      console.log(result);
      setAccommodations(result.data.data);
    });
  }, []);

  return (
    <MainLayout>
      {accommodations.map((accommodation: any, index: number) => {
        return (
          <AccommodationItem
            accommodation={accommodation}
            key={index}
          ></AccommodationItem>
        );
      })}
    </MainLayout>
  );
}

import { useNavigate } from "react-router-dom";
import { useChannel } from "@bangcao2020/reactsync";
import AuthService from "../services/AuthService";
export const AccommodationItem = (props: any) => {
  const [newAccommodation, setNewAccommodation] = useChannel("newAccommodation", {});
  const [selectedAccomodation, setSelectedAccommodation] = useChannel(
    "selectedAccommodation",
    ""

  );
  const [isMobile] = useChannel("isMobile", false);
  const navigate = useNavigate();

  const onMoreBtnClick = (id: string) => {
    setSelectedAccommodation(props.accommodation);
    navigate("/accommodationdetail/" + props.accommodation.accommodation_id );
  };

  const onBookBtnClick = (id: string) => {
    if(AuthService.isLogined())
    {
      setNewAccommodation({});
      setSelectedAccommodation(props.accommodation);
      navigate("/newbooking/" + props.accommodation.accommodation_id );
    }
    else 
    {
      navigate("/login");
    }
    
    
  };


  return (
    <div className="row m-2 rounded-1 border border-primary p-2">
       <div className="row d-flex justify-content-start align-items-center">
          <div className="col-12 col-md-10">
            <div className="row">
            <div
              className="col-3 col-md-2 rounded-1 p-2 me-3"
              style={{ width: 150, height: 150 }}
            >
              <img
                className="rounded-2"
                src={`/images/${props.accommodation.accommodation_id}_1.jpg`}
                alt={props.accommodation.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="col-5 col-md-6">
              <div className="row">Cabin: {props.accommodation.name}</div>
              <div className="row">Type: {props.accommodation.type}</div>
              <div className="row">Beds: {props.accommodation.capacity}</div>
              <div className="row">
                Price: {props.accommodation.price_per_night}
              </div>
              <div className="row">
                Description: {props.accommodation.description}
              </div>
            </div>
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="row">
            <div className="col-6 col-md-12">
              <button
                className="btn btn-primary mb-2 w-100"
                onClick={() => onBookBtnClick(props.accommodation)}
              >
                Book
              </button>
            </div>
            <div className="col-6  col-md-12">
              <button
                className="btn btn-primary w-100"
                onClick={() => onMoreBtnClick(props.accommodation)}
                
              >
                Detail
              </button>
            </div>
            </div>
          </div>
        </div>
    </div>
  );
};

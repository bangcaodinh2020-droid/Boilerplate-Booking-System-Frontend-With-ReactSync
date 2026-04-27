import axios from 'axios';
import AuthService from './AuthService.jsx';
import {baseUrl, accomodationsEndpoint, accomodationDetailEndpoint} from '../utils.tsx';
//When moving to to Azure and connecting the sites to each other we have to change the url
//const NOTES_API_URL = 'https://apinotes-d8eyhgcsgddrbzgv.francecentral-01.azurewebsites.net/api/notes';
const ACCOMMODATIONS_API_URL = baseUrl + accomodationsEndpoint;
const ACCOMMODATIONS_DETAIL_API_URL = baseUrl + accomodationDetailEndpoint;

class AccommodationService {
   async fetchAll() {
    return await axios.get(ACCOMMODATIONS_API_URL);
  }
  async fetchOne(id:number){
    //console.log(ACCOMMODATIONS_DETAIL_API_URL+id);
    return await axios.get(ACCOMMODATIONS_DETAIL_API_URL+id, { headers: AuthService.authHeader() })
  }
}

//export default new UserService();

const accommodationService =  new AccommodationService(); 
export default accommodationService;
//0505838567
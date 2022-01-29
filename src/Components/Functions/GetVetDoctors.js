import Axios from "axios";
import { hostUrl } from "../Host";


var veterinarians = [];
function getVeterinarian(user) {
    Axios.get(
        `${hostUrl}/vetclinic/get/veterinarian/${user.vetid}`
    ).then((response) => {
        veterinarians.push(response.data);
    });
}

export { veterinarians, getVeterinarian }
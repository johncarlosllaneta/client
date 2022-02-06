import Axios from "axios";
import { hostUrl } from "../Host";
import { users } from "../User";



var numberNewThreads = 0;
setTimeout(() => {
    Axios.get(
        `${hostUrl}/vetclinic/messages/notification/length/${users[0].vetid}`
    ).then((response) => {
        numberNewThreads = response.data.view;
        // alert(response.data.view);
    });
}, 1000);


export { numberNewThreads };
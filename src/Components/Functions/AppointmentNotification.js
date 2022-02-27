import Axios from "axios";
import { hostUrl } from "../Host";


var token = localStorage.getItem("ajwt");
var users = [];
Axios.get(`${hostUrl}/home`, {
    headers: { Authorization: `Bearer ${token}` },
}).then((response) => {
    // console.log(response.data.result[0]);
    users.push(response.data.result[0]);
    Axios.get(`${hostUrl}/vetclinic/notification/length/${response.data.result[0].vetid}`).then(
        (response) => {
            numberOfNotification = response.data.view;

        }
    );
});

var notification = [];
var numberOfNotification = 0;

// setTimeout(() => {
//     Axios.get(`${hostUrl}/vetclinic/notification/${users[0].vetid}`).then(
//         (response) => {
//             return notification.push(response.data);
//         }
//     );


// }, 1000);


function refreshNotification() {
    Axios.get(`${hostUrl}/vetclinic/notification/${users[0].vetid}`).then(
        (response) => {
            return notification.push(response.data);
        }
    );

    Axios.get(`${hostUrl}/vetclinic/notification/length/${users[0].vetid}`).then(
        (response) => {

            // alert(response.data.view);
            numberOfNotification = response.data.view;
        }
    );
}
export { notification, numberOfNotification, refreshNotification }
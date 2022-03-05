import Axios from "axios";
import { hostUrl } from "../Host";

var token = localStorage.getItem("ajwt");
var threadList = [];
Axios.get(`${hostUrl}/home`, {
    headers: { Authorization: `Bearer ${token}` },
}).then((response) => {
    // console.log(response.data.result[0]);
    Axios.get(`${hostUrl}/talktovet/petOwner/thread/${response.data.result[0].pet_owner_id}`, {

    }).then((response) => {

        return threadList.push(response.data);
    });
});

export { threadList }
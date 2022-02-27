import Axios from "axios";
import { hostUrl } from "../Host";

var token = localStorage.getItem("ajwt");
var threadList = [];
Axios.get(`${hostUrl}/home`, {
    headers: { Authorization: `Bearer ${token}` },
}).then((response) => {
    // console.log(response.data.result[0]);
    Axios.get(`${hostUrl}/talktovet/vetclinic/thread/${response.data.result[0].vetid}`, {

    }).then((response) => {

        return threadList.push(response.data);
    });
});

export { threadList }
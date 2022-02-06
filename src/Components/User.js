import { useState } from "react";
import Axios from "axios";
import { hostUrl } from "./Host";




var token = localStorage.getItem("ajwt");
var users = [];
Axios.get(`${hostUrl}/home`, {
  headers: { Authorization: `Bearer ${token}` },
}).then((response) => {
  // console.log(response.data.result[0]);
  return users.push(response.data.result[0]);
});

var numberNewThreads = 0;
function messages(user) {
  Axios.get(
    `${hostUrl}/vetclinic/messages/notification/length/${user.vetid}`
  ).then((response) => {
    numberNewThreads = response.data.view;
    // alert(response.data.view);
  });
}


export { users, messages, numberNewThreads };

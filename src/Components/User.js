import { useEffect } from "react";
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

var numberNewReserved = 0;

function notifReserved(user) {
  Axios.get(
    `${hostUrl}/vetclinic/notification/reservation/length/${user}`
  ).then((response) => {
    numberNewReserved = response.data.view;
    // alert(response.data.view);
  });
}

var numberNewAppointment = 0;

function notifAppointment(user) {
  Axios.get(`${hostUrl}/vetclinic/notification/length/${user}`).then(
    (response) => {
      numberNewAppointment = response.data.view;
      // alert(response.data.view);
    }
  );
}

export {
  users,
  messages,
  numberNewThreads,
  notifAppointment,
  notifReserved,
  numberNewAppointment,
  numberNewReserved,
};

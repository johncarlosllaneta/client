import { useState } from "react";
import Axios from "axios";
import { hostUrl } from "./Host";

function User() {
  const [user, setuser] = useState([]);

  var token = localStorage.getItem("ajwt");
  Axios.get(`${hostUrl}/home`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => {
    setuser(response.data.result[0]);
    // console.log(user);
  });

  return new user();
}

export { User };

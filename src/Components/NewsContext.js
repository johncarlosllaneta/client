import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { newsAPI } from "./Host";

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [data, setData] = useState();
  const apiKey = newsAPI;
  const searchPhrase = "Dogs";

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=animals&from=${new Date()
          .toJSON()
          .slice(0, 10)}&sortBy=publishedAt&apiKey=${apiKey}`
      )
      .then((response) => {
        if (response.data !== undefined) {
          setData(response.data);
        } else {
        }
      })
      .catch((error) => console.log(error));

    console.log(data);
  }, []);

  return (
    <NewsContext.Provider value={{ data }}>
      {props.children}
    </NewsContext.Provider>
  );
};

import React, { useContext } from "react";

import NewsArticle from "./NewsArticle";
import { NewsContext } from "./NewsContext";

function News(props) {
  const { data } = useContext(NewsContext);
  // console.log(data.articles);

  return (
    <div>
      <div className="all__news">
        {data ? (
          <NewsArticle data={data.articles[0]} key={data.articles[0].url} />
          // <NewsArticle data={data.articles[0]} key={data.articles[0].url} />
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
}

export default News;

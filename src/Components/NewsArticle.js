import React from "react";
import "../css/NewsArticle.css";
function NewsArticle({ data }) {
    return (
        <div className="news">
            <h6 style={{ fontWeight: "bold", color: "#19B9CC", textAlign: 'left' }}>
                Animal Welfare
            </h6>
            <h4 style={{ color: "#19B9CC", textAlign: 'left' }}>Information</h4>
            <h1 className="news__title">{data.title}</h1>
            <p className="news__desc">{data.description}</p>
            <span className="news__author">Author: {data.author}</span> <br />
            {/* <span className="news__published">{data.publishedAt}</span> */}
            <span className="news__source">{data.source.name}</span>
        </div>
    );
}

export default NewsArticle;
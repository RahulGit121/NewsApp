// import React, { Component } from 'react'
//Func based

import React from 'react'

const NewsItem = (props)=> {

    let { title, description, imgUrl, author, datePb, source, urlNews } = props;

    return (

      <div className="card" >
 <div className="container my-2">
          <span className="badge rounded-pill bg-primary">{source}</span>
        </div>

        <img src={!imgUrl ? 'https://www.livemint.com/lm-img/img/2023/12/23/1600x900/USA-FUNDS-CRYPTO-0_1701429276385_1703307996383.JPG' : imgUrl} className="card-img-top" alt="..." />
       
        <div className="card-body">

          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {author} on {datePb}</small></p>
          <a href={urlNews} target="_blank" className="btn btn-dark">Read more</a>
        </div>
      </div>
    )
}
export default NewsItem

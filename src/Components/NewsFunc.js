import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsFunc = (props) => {
    
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);

    
    useEffect(() => {
    updateNews();
    }, [])


const updateNews = async() =>{
        //red color top bar loader
        props.setProgress(30);
        setPage(page +1)
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=e0e4286b10674e169a3096bc62d6fe92&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);

        props.setProgress(50);

        let parsedData = await data.json();

        console.log(parsedData)
        props.setProgress(70);

        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    const fetchMoreData = async() => {
        setPage(page +1);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=e0e4286b10674e169a3096bc62d6fe92&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResult(parsedData.totalResults)
        setLoading(false)
    }

    return (
        <div className="container my-4">
            <h1 style={{marginTop:"65px", display:"flex", justifyContent:"center" }}>News 24x7 - Top {props.category} Headlines</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResult}
                loader={<Spinner />}
            >
                <div className="container" style={{ overflowX: "hidden" }} >
                    <div className="row"  >
                        {articles.map((element) => {
                            return <div className="col-md-4 my-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} urlNews={element.url} author={element.author ? element.author : "Unknown"} datePb={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

NewsFunc.defaultProps = {
    category: 'general',
    pageSize: 6,
    setProgress: '10',
}

NewsFunc.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,

}

export default NewsFunc
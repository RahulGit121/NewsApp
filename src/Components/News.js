import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import Proptypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    category: 'general',
    pageSize: '6',
    setPorgress: '10',
  }

  static propTypes = {
    category: Proptypes.string,
    pageSize : Proptypes.number,
    
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
  }

  async componentDidMount() {
    //red color top bar loader
    this.props.setProgress(30);
    this.setState({ page: this.state.page +1 })
const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e0e4286b10674e169a3096bc62d6fe92&page=${this.state.page}&pageSize=${this.props.pageSize}`;
this.setState({ loading: true })
    let data = await fetch(url);

    this.props.setProgress(50);

    let parsedData = await data.json();

    console.log(parsedData)
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
   
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e0e4286b10674e169a3096bc62d6fe92&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({loading :true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }


  // Buttons funciton for prev next

  // handleNext = async () => {
  //   this.setState({ loading: true })
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e0e4286b10674e169a3096bc62d6fe92&page=${this.state.page + 1}&pageSize=15`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData)

  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  // }
  // handlePrev = async () => {
  //   this.setState({ loading: true })
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e0e4286b10674e169a3096bc62d6fe92&page=${this.state.page - 1}&pageSize=15`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData)

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })

  // }

  render() {
    return (
      <div className="container my-4">
        <h1>Top Headlines - In 30 minutes</h1>
{/*         
        {this.state.loading && <Spinner />} */}

        {/* buttons for prev next  */}
        {/* <div className="container my-3 d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark " onClick={this.handlePrev}>Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 15)} type="button" className="btn btn-dark " onClick={this.handleNext}>Next</button>
        </div> */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          
        >
          
          <div className="container" style={{overflowX: "hidden"}} >
          <div className="row"  >
            {this.state.articles.map((element) => {
              return <div className="col-md-4 my-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} author={element.author ? element.author : "Unknown"} datePb={element.publishedAt} source={element.source.name}/> 
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>

         {/* <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4 my-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} author={element.author ? element.author : "Unknown"} datePb={element.publishedAt} source={element.source.name}> </NewsItem>
            </div>
          })}
        </div> */}

      </div>

    )
  }
}

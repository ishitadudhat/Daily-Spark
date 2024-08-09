import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
// import Loader from './Loader'



export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
  }


  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async UpdateNews(PageNo) {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=dc858c69984f4312a74e37c0713ed8e6&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${PageNo}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Daily Spark`;
  }

  async componentDidMount() {
    this.UpdateNews(this.state.page)
  }

  // handlePerviousPage = async () => {
  //   console.log("Previous");
  //   this.setState({ page: this.state.page - 1 },
  //     () => { this.UpdateNews(this.state.page) }
  //   )
  // }


  // handleNextPage = async () => {
  //   console.log("Next");
  //   this.setState({ page: this.state.page + 1 },
  //     () => { this.UpdateNews(this.state.page) }
  //   )
  // }

  fetchMoreData = async (PageNo) => {
    this.setState({page: this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=dc858c69984f4312a74e37c0713ed8e6&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${PageNo}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };


  render() {
    return (
      <div className='container news-headline'>
        <h1 className='text-center'>Today's Top Headlines About - {this.capitalizeFirstLetter(this.props.category)}</h1>
        {/* {this.state.loading && <Loader />} */}


        <div className="container">
        <div className="row">
          {this.state.articles.map(
            (element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            }

          )}
        </div>
        </div>

        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<h4>Loading...</h4>}
        ></InfiniteScroll>

        

        {/* <div className='d-flex justify-content-between my-3'>
          <button type="button" disabled={this.state.page <= 1} className="btn btn-outline-dark" onClick={this.handlePerviousPage}>	&larr; Previous</button>
          <button type="button" className="btn btn-outline-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.page)} onClick={this.handleNextPage}>Next &rarr;</button>
        </div> */}

      </div>
    )
  }
}

export default News

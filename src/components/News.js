import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const newsCache = new Map();

export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }
  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : true,
      loadingMore: false,
      page : 1,
      totalResults: 0,
      error: null
    }
    document.title = `NexNews - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} News`;
  }

  fetchIndiaNews = async (page) => {
    const cacheKey = `${this.props.category}-${page}-${this.props.pageSize}`;
    const cachedData = newsCache.get(cacheKey);

    if (cachedData) {
      this.setState({
        articles: cachedData.articles,
        totalResults: cachedData.totalResults,
        page,
        loading: false,
        loadingMore: false,
        error: null
      });
      return;
    }

    const params = new URLSearchParams({
      category: this.props.category,
      country: this.props.country,
      page: String(page),
      pageSize: String(this.props.pageSize)
    });

    const url = `/api/news?${params.toString()}`;

    this.setState({ loading: true, loadingMore: false, error: null });

    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      if (!data.ok || parsedData.status === 'error') {
        throw new Error(parsedData.message || 'Unable to load news right now.');
      }

      let articles = parsedData.articles || [];
      let totalResults = parsedData.totalResults || 0;

      if (articles.length === 0 && this.props.category !== 'general') {
        const fallbackParams = new URLSearchParams({
          category: 'general',
          country: this.props.country,
          page: String(page),
          pageSize: String(this.props.pageSize)
        });
        const fallbackUrl = `/api/news?${fallbackParams.toString()}`;
        const fallbackData = await fetch(fallbackUrl);
        const fallbackParsedData = await fallbackData.json();

        if (fallbackData.ok && fallbackParsedData.status !== 'error') {
          articles = fallbackParsedData.articles || [];
          totalResults = fallbackParsedData.totalResults || 0;
        }
      }

      newsCache.set(cacheKey, {
        articles,
        totalResults
      });

      this.setState({
        articles,
        totalResults,
        page,
        loading: false,
        loadingMore: false
      });
    } catch (error) {
      this.setState({
        articles: [],
        totalResults: 0,
        loading: false,
        loadingMore: false,
        error: error.message
      });
    }
  }

  async componentDidMount() {
    await this.fetchIndiaNews(1);
  }

  handlePrevClick = async () => {
    await this.fetchIndiaNews(this.state.page - 1);
  }

    handleNextClick = async () => {
      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      await this.fetchIndiaNews(this.state.page + 1);
      }
    }

    fetchMoreData = async () => {
    if (this.state.loadingMore || this.state.articles.length >= this.state.totalResults) {
      return;
    }

    const nextPage = this.state.page + 1;
    const cacheKey = `${this.props.category}-${nextPage}-${this.props.pageSize}`;
    const cachedData = newsCache.get(cacheKey);

    if (cachedData) {
      this.setState((prevState) => ({
        articles: prevState.articles.concat(cachedData.articles),
        totalResults: cachedData.totalResults,
        page: nextPage,
        loadingMore: false
      }));
      return;
    }

    const params = new URLSearchParams({
      category: this.props.category,
      country: this.props.country,
      page: String(nextPage),
      pageSize: String(this.props.pageSize)
    });

    const url = `/api/news?${params.toString()}`;

    this.setState({ loadingMore: true, error: null });

    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      if (!data.ok || parsedData.status === 'error') {
        throw new Error(parsedData.message || 'Unable to load more news right now.');
      }

      const newArticles = parsedData.articles || [];
      const totalResults = parsedData.totalResults || this.state.totalResults;

      newsCache.set(cacheKey, {
        articles: newArticles,
        totalResults
      });

      this.setState((prevState) => ({
        articles: prevState.articles.concat(newArticles),
        totalResults,
        page: nextPage,
        loadingMore: false
      }));
    } catch (error) {
      this.setState({
        loadingMore: false,
        error: error.message
      });
    }

  };
  render() {
      const { theme } = this.props;
      const headingTitle = this.props.category === 'general'
        ? 'NexNews - Top Headlines'
        : `NexNews - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} News`;

      return (
      <div className="container my-4 news-page">
              <h1 className="news-heading" style={{textAlign: "center" }}>{headingTitle}</h1>
                {this.state.loading && <Spinner theme={theme} />}
                {!this.state.loading && this.state.error && (
                  <div className="alert alert-danger text-center" role="alert">
                    {this.state.error}
                  </div>
                )}
                {!this.state.loading && !this.state.error && this.state.articles.length === 0 && (
                  <div className="alert alert-warning text-center" role="alert">
                    No news articles found for this section right now.
                  </div>
                )}
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={!this.state.loading && this.state.loadingMore ? <Spinner theme={theme} /> : null}
        >
          <div className="row justify-content-center gx-2">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-2 d-flex justify-content-center" key={element.url}>
                  <NewsItem
                    theme={theme}
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={element.description ? element.description.slice(0, 80) : ""}
                    rawTitle={element.title || ""}
                    rawDescription={element.description || ""}
                    author={element.author || element.source?.name || 'Unknown source'}
                    publishedAt={element.publishedAt}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              )
            })}
          </div>
        </InfiniteScroll>
            </div>
    )
  }
}
export default News

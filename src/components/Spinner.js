import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    const { theme } = this.props;

    return (
      <div className="news-loader-wrapper" role="status" aria-live="polite">
        <div className={`news-loader-card ${theme === 'dark' ? 'news-loader-card-dark' : 'news-loader-card-light'}`}>
          <div className="news-loader-orbit">
            <span className={`news-loader-ring news-loader-ring-primary ${theme === 'dark' ? 'news-loader-ring-primary-dark' : 'news-loader-ring-primary-light'}`}></span>
            <span className={`news-loader-ring news-loader-ring-secondary ${theme === 'dark' ? 'news-loader-ring-secondary-dark' : 'news-loader-ring-secondary-light'}`}></span>
            <span className={`news-loader-core ${theme === 'dark' ? 'news-loader-core-dark' : 'news-loader-core-light'}`}></span>
          </div>
          <p className="news-loader-title">Loading India news</p>
          <p className="news-loader-text">Fetching the latest headlines for you...</p>
        </div>
      </div>
    )
  }
}

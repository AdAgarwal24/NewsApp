import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'

export class NavBar extends Component {
  render() {
    const { theme, toggleTheme } = this.props;
    const isDarkMode = theme === 'dark';

    return (
      <div className="sticky-top">
        <nav className={`navbar navbar-expand-lg news-navbar ${isDarkMode ? 'navbar-dark' : 'navbar-light'}`}>
  <div className="container-fluid">
    <Link className="navbar-brand news-navbar-brand" to="/">NexNews</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active news-nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link news-nav-link" to="/business">Business</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link news-nav-link" to="/entertainment">Entertainment</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link news-nav-link" to="/health">Health</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link news-nav-link" to="/science">Science</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link news-nav-link" to="/sports">Sports</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link news-nav-link" to="/technology">Technology</Link>
        </li>
        
      </ul>
      <div className="theme-switch-wrapper">
        <span className="theme-label">{isDarkMode ? 'Dark mode' : 'Light mode'}</span>
        <button
          type="button"
          className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
          onClick={toggleTheme}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          <span className="theme-toggle-track">
            <span className="theme-decor theme-decor-cloud cloud-one"></span>
            <span className="theme-decor theme-decor-cloud cloud-two"></span>
            <span className="theme-decor theme-decor-cloud cloud-three"></span>
            <span className="theme-decor theme-decor-star star-one"></span>
            <span className="theme-decor theme-decor-star star-two"></span>
            <span className="theme-decor theme-decor-star star-three"></span>
            <span className="theme-decor theme-decor-star star-four"></span>
            <span className="theme-toggle-thumb">
              <span className="theme-thumb-core"></span>
              <span className="moon-crater crater-one"></span>
              <span className="moon-crater crater-two"></span>
              <span className="moon-crater crater-three"></span>
            </span>
          </span>
        </button>
      </div>
    </div>
  </div>
</nav>
      </div>
    )
  }
}

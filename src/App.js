import './App.css';
import React, { Component } from 'react'
import { NavBar } from './components/NavBar';
import { News } from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'light'
    };
  }

  componentDidMount() {
    this.applyTheme();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      this.applyTheme();
    }
  }

  applyTheme = () => {
    const { theme } = this.state;
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }));
  }

  render() {
    return (
      <div className={`app-shell ${this.state.theme}`}>
        <Router>
          <NavBar theme={this.state.theme} toggleTheme={this.toggleTheme} />
          <Routes>
            <Route exact path="/"
              element={<News key ="general" pageSize={6} country="in" theme={this.state.theme} category="general" />}
            />

            <Route exact path="/business"
              element={<News key ="business" pageSize={6} country="in" theme={this.state.theme} category="business" />}
            />

            <Route exact path="/entertainment"
              element={<News key ="entertainment" pageSize={6} country="in" theme={this.state.theme} category="entertainment" />}
            />

            <Route exact path="/health"
              element={<News key ="health" pageSize={6} country="in" theme={this.state.theme} category="health" />}
            />

            <Route exact path="/science"
              element={<News key ="science" pageSize={6} country="in" theme={this.state.theme} category="science" />}
            />

            <Route exact path="/sports"
              element={<News key ="sports" pageSize={6} country="in" theme={this.state.theme} category="sports" />}
            />

            <Route exact path="/technology"
              element={<News key ="technology" pageSize={6} country="in" theme={this.state.theme} category="technology" />}
            />
            
            <Route path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </Router>
      </div>
    )
  }
}

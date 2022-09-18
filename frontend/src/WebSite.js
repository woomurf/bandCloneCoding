import React, { Component } from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";
import MainScreen from "./screen/MainScreen";

class WebSite extends Component {
  async movePage(pagePath) {
    if (pagePath === "") {
      await axios.post("/auth/logout")
      .catch((err) => {
        console.log('/auth/logout', err);
      });
    }
    window.location.href = "/" + pagePath;
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={
            <LoginScreen
              movePage={(pagePath) => this.movePage(pagePath)}
            />
          }/>
          <Route path="/main" element={
            <MainScreen
              movePage={(pagePath) => this.movePage(pagePath)}
            />
          }/>
        </Routes>
      </Router>
    );
  }
}

export default WebSite;
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";
import MainScreen from "./screen/MainScreen";

class WebSite extends Component {
  onChangePage(pagePath) {
    window.location.href = "/" + pagePath;
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={
            <LoginScreen
              onClick={
                (result) => this.onChangePage(result)
              }
            />
          }/>
          <Route path="/main" element={
            <MainScreen
              onClick={
                (result) => this.onChangePage(result)
              }
            />
          }/>
        </Routes>
      </Router>
    );
  }
}

export default WebSite;
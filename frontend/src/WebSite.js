import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";
import PostScreen from "./screen/PostScreen";
import CalenderScreen from "./screen/CalenderScreen";
import MemberScreen from "./screen/MemberScreen";
import BandSettingScreen from "./screen/BandSettingScreen";

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
          <Route path="/post" element={
            <PostScreen
              onClick={
                (result) => this.onChangePage(result)
              }
            />
          }/>
          <Route path="/calender" element={
            <CalenderScreen
              onClick={
                (result) => this.onChangePage(result)
              }
            />
          }/>
          <Route path="/member" element={
            <MemberScreen
              onClick={
                (result) => this.onChangePage(result)
              }
            />
          }/>
          <Route path="/bandsetting" element={
            <BandSettingScreen
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
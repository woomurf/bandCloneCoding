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

class WebSite extends Component {
  onChangePage(pagePath) {
    window.location.href = "/" + pagePath;
  }

  render() {
    return (
      <Router>
        <div>
          <Routes>
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
            <Route path="/" element={
              <LoginScreen
                onClick={
                  (result) => this.onChangePage(result)
                }
              />
            }/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default WebSite;
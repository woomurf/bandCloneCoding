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
  async onChangePage(pagePath) {
    if (pagePath === "") {
      const res = await axios({
        method: 'post',
        url: '/auth/logout',
        // headers: { 
        //   'Content-Type': 'application/json'
        // },
        // data: JSON.stringify({
        //   name,
        //   email,
        //   password,
        //   birth: year + "-" + month + "-" + day
        // })
      }).then(function (res) {
        console.log(JSON.stringify(res.message));
      })
      .catch(function (err) {
        console.log(err);
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
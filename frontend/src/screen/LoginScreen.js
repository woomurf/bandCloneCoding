import React from "react";
import Banner from '../image/LoginBanner.png';
import Title from '../image/Title.svg';
import MainButton from '../component/MainButton.js';
import SubButton from '../component/SubButton.js';
import '../scss/screen.scss';

const LoginScreen = () => {
  return (
    <div className="loginPage">
      <div className="relativeWrapperOne">
        <img
          alt=""
          className="rectangle1"
          src={Banner}
        />
        <div className="rectangle11" />
      </div>
      <div className="flexWrapperOne">
        <img
          alt=""
          className="union"
          src={Title}
        />
        <div className="rectangle3" />
        <div className="rectangle3" />
        <div className="flexWrapperTwo">
          <SubButton/>
          <MainButton/>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
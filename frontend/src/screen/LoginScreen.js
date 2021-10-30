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
          className="sectionBanner"
          src={Banner}
        />
      </div>
      <div className="flexWrapperOne">
        <img
          alt=""
          className="sectionTitle"
          src={Title}
        />
        <div className="textBox_1" />
        <div className="textBox_1" />
        <div className="flexWrapperTwo">
          <SubButton title="Register" clsNm="mr8"/>
          <MainButton title="Login" clsNm="ml8"/>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
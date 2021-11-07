import React, {Component} from "react";
import Banner from '../image/LoginBanner.png';
import Title from '../image/Title.svg';
import TextBox from '../component/TextBox_1';
import MainButton from '../component/MainButton.js';
import SubButton from '../component/SubButton.js';
import '../scss/screen.scss';

class PostScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      clsNm:'',
      typeNm:'',
      dtaNm:'',
      inputId:'',
      inputPw:''
    }
  }

  render() {
    return (
      <div id="loginPage">
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
        <TextBox title="ID" typeNm="text" dtaNm="inputId"
        onChange={function(_inputId){
          this.setState({
            inputId:_inputId
          });
        }.bind(this)}/>
        <TextBox title="PW" typeNm="password" dtaNm="inputPw"
        onChange={function(_inputPw){
          this.setState({
            inputPw:_inputPw
          });
        }.bind(this)}/>
        <div className="flexWrapperTwo">
          <SubButton title="Register" clsNm="mr8"
          onClick={function(e){
            alert("회원가입 넣어야합니다.");
          }}/>
          <MainButton title="Login" clsNm="ml8"
          onClick={function(e){
            alert("ID : " + this.state.inputId + "\nPW : " + this.state.inputPw
             + "\n체크 후 팝업 또는 로그인 완료 및 메인페이지로 이동");
             this.props.onChange("complete");
          }.bind(this)}/>
        </div>
      </div>
    </div>
    );
  }
};

export default PostScreen;
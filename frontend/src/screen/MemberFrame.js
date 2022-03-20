import React, {Component} from "react";
import '../scss/page.scss';
import Sky from '../image/Sky.png';
import SearchBox from "../component/SearchBox";

class MemberFrame extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div id="centerFrame">
          <SearchBox
            label="멤버 검색"
          />
          {/* API 떠서 memberFrame 컴포넌트로 따로 제외 후 
          API로 받아온 카운트로 멤버 인원 입력,
          카운트에 맞게 map 사용으로 멤버 출력,
          SearchBox로 멤버 검색 기능 구현 */}
          <div className="memberFrameBody">
            <div className="memberHeader">
              멤버 3
            </div>
            <div className="settingLine"/>
            <div className="memberBodyDiv">
              <div className="memberBody">
                <img alt="" src={Sky} id="memberProfileImage"/>
                <div className="memberName">
                  권영준
                </div>
              </div>
              <button className="settingButton">
                설정
              </button>
            </div>
            <div className="memberLine"/>
            <div className="memberBodyDiv">
              <div className="memberBody">
                <img alt="" src={Sky} id="memberProfileImage"/>
                <div className="memberName">
                  우현웅
                </div>
              </div>
              <button className="settingButton">
                설정
              </button>
            </div>
            <div className="memberLine"/>
            <div className="memberBodyDiv">
              <div className="memberBody">
                <img alt="" src={Sky} id="memberProfileImage"/>
                <div className="memberName">
                  정의창
                </div>
              </div>
              <button className="settingButton">
                설정
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MemberFrame;
import React, {Component} from "react";
import SearchBox from "../component/SearchBox";
import MemberBox from "../component/MemberBox";
import '../scss/page.scss';

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
            onClick={function(searchParam) {
              this.props.memberSelectEvent(searchParam);
            }.bind(this)}
          />
          <div className="memberFrameBody">
            <div className="memberHeader">
              {this.props.memberFrameComment}
            </div>
            <div className="settingLine"/>
            {this.props.members.map((member,index) => {
              return (
                <MemberBox
                  key={index}
                  name={member.name}
                  profileImage={member.profileImage}
                  email={member.email}
                  birth={member.birth}
                  lastIndexYn={this.props.members.length === index + 1}
                  onClickProfileInfo={this.props.memberInfoPopupOnOff.bind(this)}
                />
              )
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default MemberFrame;
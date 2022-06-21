import React, {Component} from "react";
import SearchBox from "../component/SearchBox";
import MemberBox from "../component/MemberBox";
import '../scss/page.scss';
import axios from "axios";

class MemberFrame extends Component {
  constructor(props){
    super(props);
    this.state = {
      members : [],
      memberFrameComment : null
    }
  }

  componentDidMount(){
    this.memberSelectEvent('');
  }

  async memberSelectEvent(searchParam){
    if (searchParam !== '') {
      await axios.get('/user/search/' + searchParam)
      .then(function(res){
        if (res.data.length > 0) {
          this.setState({
            members:res.data,
            memberFrameComment:"'" + searchParam + "' (으)로 검색한 결과"
          });
        } else {
          this.setState({
            members:[],
            memberFrameComment:"조회된 데이터가 없습니다."
          });
        }
      }.bind(this));
    } else {
      await axios.get('/user/list')
      .then(function(res){
        this.setState({
          members:res.data,
          memberFrameComment:"멤버 " + res.data.length
        });
      }.bind(this));
    }
  }


  render() {
    return (
      <div>
        <div id="centerFrame">
          <SearchBox
            label="멤버 검색"
            onClick={function(searchParam) {
              this.memberSelectEvent(searchParam);
            }.bind(this)}
          />
          <div className="memberFrameBody">
            <div className="memberHeader">
              {this.state.memberFrameComment}
            </div>
            <div className="settingLine"/>
            {this.state.members.map((member,index) => {
              return (
                <MemberBox
                  key={index}
                  name={member.name}
                  profileImage={member.profileImage}
                  email={member.email}
                  birth={member.birth}
                  lastIndexYn={this.state.members.length === index + 1}
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
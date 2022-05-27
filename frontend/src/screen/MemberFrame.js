import React, {Component} from "react";
import SearchBox from "../component/SearchBox";
import MemberBox from "../component/MemberBox";
import '../scss/page.scss';
import axios from "axios";

class MemberFrame extends Component {
  constructor(props){
    super(props);
    this.state = {
      memberInfo :{
        name:"",
        image:"",
        email:"",
        birth:""
      },
      members :[{
      }]
    }
  }

  async componentDidMount(){
    await axios.get('/user/list')
    .then(function(res){
      console.log(res.data[0]);
      this.setState({members:res.data});
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div id="centerFrame">
          <SearchBox
            label="멤버 검색"
          />
          {/* SearchBox로 멤버 검색 기능 구현 */}
          <div className="memberFrameBody">
            <div className="memberHeader">
              멤버 {this.state.members.length}
            </div>
            <div className="settingLine"/>
            {this.state.members.map((member,index) => {
              return(
                <MemberBox
                  key={index}
                  name={member.name}
                  profileImage={member.profileImage}
                  email={member.email}
                  birth={member.birth}
                  lastIndexYn={this.state.members.length === index + 1}
                  onClickProfileInfo={this.props.onClickUserInfo.bind(this)}
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
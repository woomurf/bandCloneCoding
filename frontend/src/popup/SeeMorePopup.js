import React, {Component} from "react";
import SeeMore from '../image/See_More.png';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class SeeMorePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditionSeemore: false,
    };
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside.bind(this));
  }
  
  setWrapperRef_1(node) {
    this.wrapperRef_1=node;
  }

  setWrapperRef_2(node) {
    this.wrapperRef_2=node;
  }

  onClickOutside(e) {
    if ((this.wrapperRef_1 && !this.wrapperRef_1.contains(e.target))
      && (this.wrapperRef_2 && !this.wrapperRef_2.contains(e.target))) {
      this.onBlurSeeMorePopup();
    }
  }

  onBlurSeeMorePopup() {
    this.setState({
      conditionSeemore:false
    });
  }
  
  showSeeMorePopup() {
    this.setState({
      conditionSeemore:true
    })
  }

  render() {
    return (
      <div className="moreIcon">
        <button className="postMoreMenuBtn">
          <img 
            alt="" 
            src={SeeMore} 
            ref={this.setWrapperRef_1.bind(this)}
            onClick={this.showSeeMorePopup.bind(this)}
          />
        </button>
        {this.state.conditionSeemore && 
          <div 
            id="seeMorePopup" 
            ref={this.setWrapperRef_2.bind(this)}
          > 
            <div className="content">
              <li className="moreContent">
                수정
              </li>
              <li className="moreContent">
                삭제
              </li>
            </div>
          </div>
        }
    </div>
    );
  }
};

export default SeeMorePopup;
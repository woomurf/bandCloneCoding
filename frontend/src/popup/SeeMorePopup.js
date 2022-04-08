import React, {Component} from "react";
import Button from '../component/Button';
import '../scss/common.scss';
import '../scss/popup.scss';

class SeeMorePopup extends Component {
  render() {
    return (
      <div id="seeMorePopup"> 
        <div className="content">
          <li className="moreContent">
            수정
          </li>
          <li className="moreContent">
            삭제
          </li>
        </div>
      </div>
    );
  }
};

export default SeeMorePopup;
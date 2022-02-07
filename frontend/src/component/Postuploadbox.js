import React, {Component} from "react";
import Picture from '../image/Picture.png';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Postuploadbox extends Component {
    render() {
        return (
            <div className="postuploadbox">
            <div className="postupload">
            <textarea type="text" rows="4" placeholder="새로운 소식을 남겨보세요." id="postupload"/>
            </div>
            <div className="pictureImage">
                  <img alt=""className="pictureImage" src={Picture} id="pictureImage"/>
            </div>
            </div>
      );
    }
};

export default Postuploadbox;
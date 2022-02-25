import React, {Component} from "react";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class MainRside extends Component {
    render() {
      const images = this.props.pictures
        return (
          <div id="rightFrame">
            <div className="pictureCollect">
              {images.map((image, index)=> {
                return(
                  <div key={index} className="pictureSort">
                    <img alt="" className="pictureSort" src ={image} id="pictureSort"/>
                  </div>
                )})}
            </div>
          </div>
        );
    }
};

export default MainRside;
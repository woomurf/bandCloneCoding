import React, {Component} from "react";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Main_Rside extends Component {
    render() {
      const images = this.props.pictures
        return (
          <div id="rightFrame">
            <div className="pictureCollect">
              {images.map((image, i)=> {
                return(
                  <div className="pictureSort">
                    <img alt="" className="pictureSort" src ={image} id="pictureSort" key={i}/>
                  </div>
                  )})}
            </div>
          </div>
        );
    }
};

export default Main_Rside;
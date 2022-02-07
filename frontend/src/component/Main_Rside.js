import React, {Component} from "react";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Main_Rside extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageNum : [
        this.props.pictureCollect5,
        this.props.pictureCollect6,
        this.props.pictureCollect7,
        this.props.pictureCollect8,
      ]
    }
  }
    render() {
        return (
          <div id="rightFrame">
            <div className="pictureCollect">
              <div className="pictureSort">
                <img alt="" className="pictureSort" src={this.props.pictureCollect} id="pictureSort"/>
              </div>
              <div className="pictureSort">
                <img alt="" className="pictureSort" src={this.props.pictureCollect1} id="pictureSort"/>
              </div>
              <div className="pictureSort">
                <img alt="" className="pictureSort" src={this.props.pictureCollect2} id="pictureSort"/>
              </div>
              <div className="pictureSort">
                <img alt="" className="pictureSort" src={this.props.pictureCollect3} id="pictureSort"/>
              </div>
              <div className="pictureSort">
                <img alt="" className="pictureSort" src={this.props.pictureCollect4} id="pictureSort"/>
              </div>
              <div className="pictureSort">
                <img alt="" className="pictureSort" src={this.props.pictureCollect5} id="pictureSort"/>
              </div>
                {this.state.imageNum.map((images,i)=>{
                  return(
                  <div className="pictureSort">
                    <img alt="" className="pictureSort" src ={images} id="pictureSort" key={i}/>
                  </div>
                  );
                })}
            </div>
          </div>
      );
    }
};

export default Main_Rside;
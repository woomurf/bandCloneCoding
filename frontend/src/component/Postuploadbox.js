import React, {Component} from "react";
import Picture from '../image/Picture.png';
import Upload_Button from '../image/Upload_Button.png'
// import ImageUploader from "react-images-upload"
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Postuploadbox extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            username:"권영준",
            nowTime: year+"년"+month+"월"+date+"일"+" "+hours+":"+min,
            // pictures:""
        };
        // this.ondrop = this.ondrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    //   ondrop(pictureFile, pictureDataURLs,){
    //     this.setState({
    //         pictures:this.state.pictures.concat(pictureFile)
    //     });
    // }
    
      handleChange(e) {
        this.setState({value: e.target.value});
      }
    
      handleSubmit(e) {
        alert(
            "userName : " + this.state.username+
            "\ntext : " + this.state.value+
            "\nuploadTime : " + this.state.nowTime,
            // "\npicture "+ this.state.pictures
            );
        e.preventDefault();
      }
    render() {
        return (
            // <form onSubmit={this.handleSubmit}>
                <div className="postuploadbox">
                    <div className="postupload">
                        <textarea type="text" rows="4" placeholder="새로운 소식을 남겨보세요." id="postupload"
                        value={this.state.value}
                        username={this.state.username}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="pictureImage">
                        <div>
                        <img alt="" className="pictureImage" src ={Picture} id="pictureImage"/>
                            {/* <ImageUploader
                            pictures={Picture}
                            buttonText={
                                <img alt="" className="pictureImage" src ={Picture} id="pictureImage"/>
                            }
                            withIcon={false}
                            withPreview={false}
                            withLabel={false}
                            onChange={this.ondrop}/> */}
                        </div>
                        <div>
                          <img alt="" className="uploadButton" src ={Upload_Button} id="uploadButton" onClick={this.handleSubmit}/>
                        </div>
                    </div>
                </div>
            // </form>
        );
    }
};

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth();
month = month+1;

if(month<10){
  month = "0" + month
}
var date = now.getDate();
if(date<10){
  date = "0"+date
}
var hours = now.getHours();
if(hours<10){
  hours = "0"+hours
}
var min = now.getMinutes();
if(min<10){
  min = "0"+min
}

export default Postuploadbox;
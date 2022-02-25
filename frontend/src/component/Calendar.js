import React, {Component} from "react";
import '../scss/common.scss';
import '../scss/component.scss';
import convert from "xml-js";

class Calender extends Component {
  state = {
    year:'2022',
    month:'01',
    holidays:''
  }

  Search(){
    var request = require('request');
    var url = '/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=Z%2BNjOu9h4kglwqwKq0mLWNrVk2bf3gN3vjiOF9Eq0sceKlmhuTfkSdkYZ%2BOVECefQcd0ATTBXMlkxDQm3unyHg%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('0'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
    queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent(this.state.year); /* */
    queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent(this.state.month); /* */

    request = {
      method: 'GET'
    };

    fetch(url + queryParams, request)
    .then((response)=> response.text()) 
    .then((result) => {
      let xml = convert.xml2json(result, { compact: false, spaces: 4 }); 
      xml = JSON.parse(xml);
      const dates = xml.elements[0].elements[1].elements[0].elements;
      const dateArr = []; 

      for (let i = 0; i < dates.length; i++) {
        const { elements: dateObj } = dates[i];
        const obj = {
          name: dateObj[1].elements[0].text, 
          holiday: dateObj[2].elements[0].text, 
          date: dateObj[3].elements[0].text, 
        }; 
        dateArr.push(obj); 
      } 
      this.setState({
        holidays:dateArr
      });
    }).catch((error) => {
        console.log("error", error);
    });

    return;
  };

  render() {
    return (
      <div>
        <div>
          <input 
            value={this.state.year} 
            onChange={function(e){
              this.setState({
                year:e.target.value
              });
            }.bind(this)}
          /> 
          <input 
            value={this.state.month} 
            onChange={function(e){
              this.setState({
                month:e.target.value
              });
            }.bind(this)}
          /> 
        </div> 
        <button 
          onClick={function(e){
            this.Search();
          }.bind(this)}
        >
          검색 
        </button> 
        <button
          onClick={function(e){
            console.log(this.state.holidays);
          }.bind(this)}
        >
          결과
        </button>
      </div>
    );
  }
};

export default Calender;
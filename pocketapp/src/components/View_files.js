import React, { Component } from 'react';
import toastr from "toastr";
import { instance, ROOT} from "./url_config";
import "./../static/file-upload.css"

import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

import Uploader from "./Uploader"

class FileUploader extends Component {
    constructor() {
      super();
      this.state = {
        recordList: [],
        moneyIn: [],
        moneyOut: [],
        selectedFile: null,
        open: false,
        password: '',
        token: localStorage.getItem('access_token'),
      };
    }

  
    update_dict = () => {
      let raw_data = {
          'SENT MONEY': this.state.moneyIn[0],
          'RECEIVED MONEY': this.state.moneyIn[1], 
          'AGENT DEPOSIT': this.state.moneyIn[2], 
          'AGENT WITHDRAWAL': this.state.moneyIn[3], 
          'PAYBILL': this.state.moneyIn[4], 
          'BUY GOODS': this.state.moneyIn[5],
          'OTHERS': this.state.moneyIn[6],
        };
    }

    // fetch events from api endpoint
    fetchrecords(){
    instance.get(`${ROOT}/file-upload`)
      .then(response => {
        const records = response.data['response'];
        this.setState({ ...this.state, 
          recordList: response.data['response'],
          moneyIn: response.data['response'][0]['in'],
          moneyOut: response.data['response'][0]['out'],
          date: response.data['response'][0]['period']
        }, () => {
          // this.update_dict()
          // console.log('3456789',this.state.moneyIn);
          
        });
      })
      .catch(function (error) {
      });
  }

  componentWillMount() {
      this.fetchrecords()
  }

    
    
  render() {
    // console.log('renderin', this.state.moneyIn);
    let raw_data_in = {
      'SENT MONEY': this.state.moneyIn[0],
      'RECEIVED MONEY': this.state.moneyIn[1], 
      'AGENT DEPOSIT': this.state.moneyIn[2], 
      'AGENT WITHDRAWAL': this.state.moneyIn[3], 
      'PAYBILL': this.state.moneyIn[4], 
      'BUY GOODS': this.state.moneyIn[5],
      'OTHERS': this.state.moneyIn[6],
    };
    let raw_data_out = {
      'SENT MONEY': this.state.moneyOut[0],
      'RECEIVED MONEY': this.state.moneyOut[1], 
      'AGENT DEPOSIT': this.state.moneyOut[2], 
      'AGENT WITHDRAWAL': this.state.moneyOut[3], 
      'PAYBILL': this.state.moneyOut[4], 
      'BUY GOODS': this.state.moneyOut[5],
      'OTHERS': this.state.moneyOut[6],
    };

    let date = this.state.date
    console.log(date);
    


  
    return (
      <div className="container">
        <Uploader />
        <div className="row display">
          <div className="pie-chart card-list">
            <div className="chart">
            <h2>Date Period: {date}</h2>
              <h3>MONEY RECEIVED ON MPESA</h3>
              <PieChart 
                  data={raw_data_in} 
                  donut={true} 
                  prefix="KSh"
                  name="Money Received"
                  />
              </div>
            <div className="chart">
            <h2>Date Period: {date}</h2>
              <h3>MONEY SPENT ON MPESA</h3>
              <PieChart 
                data={raw_data_out} 
                donut={true} 
                prefix="KSh"
                name="Money Spent"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FileUploader;
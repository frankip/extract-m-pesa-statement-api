import React, { Component } from 'react';
import toastr from "toastr";
import { instance, ROOT} from "./url_config";
import "./../static/file-upload.css"

import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

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

    handleFileChange = (event) => {
        var file = event.target.files[0];
        this.setState({
            selectedFile: file
            });
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
          moneyOut: response.data['response'][0]['out']
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

    fileUploadHandler = (e) => {
      e.preventDefault();
      const payload = this.state.selectedFile
      const password = this.state.password

      const data = new FormData() 
      data.append('file', payload)
      data.append('password', password)

      console.log('---><',data);
      
      
      
      instance.post(ROOT + "/file-upload", data)

        .then(res => { 
          // then print response status
          console.log(res);
          
          toastr.success(res.data)
        })
        .catch(err => { // then print response status
          console.log(err);
          
          toastr.error('upload fail')
        })
      
    };

    handlepasswordchange = e => {
      this.setState({ ...this.state, [e.target.name]: e.target.value });
      console.log('gdkh', this.state.password);
      
    };
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
  
    const recordlist = this.state.recordList.map(records => (
      
      <div className="pie-chart" key={records.id}>
        <div className="chart">
        <h3>MONEY RECEIVED On MPESA</h3>
        <PieChart 
        data={raw_data_in} 
        donut={true} 
        prefix="KSh"
        width="200px" height="300px"
        name="Money Received"
        />
        </div>


        <div className="chart">
        <h3>MONEY SPENT ON MPESA</h3>
        <PieChart 
        data={raw_data_out} 
        donut={true} 
        prefix="KSh"
        width="200px" height="300px" 
        name="Money Spent"
        />
        </div>
        
      </div>
    ));

    return (
      <div className="container">
        <div className="row upload">
          <div className="col-md-6 file">
              <form method="post" action="#" id="#">
                <div className="upload-container">
                      <div>
                        <label htmlFor="file">Upload your Mesa statement</label>
                        <input type="file" name="file" className="forms" onChange={this.handleFileChange}/>
                        <input type="password" name="password" className="password" placeholder="password" required ref="password" onChange={this.handlepasswordchange} />
                      </div>
                      <div className="col-md-6 pull-left">
                      <button width="100%" type="button" className="button-click buttons" onClick={this.fileUploadHandler}>Upload File</button>
                  </div>
                    </div>
                  
                </form>
          </div>
        </div>
        <div className="row display">
          <div className="card-list">
          { recordlist }
          </div>
        </div>
      </div>
    );
  }
}
export default FileUploader;
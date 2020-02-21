import React, { Component } from 'react';
import toastr from "toastr";
import { instance, ROOT, isTokenExpired } from "./url_config";
import "./../static/file-upload.css"


class FileUploader extends Component {
    constructor() {
      super();
      this.state = {
        recordList: [],
        selectedFile: null,
        open: false,
        payload: {
          password: '',
        },
        token: localStorage.getItem('access_token'),
      };
    }

    handleChange = (event) => {
        var file = event.target.files[0];

        console.log('+++++++++',file);
        this.setState({
            selectedFile: file
            });
    }

    // fetch events from api endpoint
    fetchrecords(){
    instance.get(`${ROOT}/file-upload`)
      .then(response => {
        const records = response.data['response'];
        console.log('--0',records);
        this.setState({ ...this.state, recordList: response.data['response'] }, () => {
        console.log('--0',this.state.recordList);
        
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
      const data = new FormData() 
      data.append('file', payload)
      instance.post(ROOT + "/file-upload", data)

        .then(res => { // then print response status
          toastr.success('upload success')
        })
        .catch(err => { // then print response status
          console.log(err);
          
          toastr.error('upload fail')
        })
      
    };

    handlepasswordchange = e => {
    
      // this.setState({ ...this.state, [e.target.name]: e.target.value });
      const { payload } = this.state;
      payload[e.target.name] = e.target.value;
      this.setState({ ...this.state, payload });
      // console.log(this.state.payload);
      
    };
  


  render() {
    const recordlist = this.state.recordList.map(records => (
    <div key={records.id}>
      <div className="card-list">
        <div className="card">
          <h3 className="card-title code code-details">&lt;{records.user}&gt;</h3>
          <p className="card-description">{records.data}</p>
        </div>
      </div>
    </div>
    ));

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
              <form method="post" action="#" id="#">
                    <div className="file">
                      <label htmlFor="file">Upload your Mesa statement</label>
                      <input type="file" name="file" className="form-control" onChange={this.handleChange}/>
                      {/* <input type="password" name="password" className="form" placeholder="password" required ref="password" onChange={this.handlepasswordchange} /> */}
                    <div className="col-md-6 pull-left">
                    <button width="100%" type="button" className="button-block btn-info" onClick={this.fileUploadHandler}>Upload File</button>
                    </div>
                    </div>
                </form>
                { recordlist }
          </div>
        </div>
      </div>
    );
  }
}
export default FileUploader;
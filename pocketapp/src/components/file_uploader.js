import React, { Component } from 'react';
import toastr from "toastr";
import { instance, ROOT, isTokenExpired } from "./url_config";
import "./../static/file-upload.css"


class FileUploader extends Component {
    constructor() {
      super();
      this.state = {
        selectedFile: null,
        open: false,
        payload: {},
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


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
              <form method="post" action="#" id="#">
                    <div className="form-group files">
                      <label>Upload Your File </label>
                      <input type="file" name="file" className="form-control" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-6 pull-right">
                    <button width="100%" type="button" className="button button-block btn-info" onClick={this.fileUploadHandler}>Upload File</button>
                    </div>
                </form>
          </div>
        </div>
      </div>
    );
  }
}
export default FileUploader;
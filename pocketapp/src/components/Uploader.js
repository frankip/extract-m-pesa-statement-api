import React, { Component } from 'react'
import { instance, ROOT} from "./url_config";
import toastr from "toastr";


export class uploader extends Component {
    constructor() {
        super();
        this.state = {
          selectedFile: null,
          open: false,
          password: '',
          token: localStorage.getItem('access_token'),
        };
      }

      handleFileChange = (event) => {
        let file = event.target.files[0];
        this.setState({
            selectedFile: file
            });

        console.log(file);

    }
    handlepasswordchange = event => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
      };

      fileUploadHandler = (event) => {
        event.preventDefault();
        const payload = this.state.selectedFile
        const password = this.state.password
  
        const data = new FormData() 
        data.append('file', payload)
        data.append('password', password)
        
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
  

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default uploader;

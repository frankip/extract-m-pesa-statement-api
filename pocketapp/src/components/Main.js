import React, { Component } from 'react';
import "./../static/App.css"



// local imports
import Navigation from './Navigation';
import FileUploader from './file_uploader';


class Main extends Component {
  render() {
    return <div>
        <Navigation />
        <section className="row">
          <FileUploader />
         
        </section>
      </div>;
  }
}

export default Main;
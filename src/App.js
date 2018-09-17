import React, { Component } from 'react';
import TableComp from './components/tableComponent';
import UploadComp from './components/uploadPdfComp';
import Demo from './components/demoPage';
import {Nav, Navbar, NavDropdown, MenuItem, Tabs, ButtonToolbar, Button, Table, ButtonGroup, Row, Col, Grid, Panel, FormGroup, FormControl} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className = "App">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous"/>

        <UploadComp></UploadComp>
          <br></br>

        <Grid fluid container alignItems = "flex-end" >
          <TableComp></TableComp>
        </Grid>
      </div>
      );
  }
}

export default App;

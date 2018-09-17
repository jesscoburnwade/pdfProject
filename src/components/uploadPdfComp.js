import React, {Component} from 'react';
import * as PdfJs from 'pdfjs-dist';
import Viewer from './pdfViewer';
import axios from 'axios';
import {Nav, Navbar, NavDropdown, Form, MenuItem, Tabs, ButtonToolbar, Button, Table, ButtonGroup, Row, Col, Grid, Panel, FormGroup, FormControl} from 'react-bootstrap';

const BASE_URL = 'http://localhost:8000/';

export default class tableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: null,
            scale: 1.5,
            results: []
        };

        this.filePost = this.filePost.bind(this);

    }

    filePost() {
        let formData = new FormData();
        formData.append("load", document.getElementById("int").files[0]);
        formData.append("filename", document.getElementById("filename").value);
        axios.post(BASE_URL + "create", formData);
        document.getElementById("int").value = null;
        document.getElementById("filename").value = "";
    }

    render() {
        return (
            <Form inline>
                <FormGroup>
                    <FormControl id="int" type="file" accept = ".pdf" />
                    <FormControl id="filename" placeholder="File name"/>
                    <Button onClick={this.filePost}>Create</Button>
                </FormGroup>
            </Form>
        )
    }
}
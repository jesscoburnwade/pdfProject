import React, {Component} from 'react';
import * as PdfJs from 'pdfjs-dist';
import Viewer from './pdfViewer';
import axios from 'axios';
import {Nav, Navbar, NavDropdown, MenuItem, Tabs, ButtonToolbar, Button, Table, ButtonGroup, Row, Col, Grid, Panel, FormGroup, FormControl} from 'react-bootstrap';

const BASE_URL = 'http://localhost:8000/';

export default class tableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: null,
            scale: 1.5,
            results: []
        };

        this.fileRead = this.fileRead.bind(this);
        this.fileSearch = this.fileSearch.bind(this);
        this.fileDelete = this.fileDelete.bind(this);
        this.filePost = this.filePost.bind(this);

    }

    fileRead() {
        this.setState({pdf: null});
        PdfJs.getDocument(BASE_URL + "read/" + document.getElementById("fileRead").value)
            .then((pdf) => this.setState({pdf: pdf})).catch(e => console.log(e));
    }

    fileSearch() {
        axios.get(BASE_URL + "find/filename/" + document.getElementById("fileSearch").value)
            .then(res => {this.setState({results: res.data})
        });
    }

    fileDelete() {
        axios.delete(BASE_URL + "delete/" + document.getElementById("fileDelete").value);
    }

    filePost() {
        let formData = new FormData();
        formData.append("load", document.getElementById("int").files[0]);
        formData.append("filename", document.getElementById("filename").value);
        axios.post(BASE_URL + "create", formData);
    }

    render() {
        return (
            <div className = "table">
                    <input id = "fileSearch" type = "text" placeholder = "Search for a file"/>
                    <Button bsSize = "small" bsStyle = "primary" onClick = {this.fileSearch}>Search</Button>
                
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>File Size</th>
                            <th>Upload Date</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.results.map(result =>
                        <tr bsClass = "clickable-row" onClick = "fileRead()">
                            <td>
                                {result.filename}
                            </td>
                            <td>
                                {result.chunkSize}
                            </td>
                            <td>
                                {result.uploadDate}
                            </td>
                            <td>
                                {result.id}
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}
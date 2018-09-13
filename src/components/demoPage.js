import React, {Component} from 'react';
import * as PdfJs from 'pdfjs-dist';
import Viewer from './pdfViewer';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

export default class Demo extends Component {
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
            .then(res => {this.setState({results: res.data})});
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
            <div>
                <input id="fileRead"></input>
                <button onClick={this.fileRead}>Read</button>

                <input id="fileSearch"></input>
                <button onClick={this.fileSearch}>Search</button>

                <input id="fileDelete"></input>
                <button onClick={this.fileDelete}>Delete</button>

                <input id="int" type="file"></input>
                <input id="filename" placeholder="filename"></input>
                <button onClick={this.filePost}>Create</button>

                <Viewer pdf={this.state.pdf} scale={this.state.scale}/>
                <span> {JSON.stringify(this.state.results)} </span>
            </div>
        );
    }
}
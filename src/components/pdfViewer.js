import React, {Component} from 'react';
import Page from './pageThing';

export default class Viewer extends Component {

    showPage(i) {
        return <Page pdf={this.props.pdf} index={i + 1} key={`document-page-${i}`} {...this.props}/>
    }

    render() {
        const numPages = this.props.pdf ? this.props.pdf.pdfInfo.numPages : 0;
        const pdfStyle = {
            overflowY: "scroll",
            position: "relative",
            height: "400px",
            width: "1000px"
        }
        if (this.props.pdf) {
            let A = [];
            for (let i = 0; i < numPages; i++) A[i] = i;

            return (
                <div style={pdfStyle}>
                    {A.map((v, i) => this.showPage(i))}
                </div>
            );
        }
        return null;
    }
}
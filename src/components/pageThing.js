import React, { Component } from 'react';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'N/A',
            page: null,
            width: 0,
            height: 0
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.pdf !== nextProps.pdf || this.state.status !== nextState.status;
    }

    componentDidUpdate(nextProps) {
        this._update(nextProps.pdf);
    }

    componentDidMount() {
        const { pdf } = this.props;
        this._update(pdf);
    }

    setCanvasRef = (canvas) => {
        this.canvas = canvas;
    };

    _update = (pdf) => {
        if (pdf) {
            this._loadPage(pdf);
        } else {
            this.setState({ status: 'loading' });
        }
    };

    _loadPage(pdf) {
        if (this.state.status === 'rendering' || this.state.page !== null) return;

        pdf.getPage(this.props.index).then(
            (page) => {
                this.setState({ status: 'rendering' });
                this._renderPage(page);
            }
        );
    }

    _renderPage(page) {
        let { scale } = this.props;
        let viewport = page.getViewport(scale);
        let { width, height } = viewport;
        let canvas = this.canvas;
        let context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        page.render({
            canvasContext: context,
            viewport
        });

        this.setState({ status: 'rendered', page, width, height });
    }

    render() {
        let { width, height } = this.state;

        return (
            <div style={{ width, height }}>
                <canvas ref={this.setCanvasRef} />
            </div>
        );
    }
}
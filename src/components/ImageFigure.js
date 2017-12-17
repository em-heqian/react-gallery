import React, { Component } from 'react';

class ImageFigure extends Component {
    render() {
        return (
            <figure className="img-figure" style={this.props.arrange}>
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
}

export default ImageFigure;

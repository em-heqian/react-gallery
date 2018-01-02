import React, { Component } from 'react';

class ImageFigure extends Component {

    handleClick(e){

        this.props.inverse();
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        let styleObj = {};
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos
        }

        if(this.props.arrange.rotate){
            ["-webkit-","-moz-","-ms-",""].forEach((value,index)=>{
                styleObj[value+"transform"] = "rotate(" + this.props.arrange.rotate + "deg)";
            });
        }

        let imgFigureClassName = "img-figure";
            imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
        console.log(styleObj);

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={e => this.handleClick(e)}>
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

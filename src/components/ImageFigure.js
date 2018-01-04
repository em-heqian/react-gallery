import React, { Component } from 'react';

class ImageFigure extends Component {

    handleClick(e){

        if(this.props.arrange.isCenter){
            this.props.inverse();
        } else {
            this.props.center()
        }
        e.stopPropagation();
        e.preventDefault();
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }



    render() {
        let styleObj = {};
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos
        }

        if(this.props.arrange.rotate){
            ["WebkitTransform","MozTransform","msTransform","transform"].forEach((value,index)=>{
                styleObj[value] = "rotate(" + this.props.arrange.rotate + "deg)";
            });
        }

        if(this.props.arrange.isCenter){
            styleObj.zIndex = 11;
        }

        let imgFigureClassName = "img-figure";
            imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
        //console.log(styleObj);

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={e => this.handleClick(e)}>
                <img src={this.props.data.imageURL} 
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                      <p>
                        {this.props.data.desc}
                      </p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

export default ImageFigure;

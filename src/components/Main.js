require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom'
import ImageFigure from './ImageFigure';

let yeomanImage = require('../images/yeoman.png');
import '../styles/main.scss';

// 获取图片相关的数据
var imageDatas = require('../data/imageDatas.json');
// 利用自执行函数， 将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL = require('../images/' + singleImageData.fileName);

        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);

function getRangeRandom(low,high){
  return Math.ceil(Math.random()*(high - low) + low);
}


class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.Constant = {
      centerPos:{
        left:0,
        rigth:0
      },
      hPosRange:{ //水平方向取值范围  
        leftSecX:[0,0],  //左侧区域的x的取值范围
        rightSecX:[0,0], //右侧区域的x轴的取值范围
        y:[0,0]

      },
      vPosRange:{ //垂直方向取值
        x:[0,0],
        topY:[0,0]
      }
    }
    
    this.state = {
      imgsArrangeArr:[]
    }
  }

  rearrange(centerIndex){
    let imgsArrangeArr = this.state.imgsArrangeArr,

        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,

        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,

        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        //
        imgsArrangeTopArr = [],
        topImgNum = Math.ceil(Math.random()),
        //取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        // 首先居中  centerIndex 的图片
        imgsArrangeCenterArr[0].pos = centerPos;

        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));

        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        imgsArrangeTopArr.forEach((value,index)=>{
          imgsArrangeArr[index].pos = {
            top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
            left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
          }
        })

        for(var i = 0,j = imgsArrangeArr.length, k = j/2;i<j;i++){
          let hPosRangeLORX = null;

          if(i<k){
            hPosRangeLORX = hPosRangeLeftSecX;
          } else {
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i].pos = {
            top:getRangeRandom(hPosRangeY[0],hPosRange[1]),
            left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
          }
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        });
        

  }


  componentDidMount () {

    //舞台的大小
    let stageDom = this.refs.stage,
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);
        

    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2); 


        console.log(imgFigureDOM)
    //计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }    

    //水平方向的取之范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] =  halfImgW - halfImgW *3;
    this.Constant.hPosRange.rightSecX[0] = halfImgW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW + halfImgW;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    

    this.rearrange(0)
    
  }
  
  

  render() {

    let controllerUnits  =[],
        imgFigures = [];
        console.log(imgFigures);
        imageDatas.forEach((value,index)=>{
          
          if (!this.state.imgsArrangeArr[index]) {
              this.state.imgsArrangeArr[index] = {
                  pos: {
                      left: 0,
                      top: 0
                  }
              };
          }
          imgFigures.push(<ImageFigure data={value} key={value.fileName} ref={"imgFigure" + index} arrange={this.state.imgsArrangeArr[index].pos}/>)
        }
        )

    return (
      // <div className="index">
      //   <img src={yeomanImage} alt="Yeoman Generator" />
      //   <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      //   <div>hello</div>
      // </div>
      <section className="stage" ref="stage">
          <section className="img-sec">
            {imgFigures}
          </section>
          <p>11</p>
          <nav className="controller-sec">
          </nav>
      </section>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

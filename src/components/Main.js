require('normalize.css/normalize.css');
require('styles/App.css');

import React,{Component} from 'react';
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

function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

function get30DegRandom(){
  return ((Math.random() > 0.5 ? "" : "-") + Math.ceil(Math.random() * 30));
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
      imgsArrangeArr:[

      ]
    }
  }
  
  /**
   * 翻转图片
   * @param index输入当前被执行inverse操作的
   * @return {Function} 这个一个闭包函数
   */

  inverse = (index) => () => {
    let imgsArrangeArr = this.state.imgsArrangeArr;
    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
    this.setState({
      imgsArrangeArr:imgsArrangeArr
    })
  }

  /**
   * 
   * @returns {Function}
   */
  center = (index) => () => {
    this.rearrange(index);
  }

  /**
   * 
   * @param {*} centerIndex 
   */
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

        //分配在顶部的数组
        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random()*2),
        //取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        // 首先居中  centerIndex 的图片
        imgsArrangeCenterArr[0] = {
          pos : centerPos,
          rotate : 0,
          isInverse:false,
          isCenter:true,
        }

        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));

        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        imgsArrangeTopArr.forEach((value,index)=>{
          imgsArrangeTopArr[index] = {
            pos : {
              top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
              left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
            },
            rotate:get30DegRandom(),
            isInverse:false,
            isCenter:false,
          }
        })

        console.log(imgsArrangeTopArr);

        for(var i = 0,j = imgsArrangeArr.length, k = j/2 ;i <j ;i++){
          let hPosRangeLORX = null;

          if(i<k){
            hPosRangeLORX = hPosRangeLeftSecX;
          } else {
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i] = {
            pos:{
              top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
              left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
            },
            rotate:get30DegRandom(),
            isCenter:false,
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

    //计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] =  halfStageW - halfImgW *3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

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
                  },
                  rotate:0,
                  isInverse:false,
                  isCenter:false 
              };
          }
          imgFigures.push(<ImageFigure data={value} key={value.fileName} ref={"imgFigure" + index} 
              arrange={this.state.imgsArrangeArr[index]} 
              center = {this.center(index)}
              inverse = {this.inverse(index)}/>);

              controllerUnits.push(<ControllerUnit 
                active={this.state.imgsArrangeArr[index].isCenter} 
                inverse = {this.state.imgsArrangeArr[index].isInverse}
                center = {this.center(index)}/>);    
        });

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
          <nav className="controller-nav">
            {controllerUnits}
          </nav>
      </section>

    );
  }
}

class ControllerUnit extends Component {

  handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.center();
  }

  render () {

    let controllerUnitClassName = "controller-unit";
        controllerUnitClassName += this.props.active ? ' is-center' : '';
        controllerUnitClassName += this.props.inverse ? ' is-reverse' : '';
        
    return (
      <span className={controllerUnitClassName} onClick={this.handleClick}>
      </span>
    )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

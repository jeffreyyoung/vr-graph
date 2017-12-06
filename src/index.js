import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import BarGraph from './BarGraph';
import Bar from './Bar';
import skyImg from './../public/sky.jpg'
import dataManager from './dataManager'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      data: []
  
    };
  }
  
  componentDidMount() {
    new dataManager(data => {
      this.setState({data});
    })
  }
  
  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render () {
    return (
      <Scene>
        <a-assets>
             <img id="backgroundInsideHouse" alt="pretty sky" src={skyImg}/>
        </a-assets>
        <Entity light={{type: 'point'}} position={{z:-10}}/>
        <Entity light={{type: 'point'}} position={{z: 10}}/>
        <a-sky id="background-img" src="#backgroundInsideHouse"></a-sky>
        <BarGraph data={this.state.data}/>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));

import React from 'react';
import {Entity} from 'aframe-react';
class Bar extends React.Component {
  static get defaultProps() {
    return {
      height: 5,
      width: 1,
      x: 2,
      y: 0,
      z: -5,
    }
  }
  
  render() {
    const {height, width,x,y,z} = this.props;
    return (
      <Entity geometry={{primitive: 'box', height,width}} material={{color: 'green'}} position={{x,y,z}}/>
    )
  }
}

export default Bar;
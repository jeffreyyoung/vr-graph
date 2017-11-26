import React from 'react';
import Bar from './Bar';


class BarGraph extends React.Component {
  static get defaultProps() {
    return {
      columns: [{
        label: 'meow'
      }],
      width: 1,
      x: 2,
      y: 0,
      z: -5,
    }
  }
  
  render() {
    return (
      [
        <Bar key={1} x={1} z={-10}/>,
        <Bar key={2} x={3} z={-10}/>,
        <Bar key={3} x={5} z={-10}/>,
        <Bar key={5} x={7} z={-10}/>,
      ]
    )
  }
}

export default BarGraph;
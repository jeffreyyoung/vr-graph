import React from 'react';
import Bar from './Bar';


class BarGraph extends React.Component {
  static get defaultProps() {
    return {
      data:[]
    }
  }
  
  render() {
    const data = this.props.data;
    const xStart = 0 - ( (this.props.data.length * 2) / 2 );
    const yStart = -10
    return data.map((row, i) => {
        const keys = Object.keys(row).filter(k => k);
        const value = keys.length ? row[keys[0]] : "";
        const height = parseInt(value.replace(',',''));
        return (<Bar key={i} height={height + yStart} y={height/2 + yStart} width={1} z={-100} x={xStart + (i*2)}/>)
      })
  }
}

export default BarGraph;
import React from 'react';
import Bar from './Bar';
import _ from 'lodash';
import colorPalette from './Colors'
class BarGraph extends React.Component {
  static get defaultProps() {
    return {
      data:[],
      colors: {}
    }
  }
  constructor(...args) {
    super(...args);
    this.state = {
      colors: {}
    }
  }
  
  
  getColorForKey(key, colors) {
    if (!colors[key]) {
      colors[key] = colorPalette.getNextColor(Object.values(colors));
    }
    
    return colors[key];
  }
  
  formatData(data, colors) {
    return _.chain(data)
      .map(row => {
        return Object.keys(row).map(key => {
          if (key) {
            return {
              label: key,
              value: parseFloat((row[key] || "").replace(',', '')),
              color: this.getColorForKey(key, colors)
            }
          }
          return undefined;
        })
      })
      .flatten()
      .filter(j => j)
      .value();
  }
  
  render() {
    const data = this.formatData(this.props.data, this.state.colors);
    const xStart = 0 - ( (this.props.data.length * 2) / 2 );
    const yStart = -10
    return data.map(({value, color}, i) => {
        const height = value;
        return (<Bar key={i} color={color} height={height + yStart} y={height/2 + yStart} width={1} z={-100} x={xStart + (i*2)}/>)
      })
  }
}

export default BarGraph;
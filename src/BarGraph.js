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
    let min = 0;
    let max = 0;
    return _.chain(data)
      .map(row => {
        return Object.keys(row).map(key => {
          if (key) {
            const value = parseFloat((row[key] || "").replace(',', ''));
            max = _.max([value, max]);
            return {
              label: key,
              value: value,
              color: this.getColorForKey(key, colors)
            }
          }
          return undefined;
        })
      })
      .flatten()
      .filter(j => j)
      .map(r => {
        console.log('max', max);
        console.log('R?', r.value, normalize(r.value, min, max));
        
        return {
          ...r,
          value: normalize(r.value, min, max)
        }
      })
      .value();
  }
  
  render() {
    const data = this.formatData(this.props.data, this.state.colors);
    const barWidth = 0.25;
    const spacingBetweenBars = 0.2;
    const distanceAwayFromGraph = -20;
    const xStart = 0 - ( (this.props.data.length * (barWidth+spacingBetweenBars)) / 2 );
    const yStart = 0;
    return data.map(({value, color}, i) => {
        const height = value;
        return (<Bar key={i} color={color} height={height + yStart} y={height/2 + yStart} width={barWidth} z={distanceAwayFromGraph} x={xStart + (i*(barWidth+spacingBetweenBars))}/>)
      })
  }
}

export default BarGraph;


function normalize(val, min, max){
  // Shift to positive to avoid issues when crossing the 0 line
  if(min < 0){
    max += 0 - min;
    val += 0 - min;
    min = 0;
  }
  // Shift values from 0 - max
  val = val - min;
  max = max - min;
  return Math.max(0, Math.min(1, val / max)) * 500;
}
import React from 'react';
import Bar from './Bar';
import _ from 'lodash';
import colorPalette from './Colors'
import {Entity} from 'aframe-react';
import Text from './Text';
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
        // console.log('max', max);
        // console.log('R?', r.value, normalize(r.value, min, max));
        
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

    const defaultProps = {
      color: '#000',
      value: 'Default text',
      width: 0,
      lineHeight: 38,
      letterSpacing: 0,
      align: 'left',
      opacity: 1,
      zOffset: 0,
    }

    let keyLength = Object.keys(this.state.colors).length;
    const legendContents = Object.keys(this.state.colors).map((val, i) => {
      return (
        <Text
          key={i}
          value={"---- "+val}
          color={this.state.colors[val]}
          width={4}
          zOffset={-10}
          x={i*2.5 * (2/keyLength)}
          y={-0.2}
        />
      )
    });

    const stuffToRender = data.map(({value, color}, i) => {
      const height = value;
      return (<Bar key={i} color={color} height={height + yStart} y={height/2 + yStart} key={i} width={barWidth} z={distanceAwayFromGraph} x={xStart + (i*(barWidth+spacingBetweenBars))}/>)
    });

    stuffToRender.push((
      <Entity
        geometry={{primitive: 'box', width: Object.keys(this.state.colors).length + 3, height: 1}}
        material={{color: '#FFFFFF', roughness: 0.5}}
        scale={{x: 2, y: 2, z: 0}}
        position={{x: 0, y: 0, z: -5}}
      >
        <Text value="LEGEND" color="#000" width={6} align="center" position="0 0.2 0" letterSpacing={5} />
        {legendContents}
      </Entity>));

    return stuffToRender;
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
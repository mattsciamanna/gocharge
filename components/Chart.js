import React from 'react';
// import { Text, ScrollView, Shape, ART } from 'react-native';
import { Icon } from 'expo';
var moment = require('moment');

import {
  StyleSheet,
  Text,
  View,
  ART,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const {
  Surface,
  Group,
  Rectangle,
  Shape
} = ART;

import WeatherGraph from './WeatherGraph.js';
import * as graphUtils from './graph-utils';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const d3 = {
  scale,
  shape,
};

const dimensionWindow = Dimensions.get('window');

function makeYScale(data){
  console.log(data.map(d => d.kWh))
  console.log(Math.max(...data.map(d => d.kWh)))
  const y = d3.scale
    .scaleLinear()
    .domain([0, Math.max(...data.map(d => d.kWh))])
    .range([100, 0]); // otherwise upside down
  return y;
}

function makeXScale(data){
  const x = d3.scale
    .scaleTime()
    .domain([moment(data[0].date).toDate(), moment(data[data.length - 1].date).toDate()])
    .range([0, dimensionWindow.width / 2]);
  return x;
}

function makeLine(data){
  const x = makeXScale(data);
  const y = makeYScale(data);
  const line = d3.shape.line()
    .x(function(d) { return x(moment(d.date).toDate()); })
    .y(function(d) { return y(d.kWh); });
  return line; 
}

export default class Chart extends React.Component {
  componentDidMount() {
    fetch('https://harding-app.herokuapp.com/data', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ "id": "1234" })
      })
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json.data })
      });
  }

  constructor(props){
    super(props);
    this.state = { data: [{date: "2018-11-21 00:15:00", kWh: 0.0258}] }
  }
  
  render() {
    var line = makeLine(this.state.data);
    return (
      <View>
      <Surface style={this.props.style} width={dimensionWindow.width / 2} height={100}>
        <Group x={0} y={0}>
          <Shape
            d={String(line(this.state.data))}
            stroke="#000"
            strokeWidth={1} />
        </Group>
      </Surface>
    </View>
    );
  }
}



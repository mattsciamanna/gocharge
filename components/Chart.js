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

// const data = [
//   {date: new Date(2000, 1, 1), value: 83.24},
//   {date: new Date(2000, 1, 2), value: 85.35},
//   {date: new Date(2000, 1, 3), value: 98.84},
//   {date: new Date(2000, 1, 4), value: 79.92},
//   {date: new Date(2000, 1, 5), value: 83.80},
//   {date: new Date(2000, 1, 6), value: 88.47},
//   {date: new Date(2000, 1, 7), value: 94.47},
// ];


// "11/21/2018  12:15:00 AM"
const dimensionWindow = Dimensions.get('window');

function makeYScale(data){
  console.log(data.map(d => d.kWh))
  console.log(Math.max(...data.map(d => d.kWh)))
  const y = d3.scale
    .scaleLinear()
    // Set our domain, which is our input data, which is our test scores,
    // which can be between 0 and 100.
    .domain([0, Math.max(...data.map(d => d.kWh))])
    // Set our range, which is our output data, which is the height of our
    // screen, which is 640 pixels.
    .range([100, 0]); // otherwise upside down
  return y;
}

function makeXScale(data){
  const x = d3.scale
    .scaleTime()
    // Our domain is now a week of time.
    .domain([moment(data[0].date).toDate(), moment(data[data.length - 1].date).toDate()])
    // That we're going to show on our screen which is also 640 pixels wide.
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
    var data = [
      {date: "11/21/2018  12:15:00 AM", kWh: 0.0258},
      {date: "11/21/2018  12:30:00 AM", kWh: 0.0312},
      {date: "11/21/2018  12:45:00 AM", kWh: 0.0135}
    ]
    // console.log(Math.max(data.map(d => d.kWh)))
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(data2 => this.setState({ data }));
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
    console.log('props are', props);
    super(props);
    this.state = { data: [{date: "2018-11-21 00:15:00", kWh: 0.0258}] }
  }
  
  render() {
    console.log('in render with state.data', this.state.data);
    var line = makeLine(this.state.data);
    return (
      <View>
        {/* <Text>{line(this.state.data)}</Text> */}
      <Surface style={{backgroundColor: 'red'}} width={dimensionWindow.width / 2} height={100}>
        <Group x={0} y={0}>
          <Shape
            d={String(line(this.state.data))}
            // d={"M0 80 L 40 10, 65 10, 95 80 S 150 150, 180 80"}
            stroke="#000"
            strokeWidth={1} />
        </Group>
      </Surface>
    </View>
    );
  }
}



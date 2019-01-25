import React from 'react';
// import { Text, ScrollView, Shape, ART } from 'react-native';
import { Icon } from 'expo';

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

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

export default class Chart extends React.Component {

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(response => response.json())
  //     .then(data => this.setState({ data }));
  // }
  
  render() {
    return (
      // <Text>Boring</Text>
      <View>
      <Surface width={500} height={500}>
        <Group x={100} y={0}>
          <Shape
            d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
            stroke="#000"
            strokeWidth={1} />
        </Group>
      </Surface>
    </View>
      
    );
  }
}



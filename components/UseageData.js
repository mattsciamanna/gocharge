import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';
import Table from '../components/Table';

export default class UseageData extends React.Component {

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  
  render() {
    return (
      <Text>Hi Alex!</Text>
    );
  }
}
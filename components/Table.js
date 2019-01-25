import React from 'react';
import { View, Grid, Row, Text } from 'react-native';

export default class Table extends React.Component {
    // renderRow() {
    //     return (
    //         <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
    //             <View style={{ flex: 1, alignSelf: 'stretch' }} /> { /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
    //             <View style={{ flex: 1, alignSelf: 'stretch' }} />
    //             <View style={{ flex: 1, alignSelf: 'stretch' }} />
    //             <View style={{ flex: 1, alignSelf: 'stretch' }} />
    //             <View style={{ flex: 1, alignSelf: 'stretch' }} />
    //         </View>
    //     );
    // }

    render() {
        // return <Text>Hi</Text>
        const data = [1, 2, 3, 4, 5];
        return (
            <Text>Hi</Text>
            // <Grid>
            //     <Row><Text>Hi</Text></Row>
            //     <Row><Text>There</Text></Row>
            // </Grid>
        );
    }
}

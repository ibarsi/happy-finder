import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../components/Text';

class EstablishmentNew extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return <View style={ styles.container }>
            <Text h1>
                { 'NEW ESTABLISHMENT' }
            </Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default EstablishmentNew;

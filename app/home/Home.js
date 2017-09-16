import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { COLOURS } from '../styles';

export default class Home extends React.Component {
    render() {
        const { navigate } = this.props.navigation;

        return <View style={ styles.container }>
            <Text h1>
                Happy Finder
            </Text>

            <Button
                large
                title={ 'LET\'S GET DRUNK!' }
                onPress={ () => navigate('Bars') }
                buttonStyle={ styles.button } />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOURS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor: COLOURS.primary
    }
});

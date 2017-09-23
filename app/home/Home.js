import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Font } from 'expo';

import Text from '../components/Text';
import Button from '../components/Button';
import { COLOURS } from '../styles/consts';

export default class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    async componentDidMount () {
        await Promise.all([
            Font.loadAsync({
                Oswald: require('../../assets/fonts/Oswald-Regular.ttf'),
            }),
            Font.loadAsync({
                'Oswald-Bold': require('../../assets/fonts/Oswald-Bold.ttf'),
            })
        ]);

        this.setState({
            loaded: true
        });
    }

    render () {
        if (!this.state.loaded) { return null; }

        const { navigate } = this.props.navigation;

        return <View style={ styles.container }>
            <Text h1>
                Happy Finder
            </Text>

            <Button
                title={ 'LET\'S GET DRUNK!' }
                onPress={ () => navigate('Establishments') }
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

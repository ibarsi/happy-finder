import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

import { COLOURS } from '../styles/consts';

class LoadingView extends React.Component {
    componentDidMount () {
        this.animation.play();
    }

    render () {
        return <View style={ styles.container }>
            <View style={ styles.spinner }>
                <Lottie
                    ref={animation => { this.animation = animation; }}
                    source={ require('../../assets/lottie/reload.json') }
                    speed={ 0.8 }
                    loop={ true }
                    style={ styles.spinner }
                />
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOURS.background,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    spinner: {
        width: 500,
        height: 500
    }
});

export default LoadingView;

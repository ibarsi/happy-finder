import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { COLOURS } from '../styles/consts';

const CustomButton = ({ style, ...props }) =>
    <Button
        large
        fontFamily={ 'Oswald' }
        buttonStyle={ [ styles.button, style ] }
        { ...props } />;

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLOURS.primary
    }
});

export default CustomButton;

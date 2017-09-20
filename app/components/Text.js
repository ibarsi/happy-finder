import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import { COLOURS } from '../styles/consts';

const CustomText = props => <Text { ...props } style={ [ styles.text, props.style || {} ] } />;

const styles = StyleSheet.create({
    text: {
        color: COLOURS.text,
        fontFamily: 'Oswald'
    }
});

export default CustomText;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

import { COLOURS } from '../styles/consts';

const CustomFormInput = ({ label, isValid, ...props }) =>
    <View>
        { label &&
            <FormLabel labelStyle={ [ styles.label, !isValid && styles.error ] }>
                { label }
            </FormLabel>
        }

        <FormInput
            inputStyle={ [ styles.input, !isValid && styles.error ] }
            containerStyle={{ borderBottomColor: isValid ? COLOURS.text : COLOURS.error }}
            { ...props } />
    </View>;

const styles = StyleSheet.create({
    label: {
        color: COLOURS.text,
        fontFamily: 'Oswald-Bold'
    },
    input: {
        color: COLOURS.text,
        fontFamily: 'Oswald'
    },
    error: {
        color: COLOURS.error
    }
});

export default CustomFormInput;

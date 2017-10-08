import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { merge } from 'lodash';

import FormInput from '../components/FormInput';
import { COLOURS } from '../styles/consts';

class EstablishmentNew extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            inputs: {
                name: {
                    required: true,
                    isValid: true
                }
            }
        };

        this.validate = this._validate.bind(this);
    }

    _validate (input, value) {
        const config = this.state.inputs[ input ];

        const isErronous = config.required && !value;

        this.setState(merge({}, this.state, {
            inputs: {
                [ input ]: {
                    isValid: !isErronous
                }
            }
        }));
    }

    render () {
        const { name } = this.state.inputs;

        return <ScrollView
            style={ styles.scroll }
            contentContainerStyle={ styles.container }>
            <FormInput
                label={ 'Name' }
                isValid={ name.isValid }
                onChangeText={ this.validate.bind(this, 'name') } />
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: COLOURS.background
    },
    container: {
        marginTop: 20
    }
});

export default EstablishmentNew;

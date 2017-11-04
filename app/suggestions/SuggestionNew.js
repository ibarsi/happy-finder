import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Location, Permissions } from 'expo';
import { merge } from 'lodash';

import Text from '../components/Text';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import LoadingView from '../components/LoadingView';
import PermissionWrapper from '../components/PermissionWrapper';
import { getPlacesByLocation } from '../places/places.service';
import { COLOURS } from '../styles/consts';

class SuggestionNew extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            inputs: {
                name: {
                    required: true,
                    isValid: true,
                },
            },
            places: [],
            isLoading: false,
        };

        this.setValue = this._setValue.bind(this);
        this.findPlace = this._findPlace.bind(this);
        this.isInputValid = this._isInputValid.bind(this);
        this.isFindButtonEnabled = this._isFindButtonEnabled.bind(this);
    }

    _setValue (input, value) {
        this.setState(merge({}, this.state, {
            inputs: {
                [ input ]: {
                    isValid: this.isInputValid(input, value),
                    value,
                },
            },
        }));
    }

    async _findPlace () {
        this.setState({
            isLoading: true,
        });

        const location = await Location.getCurrentPositionAsync({});

        const places = await getPlacesByLocation(location, this.state.inputs.name.value);

        this.setState({
            isLoading: false,
            places,
        });
    }

    _isInputValid (input, value) {
        const config = this.state.inputs[ input ];

        const isErronous = config.required && !value;

        return !isErronous;
    }

    _isFindButtonEnabled () {
        return this.isInputValid('name', this.state.inputs.name.value);
    }

    render () {
        const { name } = this.state.inputs;

        return <ScrollView
            style={ styles.scroll }
            contentContainerStyle={ styles.container }>
            <Text
                h4
                style={ styles.title }>
                New Suggestion
            </Text>

            <FormInput
                label={ 'Name' }
                isValid={ name.isValid }
                onChangeText={ this.setValue.bind(this, 'name') } />

            <Button
                title={ 'FIND' }
                onPress={ this.findPlace }
                disabled={ !this.isFindButtonEnabled() || this.state.isLoading }
                style={ styles.button }>
            </Button>

            { this.state.isLoading &&
                <LoadingView />
            }
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: COLOURS.background,
    },
    container: {
        marginTop: 20,
    },
    title: {
        paddingLeft: 20,
    },
    button: {
        marginTop: 20,
    },
});

const SuggestionNewWrapped = PermissionWrapper(SuggestionNew, Permissions.LOCATION);

export default SuggestionNewWrapped;

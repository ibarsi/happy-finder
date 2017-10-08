import React from 'react';
import { ScrollView, Modal, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { merge } from 'lodash';

import Text from '../components/Text';
import FormInput from '../components/FormInput';
import { COLOURS } from '../styles/consts';

const TYPES = [
    'Drink',
    'Food'
];

export default class EstablishmentNewDealModal extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            inputs: {
                description: {
                    required: true,
                    isValid: true
                },
                price: {
                    required: true,
                    numeric: true,
                    isValid: true
                },
                startTime: {
                    required: true,
                    date: true,
                    visible: false,
                    isValid: true
                },
                endTime: {
                    required: true,
                    date: true,
                    visible: false,
                    isValid: true
                },
                type: {
                    value: 0
                }
            }
        };

        this.validateInput = this._validateInput.bind(this);
        this.setValue = this._setValue.bind(this);
        this.setTime = this._setTime.bind(this);
        this.setTimePickerVisibility = this._setTimePickerVisibility.bind(this);
    }

    _validateInput (input, value) {
        const config = this.state.inputs[ input ];

        const required = !config.required || value;
        const numeric = !config.numeric || !Number.isNaN(Number(value));
        const date = !config.date || moment(value).isValid();
        // TODO: Date

        return [ required, numeric, date ].every(validation => validation);
    }

    _setValue (input, value) {
        this.setState(merge({}, this.state, {
            inputs: {
                [ input ]: {
                    isValid: this.validateInput(input, value),
                    value
                }
            }
        }));
    }

    _setTime (input, value) {
        this.setState(merge({}, this.state, {
            inputs: {
                [ input ]: {
                    isValid: this.validateInput(input, value),
                    value: moment(value).format('h:mm A'),
                    visible: false
                }
            }
        }));
    }

    _setTimePickerVisibility (input, visible) {
        this.setState(merge({}, this.state, {
            inputs: {
                [ input ]: {
                    visible
                }
            }
        }));
    }

    render () {
        const { description, type, price, startTime, endTime } = this.state.inputs;

        console.log(this.state.inputs);

        return <Modal
            animationType="slide"
            transparent={ false }
            visible={ this.props.visible || false }
            onClose={ this.props.onClose }>
            <ScrollView
                style={ styles.scroll }
                contentContainerStyle={ styles.container }>
                <Text
                    h4
                    style={ styles.title }>
                    New Deal
                </Text>

                <FormInput
                    label={ 'Description' }
                    isValid={ description.isValid }
                    onChangeText={ this.setValue.bind(this, 'description') } />

                <FormInput
                    label={ 'Price' }
                    isValid={ price.isValid }
                    onChangeText={ this.setValue.bind(this, 'price') } />

                <FormInput
                    label={ 'Start Time' }
                    isValid={ startTime.isValid }
                    onFocus={ this.setTimePickerVisibility.bind(this, 'startTime', true) }
                    value={ startTime.value } />

                <DateTimePicker
                    isVisible={ startTime.visible }
                    mode={ 'time' }
                    is24Hour={ false }
                    onConfirm={ this.setTime.bind(this, 'startTime') }
                    onCancel={ this.setTimePickerVisibility.bind(this, 'startTime', false) } />

                <FormInput
                    label={ 'End Time' }
                    isValid={ endTime.isValid }
                    onFocus={ this.setTimePickerVisibility.bind(this, 'endTime', true) }
                    value={ endTime.value } />

                <DateTimePicker
                    isVisible={ endTime.visible }
                    mode={ 'time' }
                    is24Hour={ false }
                    onConfirm={ this.setTime.bind(this, 'endTime') }
                    onCancel={ this.setTimePickerVisibility.bind(this, 'endTime', false) } />

                <ButtonGroup
                    containerStyle={ styles.buttonGroup }
                    containerBorderRadius={ 0 }
                    buttons={ TYPES }
                    selectedIndex={ type.value }
                    onPress={ this.setValue.bind(this, 'type') } />
            </ScrollView>
        </Modal>;
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: COLOURS.background
    },
    container: {
        marginTop: 20
    },
    title: {
        paddingLeft: 20
    },
    buttonGroup: {
        marginTop: 20
    }
});

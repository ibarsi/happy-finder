import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { merge } from 'lodash';

import EstablishmentNewDealModal from './EstablishmentNewDealModal';
import Text from '../components/Text';
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
            },
            deals: [],
            isNewDealModalVisible: false
        };

        this.validate = this._validate.bind(this);
        this.onModalClose = this._onModalClose.bind(this);
        this.onPressAddNewDeal = this._onPressAddNewDeal.bind(this);
        this.onDealSave = this._onDealSave.bind(this);
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

    _onPressAddNewDeal () {
        this.setState({ isNewDealModalVisible: true });
    }

    _onModalClose () {
        this.setState({ isNewDealModalVisible: false });
    }

    _onDealSave (deal) {
        this.setState({
            deals: this.state.deals.concat([ deal ]),
            isNewDealModalVisible: false
        });
    }

    render () {
        const { name } = this.state.inputs;

        return <ScrollView
            style={ styles.scroll }
            contentContainerStyle={ styles.container }>
            <Text
                h4
                style={ styles.title }>
                New Establishment
            </Text>

            <FormInput
                label={ 'Name' }
                isValid={ name.isValid }
                onChangeText={ this.validate.bind(this, 'name') } />

            <List containerStyle={ styles.list }>
                {
                    this.state.deals.map((deal, index) =>
                        <ListItem
                            key={ index }
                            title={
                                <Text>
                                    { deal.description }
                                </Text>
                            }
                            hideChevron
                            containerStyle={ styles.list } />)
                }

                <ListItem
                    title={
                        <Text>
                            { 'Add Deal' }
                        </Text>
                    }
                    rightIcon={{ type: 'entypo', name: 'plus' }}
                    chevronColor={ COLOURS.text }
                    containerStyle={ styles.list }
                    onPress={ this.onPressAddNewDeal } />
            </List>

            <EstablishmentNewDealModal
                visible={ this.state.isNewDealModalVisible }
                onClose={ this.onModalClose }
                onSave={ this.onDealSave } />
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
    },
    list: {
        borderTopColor: COLOURS.text,
        borderBottomColor: COLOURS.text
    },
    title: {
        paddingLeft: 20
    }
});

export default EstablishmentNew;

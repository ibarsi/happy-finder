import React from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';
import { Location, Permissions } from 'expo';

import { getEstablishmentsByLocation } from './establishments.service';
import EstablishmentListItem from './EstablishmentListItem';
import PermissionWrapper from '../components/PermissionWrapper';
import Text from '../components/Text';
import { COLOURS } from '../styles/consts';

const getEstablishments = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') { return; }

    const location = await Location.getCurrentPositionAsync({});

    const establishments = await getEstablishmentsByLocation(location);

    return establishments
    .filter(establishment => establishment && establishment.name)
    .sort((a, b) => a.distance - b.distance);
};

class Establishments extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            establishments: [],
            refreshing: false
        };

        this.onRefresh = this._onRefresh.bind(this);
    }

    async componentWillMount () {
        const establishments = await getEstablishments();

        if (!establishments) { return; }

        this.setState({
            establishments
        });
    }

    async _onRefresh () {
        this.setState({
            establishments: await getEstablishments()
        });
    }

    _onPress (establishment) {
        const { navigate } = this.props.navigation;

        navigate('EstablishmentDetails', { establishment });
    }

    render () {
        return <ScrollView
            style={ !this.state.establishments.length ? styles.scroll : {} }
            contentContainerStyle={ !this.state.establishments.length ? styles.container : {} }
            refreshControl={
                <RefreshControl
                    refreshing={ this.state.refreshing }
                    onRefresh={ this.onRefresh } />
            }>
            { this.state.establishments.length
                ? <List>
                    {
                        this.state.establishments.map((establishment, index) =>
                            <EstablishmentListItem
                                establishment={ establishment }
                                onPress={ this._onPress.bind(this, establishment) }
                                key={ index } />)
                    }
                </List>
                : <View>
                    <Text
                        h2
                        style={ styles.title }>
                        { 'No results' }
                    </Text>
                    <Text
                        h4
                        style={ styles.title }>
                        { 'Sorry, there aren\'t any deals near you 😔' }
                    </Text>
                </View>
            }
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: COLOURS.background
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
    }
});

const EstablishmentsWrapped = PermissionWrapper(Establishments, Permissions.LOCATION);

export default EstablishmentsWrapped;

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { List } from 'react-native-elements';
import { Location, Permissions } from 'expo';

import { getEstablishmentsByLocation } from './establishments.service';
import EstablishmentListItem from './EstablishmentListItem';
import PermissionWrapper from '../components/PermissionWrapper';

const getEstablishments = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') { return; }

    const location = await Location.getCurrentPositionAsync({});

    const establishments = await getEstablishmentsByLocation(location);

    return establishments.sort((a, b) => a.distance - b.distance);
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
            refreshControl={
                <RefreshControl
                    refreshing={ this.state.refreshing }
                    onRefresh={ this.onRefresh } />
            }>
            <List>
                {
                    this.state.establishments.map((establishment, index) =>
                        <EstablishmentListItem
                            establishment={ establishment }
                            onPress={ this._onPress.bind(this, establishment) }
                            key={ index } />)
                }
            </List>
        </ScrollView>;
    }
}

const EstablishmentsWrapped = PermissionWrapper(Establishments, Permissions.LOCATION);

export default EstablishmentsWrapped;

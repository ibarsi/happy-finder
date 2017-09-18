import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { List } from 'react-native-elements';

import { getEstablishmentsByLocation } from './establishments.service';
import EstablishmentListItem from './EstablishmentListItem';

const getEstablishments = async() => {
    const establishments = await getEstablishmentsByLocation();

    return establishments.sort((a, b) => a.distance - b.distance);
};

export default class Establishments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            establishments: [],
            refreshing: false
        };

        this.onRefresh = this._onRefresh.bind(this);
    }

    async componentWillMount() {
        this.setState({
            establishments: await getEstablishments()
        });
    }

    async _onRefresh() {
        this.setState({
            establishments: await getEstablishments()
        });
    }

    render() {
        return <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={ this.state.refreshing }
                    onRefresh={ this.onRefresh }
                />
            }>
            <List>
                {
                    this.state.establishments.map((establishment, index) =>
                        <EstablishmentListItem establishment={ establishment } key={ index } />)
                }
            </List>
        </ScrollView>;
    }
}

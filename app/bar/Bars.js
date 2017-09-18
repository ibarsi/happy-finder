import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { List } from 'react-native-elements';

import { getBarsByLocation } from './bars.service';
import BarListItem from './BarListItem';

const getLocations = async() => {
    const bars = await getBarsByLocation();

    return bars.sort((a, b) => a.distance - b.distance);
};

export default class Bars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bars: [],
            refreshing: false
        };

        this.onRefresh = this._onRefresh.bind(this);
    }

    async componentWillMount() {
        this.setState({
            bars: await getLocations()
        });
    }

    async _onRefresh() {
        this.setState({
            bars: await getLocations()
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
                    this.state.bars.map((bar, index) => <BarListItem bar={ bar } key={ index } />)
                }
            </List>
        </ScrollView>;
    }
}

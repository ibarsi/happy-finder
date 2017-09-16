import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-elements';

import { getBarsByLocation } from './bars.service';
import BarListItem from './BarListItem';

export default class Bars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bars: []
        };
    }

    async componentWillMount() {
        const bars = await getBarsByLocation()
            .sort((a, b) => a.distance - b.distance);

        this.setState({
            bars
        });
    }

    render() {
        return <View>
            <List>
                {
                    this.state.bars.map((bar, index) => <BarListItem bar={ bar } key={ index } />)
                }
            </List>
        </View>;
    }
}

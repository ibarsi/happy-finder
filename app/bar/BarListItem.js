import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import Text from '../components/Text';
import { COLOURS } from '../styles';

const ICONS = {
    bar: 'md-beer',
    restaurant: 'md-restaurant'
};

const BarListItem = ({ bar }) => {
    if (!bar) { return null; }

    const icon = {
        type: 'ionicon',
        color: COLOURS.text,
        name: ICONS[ bar.type ]
    };

    const distance = `${ bar.distance }km`;

    return <ListItem
        title={
            <Text>
                { bar.name }
            </Text>
        }
        subtitle={
            <Text style={ styles.subTitle }>
                { distance }
            </Text>
        }
        fontFamily={ 'Oswald' }
        leftIcon={ icon }
        chevronColor={ COLOURS.text } />;
};

const styles = StyleSheet.create({
    subTitle: {
        fontFamily: 'Oswald-Bold',
        fontSize: 10
    }
});

export default BarListItem;

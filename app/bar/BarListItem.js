import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

const ICONS = {
    bar: 'md-beer',
    restaurant: 'md-restaurant'
};

const color = 'black';

const BarListItem = ({ bar }) => {
    if (!bar) { return null; }

    const icon = {
        type: 'ionicon',
        color,
        name: ICONS[ bar.type ]
    };

    const distance = `${ bar.distance }km`;

    return <ListItem
        title={
            <Text style={ styles.title }>
                { bar.name }
            </Text>
        }
        subtitle={
            <Text style={ styles.subTitle }>
                { distance }
            </Text>
        }
        leftIcon={ icon }
        chevronColor={ color } />;
};

const styles = StyleSheet.create({
    title: {
        color
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 10
    }
});

export default BarListItem;

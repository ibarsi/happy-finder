import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import Text from '../components/Text';
import { COLOURS } from '../styles';

const ICONS = {
    bar: 'md-beer',
    restaurant: 'md-restaurant'
};

const EstablishmentListItem = ({ establishment }) => {
    if (!establishment) { return null; }

    const icon = {
        type: 'ionicon',
        color: COLOURS.text,
        name: ICONS[ establishment.type ]
    };

    const distance = `${ establishment.distance }km`;

    const dealsSorted = (establishment.deals || []).sort((a, b) => a.price - b.price);

    const priceLow = (dealsSorted[ 0 ] || {}).price;
    const priceHigh = (dealsSorted[ dealsSorted.length - 1 ] || {}).price;
    const priceRange = priceHigh === priceLow ? `$${ priceHigh }` : `$${ priceLow } - $${ priceHigh }`;

    const totalDeals = dealsSorted.length;

    const badge = {
        value: totalDeals,
        containerStyle: styles.badge
    };

    return <ListItem
        title={
            <Text>
                { establishment.name }
            </Text>
        }
        subtitle={
            <View style={ styles.container }>
                <Text style={ [ styles.text, styles.priceRange ] }>
                    { priceRange }
                </Text>
                <Text style={ [ styles.text, styles.divider ] }>
                    |
                </Text>
                <Text style={ styles.text }>
                    { distance }
                </Text>
            </View>
        }
        fontFamily={ 'Oswald' }
        leftIcon={ icon }
        chevronColor={ COLOURS.text }
        badge={ badge } />;
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    text: {
        fontSize: 12
    },
    priceRange: {
        fontFamily: 'Oswald-Bold'
    },
    divider: {
        paddingLeft: 5,
        paddingRight: 5
    },
    badge: {
        marginTop: 7,
        backgroundColor: COLOURS.text
    }
});

export default EstablishmentListItem;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { isNil } from 'lodash';

import { getDistanceString } from './establishments.utils';
import Text from '../components/Text';
import { COLOURS } from '../styles/consts';

const ICONS = {
    bar: 'md-beer',
    restaurant: 'md-restaurant'
};

const EstablishmentListItem = ({ establishment, onPress = () => {} }) => {
    if (!establishment) { return null; }

    const icon = {
        type: 'ionicon',
        color: COLOURS.text,
        name: ICONS[ establishment.type ]
    };

    const distance = getDistanceString(establishment.distance);

    const dealsSorted = (establishment.deals || []).sort((a, b) => a.price - b.price);

    const priceLow = (dealsSorted[ 0 ] || {}).price;
    const priceHigh = (dealsSorted[ dealsSorted.length - 1 ] || {}).price;
    const priceRange = priceHigh === priceLow ? `$${ priceHigh }` : `$${ priceLow } - $${ priceHigh }`;
    const isPriceAvailable = !isNil(priceLow) && !isNil(priceHigh);

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
                { isPriceAvailable &&
                    <Text style={ [ styles.text, styles.priceRange ] }>
                        { priceRange }
                    </Text>
                }

                { isPriceAvailable &&
                    <Text style={ [ styles.text, styles.divider ] }>
                        |
                    </Text>
                }

                { distance &&
                    <Text style={ styles.text }>
                        { distance }
                    </Text>
                }
            </View>
        }
        fontFamily={ 'Oswald' }
        leftIcon={ icon }
        chevronColor={ COLOURS.text }
        badge={ badge }
        onPress={ onPress } />;
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

import React from 'react';
import { Icon } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Establishments from './Establishments';
import EstablishmentDetails from './EstablishmentDetails';
import EstablishmentNew from './EstablishmentNew';
import { COLOURS } from '../styles/consts';

export const TABS = {
    LIST: 'list',
    ADD: 'add'
};

const EstablishmentsListIcon = props =>
    <Icon
        type={ 'entypo' }
        name={ 'list' }
        color={ props.tintColor }
        { ...props } />;

const EstablishmentsAddIcon = props =>
    <Icon
        type={ 'entypo' }
        name={ 'plus' }
        color={ props.tintColor }
        { ...props } />;

const EstablishmentsListNavigator = StackNavigator({
    Establishments: {
        screen: Establishments,
        navigationOptions: {
            title: 'Establishments',
            header: null
        }
    },
    EstablishmentDetails: {
        screen: EstablishmentDetails
    }
});

const EstablishmentsNavigator = TabNavigator(
    {
        List: {
            screen: EstablishmentsListNavigator,
            navigationOptions: {
                tabBarIcon: EstablishmentsListIcon,
            }
        },
        Add: {
            screen: EstablishmentNew,
            navigationOptions: {
                tabBarIcon: EstablishmentsAddIcon,
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: COLOURS.primary,
            inactiveTintColor: COLOURS.text,
            showLabel: false
        }
    }
);

export default EstablishmentsNavigator;

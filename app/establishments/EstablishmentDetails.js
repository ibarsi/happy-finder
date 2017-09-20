import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import moment from 'moment';

import Text from '../components/Text';
import { COLOURS } from '../styles';

const ICONS = {
    drink: 'md-beer',
    food: 'md-restaurant'
};

export default class EstablishmentDetails extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.establishment.name
    });

    constructor(props) {
        super(props);

        const { state } = this.props.navigation;

        this.state = state.params;
    }

    render() {
        const { establishment } = this.state;

        if (!establishment) { return null; }

        const now = moment();

        return <ScrollView>
            {
                establishment.deals
                    .sort((a, b) => moment.utc(moment(b.endTime, 'HH:mm aa').diff(moment(a.endTime, 'HH:mm aa'))))
                    .map((deal, index) => {
                        const cardStyles = [ styles.card ].concat(
                            moment(deal.endTime, 'HH:mm aa').isBefore(now) ? [ styles.disabled ] : []
                        );

                        return <Card
                            key={ index }
                            title={ `$${ deal.price }` }
                            titleStyle={ styles.dealTitle }
                            containerStyle={ cardStyles }>
                            { deal.description &&
                                <Text style={ styles.dealDescription }>
                                    { deal.description }
                                </Text>
                            }

                            { deal.startTime && deal.endTime &&
                                <View style={ styles.dealContainer }>
                                    <Text>
                                        { deal.startTime }
                                    </Text>
                                    <Text>
                                        -
                                    </Text>
                                    <Text>
                                        { deal.endTime }
                                    </Text>
                                </View>
                            }

                            { deal.items &&
                                deal.items.map((item, itemIndex) =>
                                    <ListItem
                                        key={ itemIndex }
                                        title={
                                            <Text>
                                                { item.name }
                                            </Text>
                                        }
                                        leftIcon={
                                            {
                                                type: 'ionicon',
                                                color: COLOURS.text,
                                                name: ICONS[ item.type ]
                                            }
                                        }
                                        hideChevron={ true } />)
                            }
                        </Card>;
                    })
            }
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 0,
        paddingTop: 10
    },
    disabled: {
        opacity: 0.4
    },
    dealContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingLeft: 10
    },
    dealTitle: {
        fontFamily: 'Oswald-Bold',
        color: COLOURS.text,
        fontSize: 20
    },
    dealDescription: {
        paddingLeft: 10
    }
});

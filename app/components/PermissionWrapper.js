import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { Permissions } from 'expo';

import Text from './Text';
import { COLOURS } from '../styles/consts';

const PermissionWrapper = (WrappedComponent, permission) => {
    return class PermissionComponent extends React.Component {
        constructor (props) {
            super(props);

            this.state = {
                permission: true
            };
        }

        async componentWillMount () {
            const { status } = await Permissions.askAsync(permission);

            this.setState({
                permission: status === 'granted'
            });
        }

        render () {
            if (!this.state.permission) {
                const { navigate } = this.props.navigation;

                return <View style={ styles.container }>
                    <Text h2>
                        { 'Oops' }
                    </Text>
                    <Text
                        h4
                        style={ styles.title }>
                        { 'Sorry, but permissions are required to use this feature 😔' }
                    </Text>

                    <View style={ styles.iconContainer }>
                        <Icon
                            reverse
                            type={ 'feather' }
                            name={ 'home' }
                            color={ COLOURS.primary }
                            onPress={ () => navigate('Home') } />

                        <Icon
                            reverse
                            type={ 'feather' }
                            name={ 'settings' }
                            color={ COLOURS.primary }
                            onPress={ () => Linking.openURL('app-settings:') } />
                    </View>
                </View>;
            }

            return <WrappedComponent { ...this.props } />;
        }
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOURS.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        padding: 20,
        marginBottom: 20
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});

export default PermissionWrapper;

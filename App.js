import { StackNavigator } from 'react-navigation';
import Sentry from 'sentry-expo';

import Home from './app/home/Home';
import EstablishmentsNavigator from './app/establishments/EstablishmentsNavigator';
import config from './app/config';
import { isProduction } from './app/utils/env';

if (isProduction()) {
    Sentry.config(config.sentry_url).install();
}

const App = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            header: null
        }
    },
    Establishments: {
        screen: EstablishmentsNavigator,
        navigationOptions: {
            title: 'Establishments',
            header: null
        }
    }
});

export default App;

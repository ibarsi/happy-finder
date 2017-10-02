import { StackNavigator } from 'react-navigation';
import Sentry from 'sentry-expo';

import Home from './app/home/Home';
import Establishments from './app/establishments/Establishments';
import EstablishmentDetails from './app/establishments/EstablishmentDetails';
import config from './app/config';

Sentry.config(config.sentry_dsn).install();

const App = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            header: null
        }
    },
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

export default App;

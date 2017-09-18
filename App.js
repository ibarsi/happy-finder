import { StackNavigator } from 'react-navigation';

import Establishments from './app/establishments/Establishments';
import Home from './app/home/Home';

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
            title: 'Establishments'
        }
    }
});

export default App;

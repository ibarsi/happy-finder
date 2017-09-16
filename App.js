import { StackNavigator } from 'react-navigation';

import Bars from './app/bar/Bars';
import Home from './app/home/Home';

const App = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            header: null
        }
    },
    Bars: {
        screen: Bars,
        navigationOptions: {
            title: 'Bars'
        }
    }
});

export default App;

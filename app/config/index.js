import development from './development';
import production from './production';

let config = {};

switch (process.env.NODE_ENV) {
    case 'development':
        config = development;
        break;
    case 'production':
        config = production;
        break;
    default:
        config = {};
}

export default config;

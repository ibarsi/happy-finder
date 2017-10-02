import development from './development';

let config = {};

switch (process.env.NODE_ENV) {
    case 'development':
        config = development;
        break;
    default:
        config = {};
}

export default config;

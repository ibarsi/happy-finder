import axios from 'axios';

// import establishments from './establishments.json';

export const getEstablishmentsByLocation = async location => {
    const base = 'http://localhost:5000/api/establishments';
    const options = [
        `lat=${ location.coords.latitude }`,
        `lng=${ location.coords.longitude }`
    ];
    const url = `${ base }?${ options.join('&') }`;

    try {
        const response = await axios(url);

        return response.data;
    } catch (error) {
        console.error(error);

        return [];
    }

};

export default {
    getEstablishmentsByLocation
};

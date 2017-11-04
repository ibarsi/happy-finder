import axios from 'axios';

import config from '../config';

export const getPlacesByLocation = async (location, keyword) => {
    const base = `${ config.server_url }/api/places`;
    const options = [
        `lat=${ location.coords.latitude }`,
        `lng=${ location.coords.longitude }`,
        `keyword=${ keyword }`
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
    getPlacesByLocation
};

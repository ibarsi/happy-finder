import moment from 'moment';
import { cloneDeep } from 'lodash';

export const isDealExpired = deal => {
    if (!deal) { return false; }

    const now = moment();

    return moment(deal.endTime, 'HH:mm aa').isBefore(now);
};

export const sortDealsByEndDate = deals => {
    if (!deals) { return []; }

    return cloneDeep(deals)
    .sort((a, b) => moment.utc(moment(b.endTime, 'HH:mm aa').diff(moment(a.endTime, 'HH:mm aa'))));
};

export const getDistanceString = distance => {
    if (Number.isNaN(distance)) { return ''; }

    return distance < 1 ? `${ Math.round(distance * 1000) }m` : `${ distance.toFixed(2) }km`;
};

export default {
    isDealExpired,
    sortDealsByEndDate,
    getDistanceString
};

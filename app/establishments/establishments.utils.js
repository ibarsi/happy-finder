import moment from 'moment';
import { cloneDeep } from 'lodash';

export const isDealExpired = deal => {
    const now = moment();

    return moment(deal.endTime, 'HH:mm aa').isBefore(now);
};

export const sortDealsByEndDate = deals =>
    cloneDeep(deals)
        .sort((a, b) => moment.utc(moment(b.endTime, 'HH:mm aa').diff(moment(a.endTime, 'HH:mm aa'))));

export default {
    isDealExpired,
    sortDealsByEndDate
};

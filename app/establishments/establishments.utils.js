import moment from 'moment';

export const isDealExpired = deal => {
    const now = moment();

    return moment(deal.endTime, 'HH:mm aa').isBefore(now);
};

export const sortDealsByEndDate = (a, b) => moment.utc(moment(b.endTime, 'HH:mm aa').diff(moment(a.endTime, 'HH:mm aa')));

export default {
    isDealExpired,
    sortDealsByEndDate
};

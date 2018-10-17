import moment from 'moment';

const dateFormat = 'YYYY年MM月DD日';
const yearFormat = 'YYYY年';
const monthFormat = 'MM月DD日';

export default date = {
    format(date) {
        return moment(date).format(dateFormat);
    },
    formatTime(time) {
        return moment(time, 'HH:mm:ss').format('HH:mm');
    },
    formatYear(year) {
        return moment(year, 'YYYY').format(yearFormat);
    },
    formatMonth(month) {
        return moment(month, 'MM-DD').format(monthFormat);
    },
    getMonth(dm) {
        return moment(dm, 'MM-DD').format('MM月');
    },
    getDay(dm) {
        return moment(dm, 'MM-DD').format('DD日');
    },
}
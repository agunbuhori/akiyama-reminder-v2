import colors from './resources/colors';
import locale from './resources/locale';
import http from './resources/http';
import dimensions from './resources/dimensions';
import session from './libraries/session';
import date from './libraries/date';

export const env = {
    colors: colors,
    locale: locale,
    http: http,
    dimensions: dimensions
}

export const lib = {
    session: session,
    date: date
}
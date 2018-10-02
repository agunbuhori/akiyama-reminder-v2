import colors from './resources/colors';
import locale from './resources/locale';
import http from './resources/http';
import session from './libraries/session';

export const env = {
    colors: colors,
    locale: locale,
    http: http
}

export const lib = {
    session: session
}
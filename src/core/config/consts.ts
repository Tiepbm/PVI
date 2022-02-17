
export const API_BASE_URL: string = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL:'';

export const INPUT_DEBOUNCE_TIME: number = 400;
export const STANDARD_DATE_FORMAT: string = 'DD/MM/YYYY';
export const STANDARD_DATE_FORMAT3: string = 'DD/MM';
export const STANDARD_TIME_FORMAT: string = 'HH:mm:ss';
export const STANDARD_TIME_FORMAT2: string = 'HH:mm';
export const STANDARD_DATE_TIME_FORMAT: string = `${STANDARD_TIME_FORMAT2} ${STANDARD_DATE_FORMAT}`;
export const DEFAULT_PAGE_SIZE: number = 25;
export const PAGINATION_SIZE = [DEFAULT_PAGE_SIZE, 50, 100];
export const PROFILE_KEY = 'PROFILE';
export const TENANT_KEY = 'TENANT_KEY';
export const TOKEN_KEY = 'M24_TOKEN_KEY';
export const M1_CONNECTION_INFO = 'M1_CONNECTION_INFO';

export const ENSURE_ELECTRIC='tainansudungdien';
export const ENSURE_CAR='tndsoto';
export const ENSURE_HOUSE='nhaotoandien';

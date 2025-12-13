import { environment } from "../../../environments/environment";

const BASE_URL = environment.production? '': "http://localhost:5000";

export const ITEMS_URLS = BASE_URL + '/api/items';
export const ITEMS_BY_SEARCH_URLS = ITEMS_URLS + '/search/';
export const ITEMS_BY_ID_URLS = ITEMS_URLS + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';
export const ORDERS_PAGE_URL = ORDERS_URL + '/track';
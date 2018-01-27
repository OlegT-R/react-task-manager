import {cookies} from '../utils/miscUtils';

const cookieKey = 'tzTestSessionCookie';

const sessionService = function () {
    function login() {
        cookies.setCookie(cookieKey, true);
    }

    function logout() {
        cookies.deleteCookie(cookieKey);
    }

    function isAdmin() {
        return !!cookies.getCookie(cookieKey);
    }

    return {login, logout, isAdmin}
};

export default sessionService();
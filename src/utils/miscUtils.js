import createHistory from 'history/createBrowserHistory';

const history = createHistory();

function setCookie(name, value) {
    document.cookie = name + "=" + value;
}

function getCookie(name) {
    const r = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    if (r) return r[2];
    else return null;
}

function deleteCookie(name) {
    const date = new Date();
    date.setTime(date.getTime() - 1);
    document.cookie = name += "=; expires=" + date.toGMTString();
}

function getTotalPagesCount(count, taskPageSize) {
    return Math.ceil(+count / taskPageSize);
}

function objectToArray(obj) {
    const resultArr = [];
    for (const key in obj) {
        resultArr.push(obj[key]);
    }
    return resultArr;
}

const cookies = {setCookie, getCookie, deleteCookie};

const urls = {
  main: {
      title: 'Main page',
      path: '/'
  },
  login: {
      title: 'Login page',
      path: '/login',
  },
  addingTask: {
      title: 'Task page',
      path: '/task',
  }
};

export {
    cookies,
    urls,
    getTotalPagesCount,
    objectToArray,
    history,
}
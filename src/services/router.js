import {history} from '../utils/miscUtils';
import Login from '../components/app-scenes/login/Login';
import Main from '../components/app-scenes/main/Main';
import Task from '../components/app-scenes/adding-task/AddingTask';
import NotFound from '../components/app-scenes/not-found/notFound';

const routerPaths = {
    main: {
        path: '/',
        component: Main,
    },
    task: {
        path: '/task',
        component: Task,
    },
    login: {
        path: '/login',
        component: Login,
    },
    otherwise: {
        component: NotFound,
    }
};


const router = function (appContext) {

    function getCurrentScene(pathname = window.location.pathname) {
        for (const key in routerPaths) {
            const route = routerPaths[key];
            if (route.path && route.path === pathname) {
                return route.component;
            }
        }

        return routerPaths.otherwise.component;
    }

    history.listen((location, action) => {
        const component = getCurrentScene(location.pathname);
        console.log('newPath', location.pathname);
        appContext.setState({Component: component});
    });


    return {getCurrentScene}
};

export default router;
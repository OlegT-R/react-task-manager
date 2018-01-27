import Login from '../components/app-scenes/login/Login';
import Main from '../components/app-scenes/main/Main';
import Task from '../components/app-scenes/task-scene/TaskScene';
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


const router = function () {

    function getCurrentScene() {
        const pathname = window.location.pathname;

        for (const key in routerPaths) {
            const route = routerPaths[key];
            if (route.path && route.path === pathname) {
                return route.component;
            }
        }

        return routerPaths.otherwise.component;
    }

    return {getCurrentScene}
};

export default router();
import axios from 'axios';
import md5 from 'js-md5';
import apiConfig from '../utils/apiConfig';
import apiError from './apiErrorService';

function createRequestPath(path, param = null) {
    let paramStr = '';
    if (param) {
        for (const key in param) {
            paramStr += `&${key}=${param[key]}`;
        }
    }

    return `${apiConfig.api}/${path}?developer=${apiConfig.developerName}${paramStr}`;
}

function getParamSignature(data) {
    const paramStr = `status=${data.status}&text=${data.text}&token=${apiConfig.token}`;
    return md5(paramStr);
}

async function request(method = 'get', data, path) {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: path,
            data: data,
        })
            .then(function (response) {
                const {data} = response;
                if (data) {
                    if (data.status === 'ok') {
                        resolve(response.data.message || data.status);
                    } else {
                        apiError.parseDataError(response.data.message);
                        resolve(false);
                    }
                } else {
                    apiError.parseHttpError(response);
                }
            })
            .catch(function (error) {
                apiError.parseHttpError(error);
            });
    });
}

function post(data, path = '') {
    const url = createRequestPath(path);
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return request('post', formData, url);
}

function get(data, path = '') {
    const url = createRequestPath(path, data);
    return request('get', null, url);
}


const apiService = function () {
    function createTask(data) {
        return post(data, 'create');
    }

    async function updateTask(data) {
        const sendData = {
            status: data.status,
            signature: getParamSignature(data),
            text: data.text,
            token: apiConfig.token,
        };

        return post(sendData, `edit/${data.id}`);
    }

    async function getTasks(data) {
        return get(data);
    }


    return {createTask, getTasks, updateTask}
};

export default apiService();
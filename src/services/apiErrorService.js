import alertService from './notifyService';

const showErrorTime = 5000;

function parseDataError(error) {
    let errorText = '';

    for (const key in error) {
        errorText += ' ' + error[key];
    }
    alertService.showWarning('Server data warning', errorText, showErrorTime);
}

function parseHttpError(error) {
    //parse network error and server internal error
    const message = (error && error.message) || 'Please try again late';
    alertService.showWarning('Network or internal server error', message, showErrorTime);
}

export default {parseDataError, parseHttpError}
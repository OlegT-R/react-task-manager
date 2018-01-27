import React from 'react';
import ReactDOM from 'react-dom/server';
import Alert from '../components/common/alert/Alert'

function show(type, delay, domElem, title, body) {
    domElem.innerHTML = ReactDOM.renderToString(<Alert show type={type} body={body} title={title}/>);
    const alertContainer = domElem.querySelector('.alert-container');
    if (alertContainer) {
        domElem.classList.add('showed');
    }
    setTimeout(() => {
        domElem.classList.remove('showed');
    }, delay)
}


const notifyService = function () {

    const domElem = document.querySelector('.alert-portal');

    function showInfo(title, body, delay) {
        show(Alert.types.info, delay, domElem, title, body);
    }

    function showSuccess(title, body, delay) {
        show(Alert.types.success, delay, domElem, title, body);
    }

    function showWarning(title, body, delay) {
        show(Alert.types.danger, delay, domElem, title, body);
    }


    return {showInfo, showSuccess, showWarning}
}

export default notifyService();
import React from 'react';
import PropTypes from 'prop-types';

function Body(props) {
    return (
        <div className={`modal ${props.className || ''}`}>
            <div className="popup-inner">
                {props.children}
            </div>
        </div>
    );
}

Body.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

Body.defaultProps = {
    className: '',
};


export default Body;
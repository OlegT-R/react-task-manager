import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
    return (
        <div className={`popup-header ${props.className || ''}`}>
            <div className="popup-title">
                {props.children}
            </div>
            <span className="popup-close-icon" onClick={props.onClose}>&#10006;</span>
        </div>
    );
}

Header.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
};

Header.defaultProps = {
    className: '',
};


export default Header;
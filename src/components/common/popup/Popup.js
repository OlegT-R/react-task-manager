import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Body from './Popup.Body';
import Header from './Popup.Header';
import './popup.scss';

class Popup extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        show: PropTypes.bool,
        onClose: PropTypes.func.isRequired,
    };

    static defaultProps = {
        show: true,
        onClose: () => null,
    };

    constructor(props) {
        super(props);
        this.el = document.querySelector('.popup-portal');
    }

    onClose = (e) => {
        const classList = e.target.classList;

        if (classList.contains('overlay') || classList.contains('modal')) {
            e.stopPropagation();
            this.props.onClose();
        }
    };


    getPopUp = () => {
        const {className, children} = this.props;
        return (
            <div className={`popup ${className || ''}`}>
                <div className="overlay" onClick={this.onClose}>
                    {children}
                </div>
            </div>
        );
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return ReactDOM.createPortal(
            this.getPopUp(),
            this.el,
        );
    }
}

Popup.Body = Body;
Popup.Header = Header;

export default Popup;

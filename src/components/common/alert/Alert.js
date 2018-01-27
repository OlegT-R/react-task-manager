import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';
import './alert.scss';


const alertTypes = {
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    info: 'info',
    default: 'default',
    primary: 'primary',
    link: 'link',
};

export default class AlertInformer extends React.PureComponent {
    static propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        body: PropTypes.string,
        show: PropTypes.bool,
    };

    static defaultProps = {
        show: true,
        title: 'Title',
        body: 'Body Title',
        type: alertTypes.info,
    };

    static types = alertTypes;

    render() {
        const {type, title, body, show} = this.props;
        if (!show) {
            return null;
        }
        return (
            <div className="alert-container">
                <Alert bsStyle={type}>
                    <h4>{title}</h4>
                    <p>
                        {body}
                    </p>
                </Alert>
            </div>
        );
    }
}

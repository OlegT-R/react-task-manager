import React from 'react';
import './login.scss';
import sessionService from '../../../services/sessionService';
import notifyService from "../../../services/notifyService";
import {urls} from '../../../utils/miscUtils';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';

const credentials = {
    username: 'admin',
    password: '123',
};


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasError: false,
        };
        if (sessionService.isAdmin()) {
            window.location.href = urls.main;
        }
    }

    validateName = () => {
        const length = this.state.username.length;
        if (length >= 2) return 'success';
        else if (length > 0) return 'error';
        return null;
    };

    handleChange = (e, type) => {
        this.state[type] = e.target.value;
        this.forceUpdate();
    };

    onLogin = () => {
        const {password, username} = this.state;
        if (password === credentials.password && username === credentials.username) {
            sessionService.login();
            notifyService.showSuccess('Hi admin', 'You successfully entered as admin', 4000);
            setTimeout(() => window.location.href = urls.main, 3000);
            this.setState({hasError: false});
        } else {
            this.setState({hasError: true, username: '', password: ''});
        }
    };

    render() {
        const {username, password, hasError} = this.state;

        return (

            <div className="login">
                <form>
                    <FormGroup
                        controlId="formName"
                        validationState={this.validateName()}>
                        <ControlLabel>Enter your name*</ControlLabel>
                        <FormControl
                            type="text"
                            value={username}
                            placeholder="Enter name"
                            onChange={(e) => this.handleChange(e, 'username')}
                        />
                    </FormGroup>
                    <FormGroup
                        controlId="formPassword">
                        <ControlLabel>Enter password*</ControlLabel>
                        <FormControl
                            type="password"
                            value={password}
                            placeholder="Enter email"
                            onChange={(e) => this.handleChange(e, 'password')}
                        />
                    </FormGroup>
                    {hasError && <div className="error fl-l">Wrong username or password</div>}
                    <Button className="fl-r" bsStyle="success" onClick={() => this.onLogin()}
                            disabled={username === '' || password === ''}>Login</Button>

                    <div className="clearfix"/>
                </form>
            </div>
        );
    }
}

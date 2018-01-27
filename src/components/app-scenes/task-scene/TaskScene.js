import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import imageService from '../../../services/imageService';
import Popup from '../../common/popup/Popup';
import apiService from "../../../services/apiService";
import notifyService from "../../../services/notifyService";
import Task from '../../common/task/task';
import {urls} from '../../../utils/miscUtils';
import './task-scene.scss';

const imageSize = {
    width: 320,
    height: 240,
};

const requiredFieldsCount = 3;

export default class TaskScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            file: null,
            text: '',
            canSave: false,
            show: false,
        }
    }

    componentDidUpdate() {
        const canSave = this.canSave();
        if (this.state.canSave !== canSave) {
            this.setState({
                canSave: canSave,
            })
        }
    }

    validateName = () => {
        const length = this.state.username.length;
        if (length >= 2) return 'success';
        else if (length > 0) return 'error';
        return null;
    };

    validateMail = () => {
        const regExp = /^.*?@\w+\.\w{2,5}$/;
        const result = regExp.test(this.state.email);
        if (this.state.email !== '') {
            return result ? 'success' : 'error';
        } else {
            return null;
        }
    };

    validateFile = () => {
        if (this.state.file && !this.state.file.fileType.match(/image.*/)) {
            return 'error';
        } else {
            return this.state.file ? 'success' : null;
        }
    };

    handleChange = (e, type) => {
        this.state[type] = e.target.value;
        this.forceUpdate();
    };

    onFileChange = async (e) => {
        const file = e.target.files[0];
        const {blob: image, dataURL} = await imageService.resize(file, imageSize.width, imageSize.height);
        this.state.file = {
            data: image,
            fileType: file.type,
        };
        this.state.dataURL = dataURL;
        this.forceUpdate();
    };

    onSave = async () => {
        this.setState({busy: true});
        const data = {
            image: this.state.file.data,
            username: this.state.username,
            email: this.state.email,
            text: this.state.text,
        };
        const result = await apiService.createTask(data);
        if (result) {
            notifyService.showSuccess('Success', 'Your task was successfully added', 4000);
            setTimeout(() => window.location.href = urls.main, 3000);
        }
    };

    canSave = () => {
        if (this.form) {
            const hasError = this.form.querySelector('.has-error');
            const successFields = this.form.querySelectorAll('.has-success');
            if (!hasError && (successFields && successFields.length === requiredFieldsCount)) {
                return true;
            }
        }
        return false;
    };

    getPopUp() {
        const {show, dataURL, username, email, text} = this.state;
        const task = {
            username: username,
            email: email,
            text: text,
            image_path: dataURL,
        };
        return (
            <Popup className="modal-add" show={show} onClose={() => this.setState({show: false})}>
                <Popup.Body>
                    <span className="popup-close-icon" onClick={() => this.setState({show: false})}>&#10006;</span>
                    <Task task={task}/>
                </Popup.Body>
            </Popup>
        )
    }


    render() {
        const {username, email, canSave, busy} = this.state;

        return (

            <div className="task-scene">
                <div className="back-button-container">
                    <Button bsStyle="primary" onClick={() => window.location.href = urls.main}>Back</Button>
                </div>
                <form ref={(form) => this.form = form}>
                    <Row>
                        <Col sm={6} xs={12}>
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
                        </Col>
                        <Col sm={6} xs={12}>
                            <FormGroup
                                controlId="formEmail"
                                validationState={this.validateMail()}>
                                <ControlLabel>Enter your email*</ControlLabel>
                                <FormControl
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => this.handleChange(e, 'email')}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="textarea-container">
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Enter your task</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Task" value={this.state.text}
                                         onChange={(e) => this.handleChange(e, 'text')}/>
                        </FormGroup>
                    </div>
                    <div className="add-file-container">
                        <FormGroup controlId="formControlsFile" validationState={this.validateFile()}>
                            <ControlLabel>Add image*</ControlLabel>
                            <FormControl type="file" accept="image/jpeg,image/png,image/gif"
                                         onChange={this.onFileChange}/>
                        </FormGroup>
                    </div>
                    <Button className="fl-r" bsStyle="success" onClick={() => this.onSave()}
                            disabled={!canSave || busy}>Save</Button>
                    <Button className="fl-l" bsStyle="primary" onClick={() => this.setState({show: true})}
                            disabled={!canSave}>Preview</Button>
                    <div className="clearfix"/>
                </form>
                {this.getPopUp()}
            </div>
        );
    }
}

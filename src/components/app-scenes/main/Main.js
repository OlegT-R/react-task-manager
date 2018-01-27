import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Row from 'react-bootstrap/lib/Row';
import Pagination from '../../common/pagination/pagination';
import Task from '../../common/task/task';
import Popup from '../../common/popup/Popup';
import TaskEditor from '../../common/task-editor/taskEditor';
import apiService from '../../../services/apiService';
import sessionService from '../../../services/sessionService';
import {getTotalPagesCount, objectToArray, urls} from '../../../utils/miscUtils';
import notifyService from "../../../services/notifyService";
import './main-scene.scss';
import spinner from '../../../assets/logo.svg';


const sortFields = {
    username: 'username',
    email: 'email',
    status: 'status',
};

const direction = {
    asc: 'asc',
    desc: 'desc',
};

const taskPageSize = 3;

async function loadTasks(page, sort, sortDirection) {
    const data = {
        sort_field: sort,
        page: page,
        sort_direction: sortDirection,
    };

    const {tasks, total_task_count} = await apiService.getTasks(data);
    return {tasks, total_task_count};
}

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: null,
            editedTask: null,
            sort: sortFields.username,
            sortDirection: direction.asc,
            page: 1,
            totalTaskCount: 0,
            show: false,
        };
    }

    async componentDidMount() {
        const {sort, sortDirection, page} = this.state;
        const {tasks, total_task_count} = await loadTasks(page, sort, sortDirection);
        this.setState({tasks, totalTaskCount: total_task_count});
    }

    onChange = async (type, data) => {
        this.state[type] = data;
        const {sort, sortDirection, page} = this.state;
        this.setState({tasks: null});
        const {tasks, total_task_count} = await loadTasks(page, sort, sortDirection);
        this.setState({tasks, totalTaskCount: total_task_count});
    };

    onLoginLink = () => {
        if (sessionService.isAdmin()) {
            sessionService.logout();
            this.forceUpdate();
        } else {
            window.location.href = urls.login;
        }
    };

    showTaskEditor = (task) => {
        this.setState({show: true, editedTask: task});
    };

    onTaskUpdate = async (task) => {
        const {tasks} = this.state;
        this.setState({show: false, editedTask: null});
        const result = await apiService.updateTask(task);
        if (result) {
            notifyService.showSuccess('Success', `Task #${task.id} was success updated`, 5000);
            const taskIndex = tasks.findIndex((item) => item.id === task.id);
            tasks[taskIndex] = task;
            this.setState({tasks: [...tasks]});
        }
    };

    getPopUp() {
        const {show, editedTask} = this.state;
        return (
            <Popup className="modal-add" show={show} onClose={() => this.setState({show: false})}>
                <Popup.Body>
                    <span className="popup-close-icon" onClick={() => this.setState({show: false})}>&#10006;</span>
                    <TaskEditor task={editedTask} onUpdate={this.onTaskUpdate}/>
                </Popup.Body>
            </Popup>
        )
    }

    render() {
        const {tasks, page, totalTaskCount, sort, sortDirection} = this.state;
        if (!tasks) return <img alt='loading' src={spinner} className="react-spinner"/>;
        return (
            <div className="main-scene">
                <div className="login-link"
                     onClick={() => this.onLoginLink()}>{sessionService.isAdmin() ? 'Logout' : 'Login'}</div>
                <div className="add-button-container">
                    <Button bsStyle="primary" onClick={() => window.location.href = urls.addingTask}>Add task</Button>
                </div>
                <div className="sort-container">
                    <DropdownButton
                        bsStyle='default'
                        title='Sort field'
                        id="sort_field">
                        {objectToArray(sortFields).map((item, index) =>
                            <MenuItem onSelect={(val) => this.onChange('sort', val)} key={index} eventKey={item}
                                      active={item === sort}>{item}</MenuItem>
                        )}
                    </DropdownButton>
                    <DropdownButton
                        bsStyle='primary'
                        title='Sort direction'
                        id="sort_direction">
                        {objectToArray(direction).map((item, index) =>
                            <MenuItem onSelect={(val) => this.onChange('sortDirection', val)} key={index}
                                      eventKey={item}
                                      active={item === sortDirection}>{item}</MenuItem>
                        )}
                    </DropdownButton>
                </div>
                <div className="clearfix"/>
                <Row>
                    {tasks.map((task, index) =>
                        <Col xs={12} md={4} key={index}>
                            <Task task={task} isAdmin={sessionService.isAdmin()}
                                  onEdit={() => this.showTaskEditor(task)}/>
                        </Col>
                    )}
                </Row>
                <div className="pager-container">
                    <Pagination currPage={page}
                                pageCount={getTotalPagesCount(totalTaskCount, taskPageSize)}
                                onChangePage={(val) => this.onChange('page', val)}/>
                </div>

                {this.getPopUp()}
            </div>
        );
    }
}

import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import FormControl from 'react-bootstrap/lib/FormControl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import './task-editor.scss';

export default class Main extends React.PureComponent {

    static propTypes = {
        task: PropTypes.object,
        onUpdate: PropTypes.func.isRequired,
    };

    static defaultProps = {
        task: {},
        onUpdate: () => null,
    };

    constructor(props) {
        super(props);
        this.state = {
            task: props.task || {},
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.task && nextProps.task !== this.props.task) {
            this.setState({task: nextProps.task});
        }
    }


    onChangeText = (e) => {
        this.state.task.text = e.target.value;
        this.forceUpdate();
    };

    onChangeStatus = (status) => {
        this.state.task.status = status;
        this.forceUpdate();
    };


    render() {
        const {task} = this.state;
        return (
            <div className="task-editor">
                <FormControl componentClass="textarea" placeholder="Task" value={task.text}
                             onChange={(e) => this.onChangeText(e)}/>
                <div className="dropdown-container">
                    <DropdownButton
                        bsStyle='default'
                        title='Status'
                        id="sort_field">
                        <MenuItem onSelect={() => this.onChangeStatus(0)} eventKey={0} active={task.status === 0}>Not
                            checked</MenuItem>
                        <MenuItem onSelect={() => this.onChangeStatus(10)} eventKey={10}
                                  active={task.status === 10}>Checked</MenuItem>
                    </DropdownButton>
                </div>
                <Button className="fl-r" bsStyle="primary" onClick={() => this.props.onUpdate(task)}>Update task</Button>
                <div className="clearfix"/>
            </div>
        );
    }
};
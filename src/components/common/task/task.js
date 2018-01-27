import React from 'react';
import PropTypes from 'prop-types';
import './task.scss';

const maxTextLength = 200;

const task = ({task, onEdit, isAdmin}) => {
    const cuttedText = task.text.length > maxTextLength ? task.text.slice(0, maxTextLength) + '...' : task.text;
    return (
        <div className="task">
            <div className="image-container">
                <img src={task.image_path} alt=''/>
                <div className="name cut-text" title={task.username}>{task.username}</div>
                <div className="email cut-text" title={task.email}>{task.email}</div>
            </div>
            <div className="text-container" title={task.text}>
                {cuttedText}
            </div>
            {task.status === 10 && <span className="checked">&#10004;</span>}
            {isAdmin && <span className="edit" onClick={onEdit}>&#9998;</span>}
        </div>
    );
};

task.propTypes = {
    task: PropTypes.object.isRequired,
    onEdit: PropTypes.func,
    isAdmin: PropTypes.bool,
};

export default task;
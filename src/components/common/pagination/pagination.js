import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/lib/Pagination';
import './pagination.scss';

const pagination = ({pageCount, currPage, onChangePage}) => {

    const items = [];
    for (let number = 1; number <= pageCount; number++) {
        items.push(
            <Pagination.Item active={number === currPage} onClick={() => onChangePage(number)}>{number}</Pagination.Item>
        );
    }


    return (
        <div className="pagination">
            <Pagination bsSize="small">{items}</Pagination>
        </div>
    );
};

pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    currPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func,
};

export default pagination;
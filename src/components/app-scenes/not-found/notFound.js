import React from 'react';
import spinner from '../../../assets/logo.svg';


export default function () {
    return (
        <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '30px', paddingBottom: '20px'}}>Page not found :(</div>
            <img src={spinner} alt="" className="react-spinner"/>
        </div>
    )
}

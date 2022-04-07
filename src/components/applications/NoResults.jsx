import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../data/images/logo.svg'
import './styles/NoResults.css'

const NoResults = ({ description, action }) => {
    return (
        <div className='no_results_container'>
            <div className='no_results_logo' style={{ backgroundImage: `url(${Logo})` }}></div>
            <p>{description}</p>
            {action ? <Link to="/applications"><button className='no_results_action'>{action}</button></Link> : null}
        </div>
    );
};

export default NoResults;

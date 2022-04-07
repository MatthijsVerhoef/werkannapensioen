import React from 'react';
import AccountContent from '../../components/account/AccountContent';
import Extras from '../../components/account/Extras';
import Reviews from '../../components/account/Reviews';
import './styles.css'

const Account = () => {
    return (
        <div className='account_page'>
            <Extras />
            <AccountContent />
            <Reviews />
        </div>
    );
};

export default Account;

import React from 'react';
import Header from '../components/shared/Header';

const Layout = (props) => {
    console.log('LAYOUT: ', props)
    return (
        <div>
            <Header />
            <div className='container'>
                {props.children}
            </div>
        </div>
    );
};

export default Layout;
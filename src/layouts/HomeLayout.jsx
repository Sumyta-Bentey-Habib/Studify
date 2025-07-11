import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='pt-25 min-h-[calc(100vh-68px)]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default HomeLayout;
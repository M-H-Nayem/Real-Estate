import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Outlet } from 'react-router';

const MainPage = () => {
    return (
        <div className='bg-gradient-to-tl from-gray-200  via-gray-100 to-gray-200'>
            <Navbar></Navbar>
            <div className="min-h-screen"><Outlet></Outlet></div>
            <div className="z-10"><Footer></Footer></div>
        </div>
    );
};

export default MainPage;
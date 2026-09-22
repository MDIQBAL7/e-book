import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../Nabbar/Nav';
import Footer from '../Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
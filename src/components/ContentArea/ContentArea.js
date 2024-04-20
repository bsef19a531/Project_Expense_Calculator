import React from 'react'
// import { Outlet } from 'react-router-dom'
import './ContentArea.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Stats from '../../pages/Stats/Stats';
import AboutUs from '../../pages/AboutUs/AboutUs';

const ContentArea = () => {
    return (
        <div className='container_area'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
        </div >
    )
}

export default ContentArea
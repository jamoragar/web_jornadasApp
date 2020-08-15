import React from 'react';

import Donaciones from '../Doanciones/Donaciones';
import HeroSection from '../Home/Layout/HeroSection/HeroSection';
import Features from '../Home/Layout/Features/Features';
import Footer from '../Home/Layout/Footer/Footer';

const Home = () => {
    return(
        <div className=''>
            <div id="scrollUp" title="Scroll To Top">
                <i className="fas fa-arrow-up" />
            </div>
            <HeroSection />
            <h1>Home Component...</h1>
            <Donaciones />
            <Features />
            <Footer />
        </div>
    )
};

export default Home;
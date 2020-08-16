import React from 'react';

import Donaciones from '../Doanciones/Donaciones';
import HeroSection from '../Home/Layout/HeroSection/HeroSection';
import Features from '../Home/Layout/Features/Features';
import Discover from '../Home/Layout/Discover/Discover';
import Download from '../Home/Layout/Download/Download';
import Work from './../Home/Layout/Work/Work';
import Footer from '../Home/Layout/Footer/Footer';

const Home = () => {
    return(
        <div className=''>
            <div id="scrollUp" title="Scroll To Top">
                <i className="fas fa-arrow-up" />
            </div>
            <HeroSection />
            {/* <Donaciones /> */}
            <Features />
            <Download />
            <Discover />
            <Work />
            <Footer />
        </div>
    )
};

export default Home;
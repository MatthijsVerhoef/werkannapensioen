import { useState } from 'react';
import Footer from '../components/constants/Footer';
import Header from '../components/home/header/Header';
import { Hero } from '../components/home/Hero';
import Login from '../components/constants/login/Login'

const Home = () => {
    const [showLogin, setShowLogin] = useState(false)

    return (
        <div>
            {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
            <Header setShowLogin={setShowLogin} />
            <Hero setShowLogin={setShowLogin} />
            <Footer />
        </div>
    );
};

export default Home;

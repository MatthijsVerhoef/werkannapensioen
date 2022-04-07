import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../data/Firebase';
import './Styles/Hero.css'

export const Hero = ({ setShowLogin }) => {
    const [currentUser] = useAuthState(auth)

    return (
        <div className="home_container">
            <h1><b>Werken na je pensioen</b>.nl</h1>
            <p>Bij "Werken na je pensioen" is het mogelijk om jouw passie te blijven beoefenen voor zo lang als jij wilt. Direct contact met bedrijven die experts zoals jij nodig hebben voor opkomende projecten en bedrijfsfuncties. Reageer op een vacature en ga terug het werkveld in.</p>
            <div className="content">
                <div className="grid_devider">
                    <div className="grid_1">
                        <div className="cardBig a grid_span_2">
                            <p>Dashboard</p>
                            <h3>Klaar om weer het werkveld in te gaan? Maak een account aan en vind jouw droombaan</h3>
                            <button className="heroNavBtn">Zoeken naar banen</button>
                        </div>
                        <div className="cardSmall b">
                            <p>De voordelen</p>
                            <h3>Waarom "Werken na je pensioen" iets voor jou is</h3>
                            <button className="heroNavBtnWhite">Bekijk de voordelen</button>
                        </div>
                        <div className="cardSmall c">
                            <p>Over ons</p>
                            <h3>Lees meer over het team en onze visie</h3>
                            <button className="heroNavBtn">Meer lezen</button>
                        </div>
                    </div>
                    <div className="grid_2">
                        <div className="cardSmall d">
                            <p>Hoe het werkt</p>
                            <h3>Dit is hoe "Werken na je pensioen" te werk gaat</h3>
                            <button className="heroNavBtn">Meer lezen</button>
                        </div>
                        <div className="cardSmall e">
                            <p>Opdracht plaatsen</p>
                            <h3>Plaats nu een opdracht in slechts 6 stappen</h3>
                            <Link to="/plaatsen"><button className="heroNavBtn">Opdracht plaatsen</button></Link>
                        </div>
                        <div className="cardBig f grid_span_2">
                            <p>Voor bedrijven</p>
                            <h3>Wat wij kunnen betekenen voor jouw bedrijf</h3>
                            <button className="heroNavBtnWhite">Voor bedrijven</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

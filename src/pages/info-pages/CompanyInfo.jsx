import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '../../components/home/header/Header';
import { auth } from '../../data/Firebase';
import './info.css'

const CompanyInfo = () => {
    const [currentUser] = useAuthState(auth)
    
    return (
        <div className="info_page">
            <Header currentUser={currentUser} />
            <div className="info_page_container">
                <h1><b>Werken na je pensioen</b>.nl</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,</p>
                <div className="devider_container">
                    <div className="devider"></div>
                    <p>Voor bedrijven</p>
                    <div className="devider"></div>
                </div>
                <div className="info_page_content">
                    <p className="info_page_content_title">Tijdelijk contract</p>
                    <p className="info_page_content_text">Als werkgever kan je een AOW-er 6 tijdelijke contracten geven binnen een periode van 4 jaar voordat er recht is op een vast contract. De reguliere richtlijnen hiervoor zijn 3 tijdelijke contracten in een periode van 3 jaar</p>
                    <p className="info_page_content_title">Opzegtermijn</p>
                    <p className="info_page_content_text">De opzegtermijn voor de arbeidsovereenkomst duurt standaard een maand.</p>
                    <p className="info_page_content_title">Transitievergoeding</p>
                    <p className="info_page_content_text">Wanneer een AOW gerechtigde ontslagen wordt hoef je als werkgever geen transitievergoeding te betalen.</p>
                    <p className="info_page_content_title">Premies</p>
                    <p className="info_page_content_text">Als werkgever krijg je een expert in het gekozen vak voor lagere loonkosten. Dit komt doordat de werkgeverslasten wegvallen bij een AOW’er. Premies zoals de Werkloosheidswet (WW), Wet op de arbeidsongeschiktheidsverzekering (WAO), Ziektewet (ZW), Algemene ouderdomswet (AOW) en Wet werk en inkomen naar arbeidsvermogen (WIA) hebben geen betrekking op een AOW’er.</p>
                    <p className="info_page_content_title">Ziekte</p>
                    <p className="info_page_content_text">Een AOW-er heeft bij ziekte maximaal 13 weken recht op loondoorbetaling in plaats van 104 weken. Dit zorgt ervoor dat de re-integratie verplichtingen ook worden teruggebracht naar 13 weken. Na 13 weken ziekte komt het opzegverbod ten einde en is ontslag mogelijk</p>
                    <p className="info_page_content_title">Sociaal</p>
                    <p className="info_page_content_text">Wanneer je door blijft werken blijf je sociaal actief. Dit zorgt ervoor dat het contact met de mensen om je heen makkelijker onderhouden kan worden. Je blijft onder de mensen en voorkomt isolement. Ook blijf je in beweging waardoor je vitaal blijft en fysieke ongemakken worden voorkomen.</p>
                </div>
                <button className="create_account">Maak een account aan</button>
            </div>
        </div>
    );
};
export default CompanyInfo;

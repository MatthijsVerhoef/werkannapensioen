import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../../components/home/header/Header";
import { auth } from "../../data/Firebase";
import './info.css'

const EmployeeInfo = () => {
    const [currentUser] = useAuthState(auth)
    return (
        <div className="info_page">
            <Header currentUser={currentUser} />
            <div className="info_page_container">
                <h1><b>Werken na je pensioen</b>.nl</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,</p>
                <div className="devider_container">
                    <div className="devider"></div>
                    <p>Voor werknemers</p>
                    <div className="devider"></div>
                </div>
                <div className="info_page_content">
                    <p className="info_page_content_title">AOW-premie</p>
                    <p className="info_page_content_text">Als werknemer hoef je na je pensioen geen AOW-premie meer te betalen. Dit zorgt ervoor dat je netto meer salaris overhoudt om te besteden aan andere dingen.</p>
                    <p className="info_page_content_title">Aanvullend pensioen</p>
                    <p className="info_page_content_text">Je hebt zelf de keuze of je aanvullend pensioen gelijk ingaat. Dit betekent dat je:
                        - Het aanvullende pensioen kan startten vanaf het moment dat je AOW gerechtigd bent.
                        - Het aanvullend pensioen uitgesteld kan worden (met een maximum van 5 jaar) zodat het pensioen hoger is wanneer jij
                        besluit met pensioen te gaan.
                        - Het aanvullend pensioen zelf ingedeeld kan worden. Je ontvangt dan bijvoorbeeld de eerste Jaren een lager bedrag en over
                        de jaren heen gaat dit omhoog.
                        Ook blijf je werknemers pensioen opbouwen terwijl je het tegelijkertijd ontvangt.</p>
                    <p className="info_page_content_title">Belasting</p>
                    <p className="info_page_content_text">Wanneer je de AOW leeftijd bereikt val je in een lager belastingtarief. Als je besluit door te werken houd je netto meer over van het ongewijzigde bruto-inkomen.</p>
                    <p className="info_page_content_title">Sociaal</p>
                    <p className="info_page_content_text">Wanneer je door blijft werken blijf je sociaal actief. Dit zorgt ervoor dat het contact met de mensen om je heen makkelijker onderhouden kan worden. Je blijft onder de mensen en voorkomt isolement. Ook blijf je in beweging waardoor je vitaal blijft en fysieke ongemakken worden voorkomen.</p>
                    <p className="info_page_content_title">AOW-premie</p>
                    <p className="info_page_content_text">Als werknemer hoef je na je pensioen geen AOW-premie meer te betalen. Dit zorgt ervoor dat je netto meer salaris overhoudt om te besteden aan andere dingen.</p>
                    <p className="info_page_content_title">Sociaal</p>
                    <p className="info_page_content_text">Wanneer je door blijft werken blijf je sociaal actief. Dit zorgt ervoor dat het contact met de mensen om je heen makkelijker onderhouden kan worden. Je blijft onder de mensen en voorkomt isolement. Ook blijf je in beweging waardoor je vitaal blijft en fysieke ongemakken worden voorkomen.</p>
                </div>
                <button className="create_account">Maak een account aan</button>
            </div>
        </div>
    );
};

export default EmployeeInfo;

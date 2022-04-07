import React from 'react';
import { useState } from 'react'
import './styles.css'
import { FiCheck } from 'react-icons/fi'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import Autocomplete from './Autocomplete.jsx'
import { auth, db, timeStamp } from '../../data/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

const Form = () => {
    const [currentUser] = useAuthState(auth)
    const [formStep, setFormStep] = useState(0)
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [kvk, setKvk] = useState("")
    const [applicationType, setApplicationType] = useState("")
    const [hours, setHours] = useState("")
    const [address, setAddress] = useState("")
    const [geopoint, setGeoPoint] = useState({ lat: "", lng: "" })
    const [jobTitle, setJobTitle] = useState("")
    const [graduateLevel, setGraduateLevel] = useState("")
    const [experience, setExperience] = useState("")
    const [description, setDescription] = useState("")
    const [salary, setSalary] = useState(0)
    // States moeten nog worden verwerkt in database
    const [projectCost, setProjectCost] = useState(0)
    const [projectPeriod, setProjectPeriod] = useState("")

    const completeFormStep = () => {
        setFormStep(cur => cur + 1)
    }

    useEffect(() => {
        currentUser ?
            setEmail(currentUser?.email) && setTel(currentUser?.tel)
            :
            setEmail("") && setTel("")
    }, [currentUser])

    const createApplication = (e) => {
        if (!email || !tel || !companyName || !kvk || !applicationType || !hours || !address || !jobTitle || !graduateLevel || !experience || !description) {
            alert("It looks like you mist the a field, make sure everything is filled out correctly")
            e.preventDefault()
        } else {
            db.collection('posts').add({
                timestamp: timeStamp,
                email: email,
                tel: tel,
                companyName: companyName,
                kvk: kvk,
                applicationType: applicationType,
                hours: hours,
                address: address,
                geopoint: geopoint,
                jobTitle: jobTitle,
                graduateLevel: graduateLevel,
                experience: experience,
                description: description,
                salary: salary,
                placedby: currentUser.uid
            })
            e.preventDefault()
            setEmail("");
            setTel("");
            setCompanyName("");
            setKvk("");
            setApplicationType("");
            setHours("");
            setAddress("")
            setGeoPoint({ lat: "", lng: "" })
            setJobTitle("")
            setGraduateLevel("")
            setExperience("")
            setDescription("")
            setSalary(0)
        }
    }

    return (
        <form>
            <div className="background">
                <h1>Plaats een vacature in 6 stappen ({formStep}/6)</h1>
                {formStep === 0 ? (
                    <div className="form_container">
                        <h3>Informatie</h3>
                        <p>In slechts 6 stappen plaatst u een vacature met alle informatie die nodig is om een applicant een duidelijk beeld te geven over de verwachtingen van uw opdracht.</p>
                        <p>Vul alle velden in zodat de best passende match voor uw opdracht gevonden kan worden. Tevreden met een stap? Klik op volgende om naar de volgende stap te gaan. Wilt u na het invullen toch nog dingen wijzigen? Dan klikt u simpelweg op de stap waar u aanpassingen in wilt doen. Dit brengt u terug naar deze stap.</p>
                        <button className="form_button" onClick={completeFormStep}>Volgende stap</button>
                    </div>
                ) : (
                    <div className="form_collapsed" onClick={() => setFormStep(0)}>
                        <h2>Informatie</h2>
                        {formStep > 0 ? <FiCheck size="2.2em" color="#4AC138" className="step_completed" /> : null}
                    </div>
                )}

                {formStep === 1 ? (
                    <div className="form_container">
                        <h3>Account gegevens</h3>
                        <p>Om een vacature te plaatsen moeten we uw account verifieren. Controleer de gegevens van het account waar u een advertentie op wilt plaatsen.</p>
                        <span>Email</span>
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                        {currentUser?.email === email ? <p className="warning"><AiFillCheckCircle size="1.2em" color="#4AC138" className="step_completed" style={{ paddingRight: 10 }} />Email adres geverifieerd</p> : <p className="warning"><AiFillCloseCircle size="1.2em" color="#F23A5F" style={{ paddingRight: 10 }} />Email addressen komt niet overeen</p>}
                        <span>Telefoonnummer</span>
                        <input type="number" placeholder="Telefoonnummer" onChange={(e) => setTel(e.target.value)} value={tel}></input>
                        {currentUser?.tel === tel ? <p className="warning"><AiFillCheckCircle size="1.2em" color="#4AC138" className="step_completed" style={{ paddingRight: 10 }} />Telefoonnummer geverifieerd</p> : <p className="warning"><AiFillCloseCircle size="1.2em" color="#F23A5F" style={{ paddingRight: 10 }} />Telefoonnummers komen niet overeen</p>}
                        <button className="form_button" onClick={completeFormStep}>Volgende stap</button>
                    </div>
                ) : (
                    <div className="form_collapsed" onClick={() => setFormStep(1)}>
                        <h2>Account gegevens</h2>
                        {email && tel ? <FiCheck size="2.2em" color="#4AC138" className="step_completed" /> : null}
                    </div>
                )}

                {formStep === 2 ? (
                    <div className="form_container" >
                        <h3>Bedrijf's gegevens</h3>
                        <p>Verifieer het bedrijf waarmee je op zoek bent naar een applicant.</p>
                        <span>Zoek bedrijf</span>
                        <input type="text" placeholder="Bedrijven"></input>
                        <div className="devider"><div className="vertical_line"></div><p className="devider_text">Of</p><div className="vertical_line"></div></div>
                        <span>Bedrijf handmatig invullen</span>
                        <input type="text" placeholder="Bedrijfsnaam" value={companyName} onChange={(e) => setCompanyName(e.target.value)}></input>
                        <span>Kvk</span>
                        <input type="text" placeholder="Kvk nummer" onChange={(e) => setKvk(e.target.value)} value={kvk}></input>
                        <button className="form_button" onClick={completeFormStep}>Volgende stap</button>
                    </div>
                ) : (
                    <div className="form_collapsed" onClick={() => setFormStep(2)}>
                        <h2>Bedrijf's gegevens</h2>
                        {companyName && kvk ? <FiCheck size="2.2em" color="#4AC138" className="step_completed" /> : null}
                    </div>
                )}

                {formStep === 3 ? (
                    <div className="form_container">
                        <h3>Algemene informatie vacature</h3>
                        <p>Om de juiste match te vinden hebben we wat informatie over de vacature nodig.</p>
                        <span>Ik zoek iemand voor</span>
                        <select onChange={(e) => setApplicationType(e.target.value)} value={applicationType}>
                            <option value="">Selecteer een optie</option>
                            <option value="Projectduur">Projectduur</option>
                            <option value="Onbepaalde tijd">Onbepaalde tijd</option>
                        </select>
                        {applicationType === "Projectduur" ?
                            <>
                                <span>Verwachte periode in weken</span>
                                <input type="text" placeholder="Weken" value={projectPeriod} onChange={(e) => setProjectPeriod(e.target.value)}></input>
                            </> : null
                        }
                        <span>Uur per week</span>
                        <input type="number" placeholder="Uur" value={hours} onChange={(e) => setHours(e.target.value)}></input>
                        <span>Locatie</span>
                        <Autocomplete address={address} setAddress={setAddress} setGeoPoint={setGeoPoint} />
                        {applicationType === "Projectduur" ?
                            <>
                                <span>Project kosten</span>
                                <div className="input_index"><div className="indicator"><p>€</p></div><input type="number" placeholder="Kosten" value={projectCost} onChange={(e) => setProjectCost(e.target.value)}></input></div>
                            </> : <>
                                <span>Uurloon</span>
                                <div className="input_index"><div className="indicator"><p>€</p></div><input type="number" placeholder="Uurloon" value={salary} onChange={(e) => setSalary(e.target.value)}></input></div>
                            </>
                        }
                        <button className="form_button" onClick={completeFormStep}>Volgende stap</button>
                    </div>
                ) : (
                    <div className="form_collapsed" onClick={() => setFormStep(3)}>
                        <h2>Algemene informatie vacature</h2>
                        <>
                            {applicationType === "Onbepaalde tijd" ?
                                <>
                                    {applicationType && hours && address && salary ? <FiCheck size="2.2em" color="#4AC138" className="step_completed" /> : null}
                                </>
                                :
                                <>
                                    {applicationType && hours && projectPeriod && address && projectCost ? <FiCheck size="2.2em" color="#4AC138" className="step_completed" /> : null}
                                </>
                            }
                        </>
                    </div>
                )}

                {formStep === 4 ? (
                    <div className="form_container">
                        <h3>Vereiste kwalificaties</h3>
                        <p>Beperk het aantal matches op uw vacature door kwalificaties op te geven.</p>
                        <span>Functie titel</span>
                        <input type="text" placeholder="Functie titel" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}></input>
                        <span>Opleidingsniveau</span>
                        <select onChange={(e) => setGraduateLevel(e.target.value)}>
                            <option value="">Opleidingsniveau</option>
                            <option value="geen opleiding vereist of middelbare school volstaat">Opleidingsniveau 1: geen opleiding vereist of middelbare school volstaat</option>
                            <option value="voorbereidend/lager middelbaar beroepsonderwijs (vmbo)">Opleidingsniveau 2: voorbereidend/lager middelbaar beroepsonderwijs (vmbo)</option>
                            <option value="middelbaar beroepsonderwijs (mbo)">Opleidingsniveau 3: middelbaar beroepsonderwijs (mbo)</option>
                            <option value="hoger beroepsonderwijs (hbo)">Opleidingsniveau 4: hoger beroepsonderwijs (hbo)</option>
                            <option value="universitair onderwijs (wo) en/of hoger">Opleidingsniveau 5: universitair onderwijs (wo) en/of hoger</option>
                        </select>
                        <span>Minimale ervaring in jaren</span>
                        <input type="number" placeholder="Aantal jaar" value={experience} onChange={(e) => setExperience(e.target.value)}></input>
                        <button className="form_button" onClick={completeFormStep}>Volgende stap</button>
                    </div>
                ) : (
                    <div className="form_collapsed" onClick={() => setFormStep(4)}>
                        <h2>Vereiste kwalificaties</h2>
                        {jobTitle && graduateLevel && experience ? <FiCheck size="2.2em" color="#4AC138" className="step_completed" /> : null}
                    </div>
                )}

                {formStep === 5 ? (
                    <div className="form_container">
                        <h3>Vacature beschrijving</h3>
                        <p>Geef informatie, details en relevante informatie betreffende de opdracht die geplaatst moet worden.</p>
                        <span>Vacature beschrijving</span>
                        <textarea className="text_area" placeholder="Beschrijving" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <button className="form_button" onClick={completeFormStep}>Volgende stap</button>
                    </div>
                ) : (
                    <div className="form_collapsed" onClick={() => setFormStep(5)}>
                        <h2>Vacature beschrijving</h2>
                        {description ? <FiCheck size="2.2em" color="#4AC138" className="step_completed" /> : null}
                    </div>
                )}

                {formStep === 6 ? (
                    <div className="form_container">
                        <h3>Vacature plaatsen</h3>
                        <p>Wanneer alle velden correct zijn ingevuld vindt u binnen minuten uw applicatie online terug.</p>
                        <button className="form_button" type="submit" onClick={createApplication}>Vacature plaatsen</button>
                    </div>
                ) : (
                    <div className="form_collapsed" onClick={() => setFormStep(6)}>
                        <h2>Vacature plaatsen</h2>
                    </div>
                )}
            </div>
        </form>
    );
};

export default Form;

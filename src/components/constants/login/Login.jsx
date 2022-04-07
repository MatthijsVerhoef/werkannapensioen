import { db, auth } from '../../../data/Firebase'
import { useState, useEffect } from 'react'
import '../styles/Login.css'
import { IoIosClose, IoIosContact } from 'react-icons/io'
import { AiOutlineGooglePlus, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { tippy } from '@tippyjs/react'

function Login({ setShowLogin }) {
    const [showRegister, setShowRegister] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [tel, setTel] = useState('')
    // const [photo, setPhoto] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState('')

    const signup = () => {
        if (!firstName || !lastName || !email || !password) {
            alert("Oops, it looks like you mist a field, make sure everything is filled out correctly")
            return
        }
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(async data => {
                return db.collection('users').doc(data.user.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: tel,
                    createAt: new Date(),
                    uid: data.user.uid,
                    displayName: firstName + " " + lastName,
                })
                    .then(() => {
                        auth.currentUser.updateProfile({
                            displayName: firstName + " " + lastName,
                            phoneNumber: tel,
                        })
                    })
                    .then(() => {
                        console.log('User log in succesful')
                    })
            }, err => {
                console.log(err)
            })
        setShowLogin(false)
    }

    const signin = (e) => {
        if (!email) {
            return alert("Vul een geldig emailadres in om in te loggen.")
        }
        if (!password) {
            return alert("Vul een geldig wachtwoord in om in te loggen.")
        }
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))
        e.preventDefault();
        setShowLogin(false) 
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in
                setUser(authUser);
            } else {
                // user has logged out
                setUser(null)
            }
        })
        return () => {
            // clean up old listener
            unsubscribe();
        }
    }, [user]);

    return (
        <div className="loginPopup">
            <div className="backgroundOverlay"></div>
            <div className="loginContainer">
                <div className="loginHeader">
                    <IoIosClose color="black" size="2em" className="popupIcon" onClick={() => setShowLogin(false)} />
                    <p>Inloggen of aanmelden</p>
                </div>
                <div className="loginContent">
                    <div className="buttonContainer">
                        <button className={showRegister ? "loginButton" : "loginButtonActive"} onClick={() => setShowRegister(false)}>Inloggen</button>
                        <button className={showRegister ? "loginButtonActive" : "loginButton"} onClick={() => setShowRegister(true)}>Registreren</button>
                    </div>
                    <h3>Gegevens</h3>
                    {showRegister ? (
                        <>
                            <p></p>
                            <tippy content="Profiel foto toevoegen"><div className="login_set_avatar"><IoIosContact size="3.5em" /></div></tippy>
                            <input className="loginInput" placeholder="Voornaam" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                            <input className="loginInput" placeholder="Achternaam" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                            <input className="loginInput" placeholder="Telefoonnummer" type="text" value={tel} onChange={(e) => setTel(e.target.value)}></input>
                            <input className="loginInput" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            <div className="login_password_container">
                                <input className="loginInput" placeholder="Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className="showPassword" size="1.4em" /> : <AiFillEye onClick={() => setShowPassword(true)} className="showPassword" size="1.4em" />}
                            </div>
                            <p className="login_small_text">Door te registreren ga ik akkoord met het <u>privacy beleid</u> en de <u>algemene voorwaarden</u></p>
                            <button className="Login" type="button" onClick={signup}>Registreren</button>
                        </>
                    ) : (
                        <>
                            <input className="loginInput" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            <input className="loginInput" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <p className="login_small_text">Wachtwoord vergeten? <u>Klik hier</u></p>
                            <button className="Login" type="button" onClick={signin}>Inloggen</button>
                            <h5>Of</h5>
                            <div className="socialButtons">
                                <button className="socialButton"><AiOutlineGooglePlus size="1.8em" style={{ paddingRight: 10 }} />Login met Google</button>
                                <button className="socialButton"><FaFacebookF size="1.4em" style={{ paddingRight: 10 }} />Login met Facebook</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Login

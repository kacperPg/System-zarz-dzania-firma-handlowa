import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import './Form.css';
const USER_REGEX = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9-_]{1,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setlastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);


    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidLastName(USER_REGEX.test(lastName));
    }, [lastName])


    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [name, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(name);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ name: name,lastName:lastName,email: email, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            setName('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (     
        <>            
        <section id="filler"/>
            {success ? (
                <section id="idForm">
                    <h1>Success!</h1>
                    <p>
                    <span className="line">
                            <Link to="/login">Zaloguj się</Link>
                        </span>
                    </p>
                </section>
            ) : (

                <section id="idForm">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Zarejestruj się !</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Imię:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && name && !validName ? "instructions" : "offscreen"}>
                            4 do 24 liter.<br />
                            Musi zaczynać sie od litery.<br />
                            Litery, Numbery, _ , - dozwolony.
                        </p>
                        <label htmlFor="lastName">
                            Nazwisko:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setlastNameFocus(true)}
                            onBlur={() => setlastNameFocus(false)}
                        />
                        <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                             4 do 24 liter.<br />
                            Musi zaczynać sie od litery.<br />
                            Litery, Numbery, _ , - dozwolony.
                        </p>
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={EmailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            Unikalny email który nie istnieje w systemi
                        </p>


                        <label htmlFor="password">
                            Hasło:
                    
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        8 do 24 liter.<br />
                            Musi zaczynać sie od litery.<br />
                            Musi zawierać małą i dużą litere, number oraz znak specjalny.<br />
                            Dozwolone znaki specjalne                         <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                                                <label htmlFor="confirm_pwd">
                            Powtórz hasło:
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                          Musi byc takie samo jak pierwsze hasło
                        </p>

                        <button class="buttonSubmit" disabled={!validName || !validPwd || !validMatch ? true : false}>  Zarejestruj</button>
                    </form>
                    <p>
                        Już posiadasz konto?<br />
                        <span className="line">
                            <Link to="/login">Zaloguj się</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
          )
}

export default Register
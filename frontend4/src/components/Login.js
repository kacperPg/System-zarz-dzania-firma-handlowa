import { useRef, useState, useEffect, useContext } from 'react';
import { Link,useNavigate   } from "react-router-dom";
import './Form.css';
import axios from '../api/axios';
import useAuth from './useAuth';


const LOGIN_URL = '/login';

const Login = () => {
    const { setAuth } = useAuth();

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const navigate  = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.token;
            sessionStorage.setItem('token', accessToken);
            const roles = response?.data?.roles;
            setIsLoggedin(true);
            setAuth({ email, password, roles, accessToken,isLoggedin });            
            setEmail('');
            setPassword('');
            setSuccess(true);
            navigate('/home');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }


    return (
        <div class="container">
            <section id="filler"/>
        <section id="idForm">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Zaloguj się</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Hasło:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button class="buttonSubmit">Zaloguj się</button>
            </form>
            <p>
               Nie masz konta?<br />
                <span className="line">
                    <Link to="/register">Zarejestruj się</Link>
                </span>
            </p>
        </section>
        </div>
    )
}

export default Login
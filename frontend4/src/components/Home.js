import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>Home</h1>
            <Link to="/login">Go to the login page</Link>
            <br />
            <Link to="/register">Go to the register page</Link>

            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
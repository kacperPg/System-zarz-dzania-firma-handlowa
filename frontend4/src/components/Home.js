import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthProvider";
import { NavBarBoodstrap } from "./Navbar/navbarBS";
import './Home.css'
const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    return (    <div class="wrapper">
         <NavBarBoodstrap />    
            <section>
                
            </section>
        </div>
    )
}

export default Home

const ProduktyStrona = () => {
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

export default ProduktyStrona
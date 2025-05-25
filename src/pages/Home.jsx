// Assets
import { MdOutlineLogout } from "react-icons/md";

import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home({ token }) {
    let navigator = useNavigate()

    function handle_logout() {
        sessionStorage.removeItem('token')
        navigator('/')
    }

    return (
        <main id='home_main'>
            <nav id='navbar'>
                <h1>Bem-Vindo de volta, {token.user.user_metadata['full_name']}</h1>

                <button onClick={handle_logout}>
                    Logout
                    <MdOutlineLogout />
                </button>
            </nav>
        </main>
    )
}

export default Home
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home({ token }) {
    let navigator = useNavigate()

    function handle_logout() {
        sessionStorage.removeItem('token')
        navigator('/')
    }

    return (
        <>
            <nav id='navbar'>
                <h1>Welcome back, {token.user.user_metadata['full_name']}</h1>

                <button onClick={handle_logout}>
                    Log out
                </button>
            </nav>
        </>
    )
}

export default Home
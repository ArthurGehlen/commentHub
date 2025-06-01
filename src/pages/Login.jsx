import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa"
import { supabase } from '../client'
import { useState } from 'react'

function Login({ setToken }) {
    let navigator = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handle_change(e) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    async function sign_in_with_google() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/home`
                }
        })
        if (error) console.error(error);
        navigator('/home')
    }

    async function handle_submit(e) {
        e.preventDefault()

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
            if (error) console.error(error)
            setToken(data)
            navigator('/home')
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <main className='user_auth_main'>
            <form className='login_form' onSubmit={handle_submit}>
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder='Email'
                    name='email'
                    onChange={handle_change}
                />

                <input
                    type="password"
                    placeholder='Senha'
                    name='password'
                    onChange={handle_change}
                />

                <button type='submit'>
                    Entrar
                </button>

                <button onClick={sign_in_with_google} id='google_btn'>
                    <FaGoogle />
                    Entre com o google
                </button>

                <Link to={'/signup'}>
                    Não tem uma conta? Cadastre-se
                </Link>
            </form>
        </main>
    )
}

export default Login
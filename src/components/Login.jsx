import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import { useState } from 'react'
import './Login.css'

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

    async function handle_submit(e) {
        e.preventDefault()

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
            if (error) throw error
            setToken(data)
            navigator('/home')
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
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
                    placeholder='Password'
                    name='password'
                    onChange={handle_change}
                />

                <button type='submit'>
                    Submit
                </button>

                <p>
                    Don't have an account? <Link to={'/signup'}>Sign Up</Link>
                </p>
            </form>
        </>
    )
}

export default Login
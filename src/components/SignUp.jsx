import { Link } from 'react-router-dom'
import { supabase } from '../client'
import { useState } from 'react'
import './SignUp.css'

function SignUP() {
    const [formData, setFormData] = useState({
        full_name: '',
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
            const { error } = await supabase.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.full_name,
                        }
                    }
                })
            if (error) throw error
            alert('Check your email for verification link...')
            setFormData({full_name: '', email: '', password: ''})
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <form onSubmit={handle_submit}>
                <h1>Sign-Up</h1>
                <input
                    type="text"
                    placeholder='FullName'
                    name='full_name'
                    onChange={handle_change}
                    value={formData.full_name}
                    maxLength={50}
                />

                <input
                    type="email"
                    placeholder='Email'
                    name='email'
                    onChange={handle_change}
                    value={formData.email}
                />

                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    onChange={handle_change}
                    value={formData.password}
                />

                <button type='submit'>
                    Submit
                </button>

                <p>
                    Already have an account? <Link to={'/'}>Login</Link>
                </p>
            </form>
        </>
    )
}

export default SignUP
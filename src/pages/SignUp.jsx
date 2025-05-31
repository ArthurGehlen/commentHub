import { Link } from 'react-router-dom'
import { supabase } from '../client'
import { useState } from 'react'

function SignUp() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmed_password: ''
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

        if (formData.password !== formData.confirmed_password) {
            alert('Erro: as senhas não correspondem.')
            return
        }

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
            alert('Cheque seu e-mail. Enviamos um link de verificação.')
            setFormData({ full_name: '', email: '', password: '', confirmed_password: '' })
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <main className='user_auth_main'>
            <form onSubmit={handle_submit}>
                <h1>Cadastre-se</h1>
                <input
                    type="text"
                    placeholder='Nome de Usuário (max. 20 caracteres)'
                    name='full_name'
                    onChange={handle_change}
                    value={formData.full_name}
                    maxLength={20}
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
                    placeholder='Senha (mín. 6 caracteres)'
                    name='password'
                    onChange={handle_change}
                    value={formData.password}
                />

                <input
                    type="password"
                    placeholder='Confirmar Senha'
                    name='confirmed_password'
                    onChange={handle_change}
                    value={formData.confirmed_password}
                />

                <button type='submit'>
                    Submit
                </button>

                <Link to={'/'}>
                    Já tem uma conta? Entrar
                </Link>
            </form>
        </main>
    )
}

export default SignUp
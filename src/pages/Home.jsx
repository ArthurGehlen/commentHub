// Assets
import { MdOutlineLogout } from "react-icons/md"
import { IoIosSend } from "react-icons/io"
import { MdDelete } from "react-icons/md"
import { FaUser } from "react-icons/fa"

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { supabase } from '../client'
import './Home.css'

function Home() {
    let navigator = useNavigate()
    const [user, setUser] = useState(null)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    function handle_logout() {
        supabase.auth.signOut()
        navigator('/')
    }

    async function handle_comment(e) {
        e.preventDefault()

        if (!user) {
            alert('Usuário não autorizado')
            return
        }

        const { error } = await supabase
            .from('comments')
            .insert({
                user_name: user.user_metadata.full_name,
                comment: comment
            })

        if (error) {
            alert('Erro ao inserir comentário: ' + error.message)
        } else {
            alert('Comentário inserido com sucesso!')
            setComment('')
            get_comments()
        }
    }

    function handle_change(e) {
        setComment(e.target.value)
    }

    async function get_comments() {
        const { data, error } = await supabase.from('comments').select('*')
        if (error) {
            console.error('Erro ao buscar comentários:', error.message)
            return
        }
        setComments(data)
    }

    async function delete_comment(id) {
        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id)
        if (error) {
            console.error('Erro ao deletar comentário:', error.message)
            return
        }
        get_comments()
    }

    useEffect(() => {
        async function check_user() {
            const { data: { user }, error } = await supabase.auth.getUser()

            if (!user) {
                alert('Você não está autenticado!')
                navigator('/')
            } else {
                setUser(user)
            }

            if (error) console.error(error)
        }
        
        check_user()
        get_comments()
    }, [])


    return (
        <main id='home_main'>
            <header id='navbar'>
                <h1>Bem-Vindo de volta, {user?.user_metadata?.full_name}</h1>

                <button onClick={handle_logout}>
                    Logout
                    <MdOutlineLogout />
                </button>
            </header>

            <section id="comments_section">
                <form className="comment_container" onSubmit={handle_comment}>
                    <FaUser className="user_icon" />
                    <input
                        type="text"
                        placeholder="Comente algo (max. 120 caracteres)"
                        onChange={handle_change}
                        value={comment}
                        maxLength={120}
                    />
                    <button type="submit">
                        <IoIosSend />
                    </button>
                </form>

                <hr />

                <div className="comments_section">
                    {comments.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <div className="user_img">
                                <FaUser className="user_icon" />
                            </div>
                            <div className="content">
                                <header>
                                    <div className="user">
                                        <h2>{comment.user_name}</h2>
                                    </div>
                                    {comment.user_name === user?.user_metadata?.full_name && (
                                        <button onClick={() => delete_comment(comment.id)}>
                                            <MdDelete />
                                        </button>
                                    )}
                                </header>
                                <p className="comment_p">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Home
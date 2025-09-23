import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        if (!form.email || !form.password) {
            setError('Informe e-mail e senha')
            return
        }
        setLoading(true)
        try {
            const { data } = await axios.post('/api/auth/login', form)
            // Supondo que backend retorna { token, user: { name } }
            if (data?.token) localStorage.setItem('token', data.token)
            if (data?.user?.name) localStorage.setItem('userName', data.user.name)
            navigate('/welcome')
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'Falha no login')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange} />
            <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}



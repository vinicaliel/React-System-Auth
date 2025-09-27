import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/login.css'

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
        
        <div className="login-page">
          <div className="login-container">
            <div className="login-header">
              <Link to="/" className="back-link">
                <span className="back-icon">←</span>
                Voltar
              </Link>
              <div className="login-title">
                <span className="title-icon">🔐</span>
                <h1>Entrar na Plataforma</h1>
                <p>Acesse sua conta SolarDetect</p>
              </div>
            </div>
    
            <form className="login-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
    
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Digite seu email"
                  required
                />
              </div>
    
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                  required
                />
              </div>
    
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
    
              <div className="login-links">
                <p>Não possui conta?</p>
                <div className="register-options">
                  <Link to="/register/students" className="register-link">
                    Cadastrar como Estudante
                  </Link>
                  <Link to="/register/company" className="register-link">
                    Cadastrar como Empresa
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    };




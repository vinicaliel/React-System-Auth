import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isValidCNPJ, isValidEmail, isValidName, isValidPassword, confirmEquals, hasLength, onlyDigits } from '../utils/validation'
import { maskPhoneBR, maskCNPJ } from '../utils/masks'
import '../styles/register.css'


export default function RegisterCompany() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        confirmEmail: '',
        password: '',
        documentNumber: '',
        confirmPassword: '',
        phone: '',
        address: '',
        userType: 'COMPANY'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let nextValue = value
        if (name === 'phone') nextValue = maskPhoneBR(value)
        if (name === 'documentNumber') nextValue = maskCNPJ(value)
        setForm(prev => ({ ...prev, [name]: nextValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!form.name || !form.email || !form.confirmEmail || !form.password || !form.documentNumber || !form.phone || !form.address || !form.confirmPassword) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        // Validações específicas
        if (!isValidName(form.name)) return setError('Nome inválido');
        if (!isValidEmail(form.email)) return setError('Email inválido');
        if (!confirmEquals(form.email, form.confirmEmail)) return setError('Confirmação de e-mail não confere');
        if (!isValidPassword(form.password)) return setError('Senha deve ter 8+ caracteres, 1 maiúscula, 1 número e 1 especial');
        if (!confirmEquals(form.password, form.confirmPassword)) return setError('As senhas não coincidem');
        if (!isValidCNPJ(form.documentNumber)) return setError('CNPJ inválido');
        if (!hasLength(form.phone, 10, 15)) return setError('Telefone deve ter entre 10 e 15 caracteres');
        if (!hasLength(form.address, 5)) return setError('Endereço muito curto');

        setLoading(true);
        try {
            const url = '/api/auth/register/company';
            await axios.post(url, {
                ...form,
                phone: onlyDigits(form.phone),
                documentNumber: onlyDigits(form.documentNumber),
                userType: form.userType,
            });
            setSuccess('Empresa registrada com sucesso');
        } catch (error: any) {
            setError(error?.response?.data?.message ?? 'Ocorreu um erro ao registrar a empresa');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
          <div className="register-container">
            <div className="register-header">
              <Link to="/" className="back-link">
                <span className="back-icon">←</span>
                Voltar
              </Link>
              <div className="register-title">
                <span className="title-icon">🏢</span>
                <h1>Cadastro de Empresa</h1>
              </div>
            </div>
    
            <form className="register-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
    
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Razão Social</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Digite a razão social da empresa"
                    required
                  />
                </div>
              </div>
    
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="documentNumber">CNPJ</label>
                  <input
                    type="text"
                    id="documentNumber"
                    name="documentNumber"
                    value={form.documentNumber}
                    onChange={handleChange}
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(00) 0000-0000"
                    required
                  />
                </div>
              </div>
    
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="address">Endereço</label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Digite o endereço completo da empresa"
                    rows={3}
                    required
                  />
                </div>
              </div>
    
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Corporativo</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="contato@empresa.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmEmail">Confirmar Email</label>
                  <input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    value={form.confirmEmail}
                    onChange={handleChange}
                    placeholder="confirme@empresa.com"
                    required
                  />
                </div>
              </div>
    
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Senha</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme sua senha"
                    required
                  />
                </div>
              </div>
    
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
    
              <p className="register-link">
                Já possui conta? <Link to="/login">Fazer login</Link>
              </p>
            </form>
          </div>
        </div>
      );
    };





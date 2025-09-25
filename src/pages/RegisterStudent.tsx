import { useState } from 'react'
import axios from 'axios'
import { isValidCPF, isValidEmail, isValidName, isValidPassword, confirmEquals, hasLength, onlyDigits } from '../utils/validation'
import { maskCPF, maskPhoneBR } from '../utils/masks'

export default function RegisterStudent() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        confirmEmail: '',
        password: '',
        documentNumber: '',
        confirmPassword: '',
        phone: '',
        address: '',
        userType: 'STUDENT'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let nextValue = value
        if (name === 'documentNumber') nextValue = maskCPF(value)
        if (name === 'phone') nextValue = maskPhoneBR(value)
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
        if (!isValidCPF(form.documentNumber)) return setError('CPF inválido');
        if (!hasLength(form.phone, 10, 15)) return setError('Telefone deve ter entre 10 e 15 caracteres');
        if (!hasLength(form.address, 5)) return setError('Endereço muito curto');

        setLoading(true);
        try {
            const url = '/api/auth/register/student';
            await axios.post(url, {
                ...form,
                documentNumber: onlyDigits(form.documentNumber),
                phone: onlyDigits(form.phone),
                userType: form.userType,
            });
            setSuccess('Estudante registrado com sucesso');
        } catch (error: any) {
            setError(error?.response?.data?.message ?? 'Ocorreu um erro ao registrar o estudante');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Cadastro de estudante</h1>

            <input type="text" name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
            <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input type="text" name="confirmEmail" placeholder="Confirmar email" value={form.confirmEmail} onChange={handleChange} />
            <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirmar senha" value={form.confirmPassword} onChange={handleChange} />
            <input type="text" name="documentNumber" placeholder="Número do documento" value={form.documentNumber} onChange={handleChange} />
            <input type="text" name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} />
            <input type="text" name="address" placeholder="Endereço" value={form.address} onChange={handleChange} />

            <button type="submit" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
}
import { useState } from 'react'
import axios from 'axios'

export default function RegisterStudent() {
    const [form, setForm] = useState({
        name: '',
        email: '',
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
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!form.name || !form.email || !form.password || !form.documentNumber || !form.phone || !form.address || !form.confirmPassword) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        setLoading(true);
        try {
            const url = '/api/auth/register/student';
            await axios.post(url, {
                ...form,
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
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Welcome() {
    const navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        axios.get('/api/test/protected', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            // TestController retorna { user: name, email, userType, ... }
            const apiName = res?.data?.user || res?.data?.name || 'usuário'
            setName(apiName)
        })
        .catch(() => {
            setError('Sessão expirada. Faça login novamente.')
            navigate('/login')
        })
    }, [navigate])

    if (error) return null

    return (
        <div>
            <h1>Bem-vindo, {name || '...' }!</h1>
        </div>
    )
}



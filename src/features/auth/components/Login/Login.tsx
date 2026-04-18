import '@/features/auth/components/Login/login.css'
import { useState, type SyntheticEvent, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import type { ContextData } from '@/features/auth/types/Auth.types';

export default function Login(){

    const { login } = useContext(AuthContext) as ContextData

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();

        try{
            await login(email, senha);
        }catch(error: any){
            alert(error.response.data.mensagem);
        }
    }

    return (
        <div id="page">
            <div id="card">
                <div id="header">
                    <div id="logo">HuB</div>
                    <div>
                        <h1 id="title">Acesso ao Sistema</h1>
                        <p id="subtitle">Gestão para a sua imobiliária</p>
                    </div>
                </div>

                <form 
                    id="form"
                    onSubmit={e => handleLogin(e)} 
                >
                    <label className="label">
                        Email
                        <input
                            className="input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@empresa.com"
                            required
                        />
                    </label>

                    <label className="label">
                        Senha
                        <input
                            className="input"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </label>

                    {/* <div id="row">
                        <button
                            id="linkBtn"
                            type="button"
                            onClick={() => alert("Entre em contato com o administrador")}
                            >
                            Esqueci minha senha
                        </button>
                    </div> */}

                    <button 
                        id="primaryBtn"
                        type="submit" 
                        onClick={() => handleLogin}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
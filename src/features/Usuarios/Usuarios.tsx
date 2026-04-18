import '@/features/Usuarios/usuarios.css'
import { useNavigate } from 'react-router'

export default function Usuarios(){

    const navigate = useNavigate();

    return(
        <div className="usuariosContainer">

            <div className="containerBtnNovoUsuario">

                <h1 className="titleUsuarios">Usuarios</h1>

                <button 
                    className="btnNovoUsuario"
                    onClick={() => navigate('/cadastro')}
                >
                    + Novo usuário
                </button>
            </div>

           {Array.from({length: 15}).map((item, index) => (
                <div className="card_users">
                    <p>Osvaldo Zuccaro</p>
                    <p>osvaldo@zuccaro.com</p>
                    <p>(11) 94443-2344  </p>
                    <p>Diretor geral</p>

                    <button className="btnInfosUser">Ver mais</button>
                </div>
           ))}

        </div>
    )
}
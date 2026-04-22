import '@/features/Usuarios/components/DadosUsersMin/dadosUsersMin.css'
import { useNavigate } from 'react-router'
import useUsuarios from '@/features/Usuarios/hooks/useUsuarios';
import { useState, useEffect } from 'react';
import RolesServices from '@/shared/roles/roles.services';
import RolesUtils from '@/shared/roles/roles.utils';
import type { DadosRoles } from '@/shared/roles/roles.types';

export default function DadosUsersMin(){

    const navigate = useNavigate();
    const { usuarios } = useUsuarios();

    const [arrayRoles, setArrayRoles] = useState<DadosRoles[]>([])

    //BUSCAR ROLES
    useEffect(() => {
        const busca = async () => {
            try{
                const listaRoles = await RolesServices.buscarRoles();
                setArrayRoles(listaRoles);
            }catch(error){
                alert("Erro ao buscar roles!");
            }
        }
        busca();
    }, []);

    const navegarDadosUsuario = (id_usuario: number) => {
        navigate(`/dadosusuario/${id_usuario}`)
    }

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

           {usuarios.map((item, index) => (
                <>
                    <div className="card_user_container">
                        <div className="card_users" key={index}>
                            <p>{item.nome}</p>
                            <p>{item.email}</p>
                            <p>{item.telefone}</p>
                            <p>{RolesUtils.buscarNomeRole(arrayRoles, item.id_role)}</p>
                        </div>

                        <button 
                            className="btnInfosUser"
                            onClick={() => navegarDadosUsuario(item.id_usuario)}
                        >
                            Ver mais
                        </button>
                    </div>
                </>
           ))}

        </div>
    )
}
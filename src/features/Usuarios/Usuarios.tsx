import '@/features/Usuarios/usuarios.css'
import { useNavigate } from 'react-router'
import useUsuarios from './hooks/useUsuarios';
import { useState, useEffect } from 'react';
import RolesServices from '../roles/roles.services';
import RolesUtils from '../roles/roles.utils';
import type { DadosRoles } from '../roles/roles.types';

export default function Usuarios(){

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

                        <button className="btnInfosUser">Ver mais</button>
                    </div>
                </>
           ))}

        </div>
    )
}
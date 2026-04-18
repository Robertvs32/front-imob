import '@/features/auth/components/Cadastro/components/formCadastro/formCadastro.css'
import type { cadastroForm } from '@/features/auth/components/Cadastro/types/cadastro.types'
import InputCadastro from '@/features/auth/components/Cadastro/components/inputCadastro/InputCadastro';

export default function FormCadastro({getter, setter, funcaoCadastrar}: cadastroForm  ){

    const alteraValor = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const {name, value} = e.target;
        setter({...getter, [name]: value})
    }

    return(
        <form className="form" action={funcaoCadastrar}>
            <div className="dadosForm">
                <InputCadastro
                    name="nome"
                    placeholder="Nome"
                    value={getter.nome}
                    label="Joaquim"
                    onChange={alteraValor}
                    required={true}
                    type="text"
                />

                <InputCadastro
                    name="email"
                    placeholder="usuario@imob.com"
                    value={getter.email}
                    label="email"
                    onChange={alteraValor}
                    required={true}
                    type="e-mail"
                />

            <InputCadastro
                    name="telefone"
                    placeholder="(11) 93442-2211"
                    value={getter.telefone}
                    label="Telefone"
                    onChange={alteraValor}
                    required={true}
                    type="text"
                />

                <InputCadastro
                    name="cep"
                    placeholder="07122-222"
                    value={getter.cep}
                    label="Cep"
                    onChange={alteraValor}
                    required={true}
                    type="text"
                />

                <InputCadastro
                    name="estado"
                    placeholder="São Paulo"
                    value={getter.estado}
                    label="Estado"
                    onChange={alteraValor}
                    required={true}
                    type="text"
                />
                
                <InputCadastro
                    name="numero"
                    placeholder="123"
                    value={getter.numero}
                    label="Numero do endereço"
                    onChange={alteraValor}
                    required={true}
                    type=""
                />

                <InputCadastro
                    name="cidade"
                    placeholder="Guarulhos"
                    value={getter.cidade}
                    label="Cidade"
                    onChange={alteraValor}
                    required={true}
                    type="text"
                />

                <InputCadastro
                    name="senha"
                    placeholder="*********"
                    value={getter.senha}
                    label="Senha"
                    onChange={alteraValor}
                    required={true}
                    type="password"
                />

                <InputCadastro
                    name="confirmacaoSenha"
                    placeholder="*********"
                    value={getter.confirmacaoSenha}
                    label="Confirme a senha "
                    onChange={alteraValor}
                    required={true}
                    type="password"
                />

                <div className="cardInput">
                    <label>Função</label>
                    <select 
                        name="id_role"
                        value={getter.id_role}
                        onChange={e => alteraValor(e)}
                        required={true}
                    >
                        <option disabled value="1">Selecionar função</option>
                        <option value="2">Adm</option>
                        <option value="3">Diretor comercial</option>
                        <option value="4">Corretor</option>
                        <option value="5">Financeiro</option>
                        <option value="6">Cliente</option>
                        <option value="7">Proprietário</option>
                    </select>
                </div>
            </div>

            <button 
                className="btnEnviaCadastro"
                type='submit'
            >
                Cadastrar usuário
            </button>

        </form>
    )
}
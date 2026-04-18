import '@/features/auth/components/Cadastro/cadastro.css'
import FormCadastro from '@/features/auth/components/Cadastro/components/formCadastro/FormCadastro'
import useCadastro from '@/features/auth/components/Cadastro/hooks/useCadastro'

export default function Cadastro(){

    const { dados, setDados, cadastrar}= useCadastro();

    return(
        <div className="cadastroContainer">
            <h1 className="titleCadastro">Cadastrar usuário</h1>

            <FormCadastro
                getter={dados}
                setter={setDados}
                funcaoCadastrar={cadastrar}
            />

        </div>
    )
}
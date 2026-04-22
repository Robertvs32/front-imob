import { useState } from "react"
import { type dadosCadastro } from "@/features/auth/types/Auth.types"
import { api } from "@/api/api"

export default function useCadastro(){

    const [dados, setDados] = useState<dadosCadastro>({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: '',
        telefone: '',
        cep: '',
        numero: '',
        cidade: '',
        estado: '',
        id_role: 1
    });

    const limparDados = () => {
        setDados({
            nome: '',
            email: '',
            senha: '',
            confirmacaoSenha: '',
            telefone: '',
            cep: '',
            numero: '',
            cidade: '',
            estado: '',
            id_role: 1
        })
    }

    const verificaCampos = () => {
        const arrayValoresVazios: string[] = [];

        //itera sobre o objeto e pega apenas os campos com valor vazio ou zero
        Object.entries(dados).forEach(([chave, valor]) => {
            if(valor == '' || valor == 0){
                arrayValoresVazios.push(chave);
            }
        })

        return arrayValoresVazios;
    }

    const cadastrar = async () => {
        try{
            const arrayVazios = verificaCampos();

            if(arrayVazios.length > 0){
                alert(`Preencha os campos vazios: ${arrayVazios.map(item => ` ${item}`)}`)
                return;
            }

            const dadosDefinitivo = {...dados, id_role: Number(dados.id_role)}
            const response = await api.post('/cadastro', dadosDefinitivo);
            limparDados();
            alert(response.data.mensagem);
        }catch(error){
            alert(error)
        }
    }

    return{
        dados, 
        setDados,
        cadastrar
    }
}

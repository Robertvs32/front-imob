export interface dadosCadastro{
    nome: string,
    email: string,
    senha: string,
    confirmacaoSenha: string,
    telefone: string,
    cep: string,
    numero: string,
    cidade: string,
    estado: string,
    id_role: number
}

export interface InputProps{
    name: string, 
    placeholder: string, 
    value: string, 
    label: string,
    required: boolean,
    type: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface cadastroForm{
    getter: dadosCadastro, 
    setter: React.Dispatch<React.SetStateAction<dadosCadastro>>
    funcaoCadastrar: () => Promise<void>
}
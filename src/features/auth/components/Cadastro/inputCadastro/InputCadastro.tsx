import '@/features/auth/components/Cadastro/inputCadastro/inputCadastro.css'
import { type InputProps } from '@/features/auth/types/Auth.types'

export default function({name, placeholder, value, label, onChange, required, type}: InputProps){
    return(
        <div className="cardInput">
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => onChange(e)}
                required={required}
            />
        </div>
    )
}
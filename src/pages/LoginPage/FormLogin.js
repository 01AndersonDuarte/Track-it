import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function FormLogin() {
    const [dataLogin, setDataLogin] = useState({ email: "", password: "" })

    function login() {

    }
    function insertData(event) {
        event.target.setCustomValidity('');
        const value = event.target.value;
        const attribute = event.target.name;

        setDataLogin({ ...dataLogin, [attribute]: value });
    }
    return (
        <StyledForm onSubmit={login}>
            <input
                type="email"
                placeholder="E-mail"
                name="email"
                value={dataLogin.email}
                onChange={insertData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha um endereço de e-mail válido.')}

            />

            <input
                type="password"
                placeholder="Senha"
                name="password"
                value={dataLogin.password}
                onChange={insertData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
            />
            <button type="submit">Entrar</button>
            <Link to="/register-page"><p>Não tem uma conta? Cadastre-se!</p></Link>
        </StyledForm>
    );
}

const StyledForm = styled.form`
    width: 325px;
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: all 0.3s ease-in;
    input{
        margin: 2%;
        padding: 5%;
        width: 100%;
        border: solid 1px rgba(212, 212, 212, 0.7);
        border-radius: 5px;
        outline: 0;
    }
    input:focus{
        transform: scale(1.07);
    }
    input:focus::-webkit-input-placeholder {
        color: transparent;
    }
    button{
        width: 100%;
        margin: 2%;
        padding: 3%;
        background-color: #52B6FF;
        color: #FFFFFF;
        
        border: solid 1px rgba(212, 212, 212, 0.7);
        border-radius: 5px;
        cursor: pointer;
    }
    p{
        margin: 8% 0 2% 0;
        line-height: 17px;
        text-align: center;
        color: #52B6FF;
        text-decoration-line: underline;

    }
`;
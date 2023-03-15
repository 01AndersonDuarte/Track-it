import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Audio, Circles, TailSpin } from "react-loader-spinner";


import styled from "styled-components";
import Error from "./Error";

export default function FormLogin() {
    const [dataLogin, setDataLogin] = useState({ email: "", password: "" })
    const [request, setRequest] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function loginRequest(event) {
        event.preventDefault();
        setRequest(true);

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const promise = axios.post(url, dataLogin);


        promise.then((sucess) => {
            console.log("SUCESSO")
            console.log(sucess.data)
            setRequest(false);
            navigate("/today-page");
        });
        promise.catch((error) => {
            setRequest(false);
            if (error.response.status === 422) {
                setError('Este email não existe!');
            } else if (error.response.status === 401) {
                setError('Usuário ou senha inválidos.');
            }
        });
    }
    function insertData(event) {
        event.target.setCustomValidity('');
        const value = event.target.value;
        const attribute = event.target.name;

        setDataLogin({ ...dataLogin, [attribute]: value });
    }
    if (request===true) {
        console.log("COMECOU");
        return (
            <TailSpin
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
            />);
    }
    return (
        <StyledForm onSubmit={loginRequest}>
            {error && <Error error={error} setError={setError} />}

            <input
                disabled={request}
                type="email"
                placeholder="E-mail"
                name="email"
                value={dataLogin.email}
                onChange={insertData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha um endereço de e-mail válido.')}

            />

            <input
                disabled={request}
                type="password"
                placeholder="Senha"
                name="password"
                value={dataLogin.password}
                onChange={insertData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
            />
            <button type="submit" disabled={request}>Entrar</button>
            <Link to="/register-page"><h2>Não tem uma conta? Cadastre-se!</h2></Link>
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
    h2{
        margin: 8% 0 2% 0;
        line-height: 17px;
        text-align: center;
        color: #52B6FF;
        text-decoration-line: underline;
    }
    p{
        margin: 3% 0 3% 0;
        color: red;
    }
`;
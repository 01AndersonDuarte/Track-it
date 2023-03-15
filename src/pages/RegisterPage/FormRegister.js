import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { StyledForm } from "../../components/styledForm";


export default function FormRegister() {
    const [registrationData, setRegistrationData] = useState({ email: "", name: "", image: "",  password: "" });
    const [request, setRequest] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function registerRequest(event){
        event.preventDefault();
        setRequest(true);

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        const promise = axios.post(url, registrationData);

        promise.then((sucess) => {
            navigate("/");
        });
        promise.catch((error) => {
            setRequest(false);
            if (error.response.status === 422) {
                setError('Endereço de email ou url da imagem inválido(s)!');
            } else if (error.response.status === 409) {
                setError('Já existe um usuário com este endereço de email');
            }
        });
    }
    function insertRegistrationData(event){
        event.target.setCustomValidity('');
        const value = event.target.value;
        const attribute = event.target.name;
        
        setRegistrationData({ ...registrationData, [attribute]: value });     
    }
    return (
        <StyledForm onSubmit={registerRequest}>
            {error && <Error error={error} setError={setError} />}

            <input
                disabled={request}
                type="email"
                placeholder="E-mail"
                name="email"
                value={registrationData.email}
                onChange={insertRegistrationData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha um endereço de e-mail válido.')}

            />

            <input
                disabled={request}
                type="password"
                placeholder="Senha"
                name="password"
                value={registrationData.password}
                onChange={insertRegistrationData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
            />

            <input
                disabled={request}
                type="text"
                placeholder="Nome"
                name="name"
                value={registrationData.name}
                onChange={insertRegistrationData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
            />

            <input
                disabled={request}
                type="text"
                placeholder="Imagem"
                name="image"
                value={registrationData.image}
                onChange={insertRegistrationData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
            />
            <button type="submit" disabled={request}>{request ? <Loading/> : 'Cadastrar-se'}</button>
            <Link to="/"><h2>Já tem uma conta? Faça login!</h2></Link>
        </StyledForm>
    );
}
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../components/CurrentUserContext";

import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { StyledForm } from "../../components/styledForm";

export default function FormLogin() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [request, setRequest] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { userLogado, setUserLogado } = useContext(CurrentUserContext);

    useEffect(() => {
        localStorage.removeItem("user");
        setUserLogado(JSON.parse(localStorage.getItem("user")));
    }, []);

    function loginRequest(event) {
        event.preventDefault();
        setRequest(true);

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const promise = axios.post(url, loginData);


        promise.then((sucess) => {
            console.log(sucess.data);

            const object = { image: `${sucess.data.image}`, token: `${sucess.data.token}` };
            const objectSerial = JSON.stringify(object);
            localStorage.setItem("user", objectSerial);
            setUserLogado(JSON.parse(localStorage.getItem("user")));
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
    function insertLoginData(event) {
        event.target.setCustomValidity('');
        const value = event.target.value;
        const attribute = event.target.name;

        setLoginData({ ...loginData, [attribute]: value });
    }

    return (
        <StyledForm onSubmit={loginRequest}>
            {error && <Error error={error} setError={setError} />}

            <input
                data-tes="email-input"
                disabled={request}
                type="email"
                placeholder="E-mail"
                name="email"
                value={loginData.email}
                onChange={insertLoginData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha um endereço de e-mail válido.')}

            />

            <input
                data-tes="password-input"
                disabled={request}
                type="password"
                placeholder="Senha"
                name="password"
                value={loginData.password}
                onChange={insertLoginData}
                required
                onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
            />
            <button data-test="login-btn" type="submit" disabled={request}>{request ? <Loading /> : 'Entrar'}</button>
            <Link data-test="signup-link" to="/register-page"><h2>Não tem uma conta? Cadastre-se!</h2></Link>
        </StyledForm>
    );
}
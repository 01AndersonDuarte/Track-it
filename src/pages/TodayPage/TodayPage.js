import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import styled from "styled-components";
import axios from "axios";
export default function TodayPage() {
    const {userLogado, setUserLogado} = useContext(CurrentUserContext);
    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userLogado.token}` } };
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

        const promise = axios.get(url, config);
        promise.then((sucess)=>{
            console.log(sucess);
        });
        promise.catch((error)=>{
            console.log(error);
        });
    }, []);
    return (
        <ContainerToday>
        </ContainerToday>
    );
}

const ContainerToday = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgba(229, 229, 229, 0.4);
    header{
        width: 100%;
        position: fixed;
        padding: 5%;
        top: 0;
        z-index: 1;
        background-color: black;
    }
    

`;
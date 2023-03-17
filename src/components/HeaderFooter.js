import { useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { TrackitText } from "../constants/Trackit";
import { CurrentUserContext } from "./CurrentUserContext";

export default function HeaderFooter() {
    const { userLogado, setUserLogado } = useContext(CurrentUserContext);

    return (
        <>
            {userLogado === null ? '' :
            <Container>
                <header data-test="header">{TrackitText}<img src={userLogado.image} alt=""/></header>
                <footer data-test="menu">
                    <Link data-test="habit-link" to="/habits-page"><p>Hábitos</p></Link>
                    <Link data-test="today-link" to="/today-page"><button>HOJE</button></Link>
                    <Link data-test="history-link" to="/history-page"><p>Histórico</p></Link>
                </footer>
            </Container>}
        </>

    );
}

const Container = styled.div`
    width: 100%;
    header{
        width: 100%;
        position: fixed;
        padding: 2% 10% 2% 10%;
        top: 0;
        z-index: 1;
        background-color: #126BA5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
            width: 50px;
            border-radius: 30px;
        }
    }
    footer{
        width: 100%;
        position: fixed;
        padding: 5%;
        bottom: 0;
        z-index: 1;
        background-color: red;

        display: flex;
        align-items: center;
        justify-content: space-around;

        p{
            font-size: 20px;
            /* color: #52B6FF; */
            text-decoration: none;
        }
        button{
            width: 50px;
            height: 50px;
            border-radius: 25px;
            border: none;
        }
    }
`;
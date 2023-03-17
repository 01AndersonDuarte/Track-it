import { useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { TrackitText } from "../constants/Trackit";
import { CurrentUserContext } from "./CurrentUserContext";

import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export default function HeaderFooter() {
    const { userLogado, setUserLogado } = useContext(CurrentUserContext);

    return (
        <>
            {userLogado === null ? '' :
                <Container>
                    <header data-test="header">{TrackitText}<img src={userLogado.image} alt="" /></header>
                    <footer data-test="menu">
                        <Link data-test="habit-link" to="/habits-page">
                            <p>Hábitos</p>
                        </Link>
                        <Link data-test="today-link" to="/hoje">
                            <button><CircularProgressbar value={26} text={`Hoje`} /></button>
                        </Link>
                        <Link data-test="history-link" to="/history-page">
                            <p>Histórico</p>
                        </Link>

                    </footer>
                </Container>}
        </>

    );
}

const Container = styled.div`
    width: 100%;
    
    header{
        width: 100%;
        padding: 2% 10% 2% 10%;

        position: fixed;
        top: 0;
        z-index: 1;

        background-color: #126BA5;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);

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
        height: 70px;
        padding: 5%;

        position: fixed;
        bottom: 0;
        z-index: 1;

        background-color: #FFFFFF;
        box-shadow: 0px 0px 3px 0.5px rgba(0, 0, 0, 0.2);

        display: flex;
        align-items: center;
        justify-content: space-around;

        p{
            font-size: 20px;
            color: #52B6FF;
            text-decoration: none;
            text-decoration-line: underline;
        }
        Link{
            text-decoration: none;
        }
        button{
            width: 91px;
            height: 91px;
            margin-bottom: 40px;
            border-radius: 55px;
            color: #FFFFFF;
            border: none;
        }
    }
`;
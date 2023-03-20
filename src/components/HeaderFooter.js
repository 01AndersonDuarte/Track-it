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
                    <Background/>
                    <footer data-test="menu">
                        <StyledLink data-test="habit-link" to="/habitos">
                            <p>Hábitos</p>
                        </StyledLink>
                        <StyledLink data-test="today-link" to="/hoje">
                            <button><CircularProgressbar value={userLogado.habitsMade} text={`Hoje`} /></button>
                        </StyledLink>
                        <StyledLink data-test="history-link" to="/historico">
                            <p>Histórico</p>
                        </StyledLink>

                    </footer>
                </Container>}
        </>

    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    font-family: 'Lexend Deca', sans-serif;
    background-color: red;
    header{
        width: 100%;
        padding: 2% 10% 2% 10%;

        position: fixed;
        top: 0;
        z-index: 2;

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
        z-index: 2;

        background-color: #FFFFFF;
        box-shadow: 0px 0px 3px 0.5px rgba(0, 0, 0, 0.2);

        display: flex;
        align-items: center;
        justify-content: space-around;

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

const StyledLink = styled(Link)`
    text-decoration: none;
    p{
        font-size: 18px;
        color: #52B6FF;
    }
`;

const Background = styled.div`
    background-color: rgba(229, 229, 229, 0.4);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;
import styled from "styled-components";

export default function HistoryPage() {
    return (
        <ContainerHistory>
            <History>
                <p>Histórico</p>
                <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
            </History>
        </ContainerHistory>
    );
}

const ContainerHistory = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20% 5% 20% 5%;
    background-color: rgba(229, 229, 229, 0.4);
    font-family: 'Lexend Deca', sans-serif;
`;

const History = styled.div`
    padding: 3%;
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    p{
        color: #126BA5;
        font-size: 23px;
        font-style: normal;
        font-weight: 400;
        line-height: 29px;
        margin-bottom: 5%;
    }
    h2{
        color: #666666;
        text-align: start;
        font-size: 18px;
        line-height: 22px;
    }
`;
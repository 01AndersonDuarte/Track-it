import styled from "styled-components";

export default function DeleteHabit({ removeHabit }) {
    return (
        <ContainerDelete>
            <div>
                <p>Tem certeza que deseja excluir este item?</p>
                <span>
                    <button onClick={() => removeHabit(true)}>SIM</button>
                    <button onClick={() => removeHabit(false)}>NÃO</button>
                </span>
            </div>
        </ContainerDelete>
    );
}

const ContainerDelete = styled.div`
    width: 100%;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;

    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: flex-start;
    div{
        width: 70vw;
        height: 30vh;
        border-radius: 10px;
        margin-top: 20vh;
        padding: 5%;
        background-color: #FFFFFF;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    p{
        margin: 3% 0 3% 0;
        text-align: center;
    }
    span{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        button:nth-child(1){
            width: 50px;
            padding: 3%;

            border: solid 1px rgba(212, 212, 212, 0.7);
            border-radius: 5px;
            color: #FFFFFF;
            background-color: #52B6FF;           
        }
        button{
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;

            border: solid 1px rgba(212, 212, 212, 0.7);
            border-radius: 5px;
            color: #52B6FF;
            background-color: white;
        }
    }  
`;
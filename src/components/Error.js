import styled from "styled-components";

export default function Error({ error, setError }) {

    return (
        <ContainerError>
            <div>
                <p>{error}</p>
                <h3>Tente novamente.</h3>
                <button onClick={()=>setError(null)}>OK</button>
            </div>
        </ContainerError>
    );
}

const ContainerError = styled.div`
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    
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
        color: red;
        text-align: center;
    }
`;
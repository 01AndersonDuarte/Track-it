import styled from "styled-components";
export default function TodayPage() {
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
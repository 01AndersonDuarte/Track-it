import styled from "styled-components";

export const StyledForm = styled.form`
    width: 325px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease-in;
    input{
        margin: 2%;
        padding: 5%;
        width: 100%;
        border: solid 1px rgba(212, 212, 212, 0.7);
        border-radius: 5px;
        outline: 0;
    }
    input:focus{
        transform: scale(1.07);
    }
    input:focus::-webkit-input-placeholder {
        color: transparent;
    }
    button{
        width: 100%;
        margin: 2%;
        padding: 3%;
        background-color: #52B6FF;
        color: #FFFFFF;
        
        border: solid 1px rgba(212, 212, 212, 0.7);
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        justify-content: center;
    }
    h2{
        margin: 8% 0 2% 0;
        line-height: 17px;
        text-align: center;
        color: #52B6FF;
        text-decoration-line: underline;
    }
`;
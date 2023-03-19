import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import { BsTrash } from "react-icons/bs"
import DeleteHabit from "./DeleteHabit";
import Loading from "../../components/Loading";

export default function HabitsPage() {
    const { userLogado, setUserLogado } = useContext(CurrentUserContext);
    const [userHabits, setUserHabits] = useState(null);
    const [request, setRequest] = useState(false);

    const [deleteHabit, setDeleteHabit] = useState(false);
    const [idDelete, setIdDelete] = useState(null);

    const [signUp, setSignUp] = useState(false);
    const [habit, setHabit] = useState({ name: "", days: [] });
    const week = [{ day: 7, name: 'D' }, { day: 1, name: 'S' }, { day: 2, name: 'T' }, { day: 3, name: 'Q' },
    { day: 4, name: 'Q' }, { day: 5, name: 'S' }, { day: 6, name: 'S' }];

    function addHabit() {
        setRequest(true);

        const config = { headers: { Authorization: `Bearer ${userLogado.token}` } };
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

        const promise = axios.post(url, habit, config);
        promise.then((sucess) => {
            setHabit({ name: "", days: [] });
            setSignUp(!signUp);
            setRequest(false);
            refreshHabits();
            console.log(sucess.data);
        });
        promise.catch((error) => {
            setRequest(false);
            alert(error.response.data.message);
            // COLOCAR COMPONENTE ERROR.js
            console.log(error.response.data);
        });

    }

    function removeHabit(option) {
        setDeleteHabit(!deleteHabit);
        if (option) {
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idDelete}`;
            const config = { headers: { Authorization: `Bearer ${userLogado.token}` } };

            const promise = axios.delete(url, config);
            promise.then((sucess) => {
                refreshHabits()
                console.log(sucess.data);
            });
            promise.catch((error) => {
                refreshHabits();
                setRequest(false);
                console.log(error.response.data);
            });
            return;
        }
    }

    function refreshHabits() {
        const config = { headers: { Authorization: `Bearer ${userLogado.token}` } };
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

        const promise = axios.get(url, config);
        promise.then((sucess) => {
            setUserHabits(sucess.data)
        });
        promise.catch((error) => {
            console.log(error.response);
        });
    }

    useEffect(refreshHabits, []);

    if (userHabits === null) {
        return (
            <ContainerHabits>
                <div>
                    <p>Carregando...</p>
                </div>
            </ContainerHabits>
        );
    }

    return (
        <ContainerHabits>
            {deleteHabit && <DeleteHabit removeHabit={removeHabit} />}
            <SignUpHabit>
                <p>Meus hábitos</p>
                <button data-test="habit-create-btn" onClick={() => setSignUp(!signUp)} disabled={request}>+</button>
            </SignUpHabit>
            {signUp &&
                <FormHabit data-test="habit-create-container">
                    <input
                        data-test="habit-name-input"
                        disabled={request}
                        type="text"
                        placeholder="Nome do hábito"
                        value={habit.name}
                        required
                        onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                    />
                    <span>{week.map((w) => <AllButton key={w.day} w={w} habit={habit} setHabit={setHabit} request={request} />)}</span>
                    <div>
                        <button data-test="habit-create-cancel-btn" onClick={() => setSignUp(!signUp)} disabled={request}>Cancelar</button>
                        <button data-test="habit-create-save-btn" onClick={addHabit} disabled={request}>{request ? <Loading /> : 'Salvar'}</button>
                    </div>
                </FormHabit>
            }
            {userHabits.length === 0 ?
                <h2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2>
                :
                userHabits.map((h) => (
                    <MyHabits data-test="habit-container" key={h.id}>
                        <span>
                            <p data-test="habit-name">{h.name}</p>
                            <TrashIcon data-test="habit-delete-btn" onClick={() => {
                                setDeleteHabit(true);
                                setIdDelete(h.id);
                            }} />
                        </span>
                        <span>
                            {week.map((w) => <Button data-test="habit-day" key={w.day} buttonState={h.days.some((d) => w.day === d)}>{w.name}</Button>)}
                        </span>
                    </MyHabits>
                ))
            }
        </ContainerHabits>
    );
}

function AllButton({ w, habit, setHabit, request }) {

    function addButton(day) {
        if (habit.days.includes(w.day)) {
            const days = habit.days.filter((d) => d !== day);
            setHabit({ ...habit, days: days })
            return;
        }
        setHabit({ ...habit, days: [...habit.days, day] });
    }

    return (
        <Button data-test="habit-day" buttonState={habit.days.includes(w.day)} onClick={() => addButton(w.day)} disabled={request}>
            {w.name}
        </Button>
    );
}

const Button = styled.button`
    color: ${({ buttonState }) => buttonState ? "#FFFFFF" : "#DBDBDB"};
    width: 10%;
    height: 25px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    background-color: ${({ buttonState }) => buttonState ? "#CFCFCF" : "#FFFFFF"};
`;

const SignUpHabit = styled.div`
    padding: 3%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
        color: #126BA5;
        font-size: 23px;
        font-style: normal;
        font-weight: 400;
        line-height: 29px;
    }
    button{
        background-color: #52B6FF;
        color: #FFFFFF;
        font-size: 20px;
        border: none;
        border-radius: 4px;
        width: 10%;
        height: 35px;
    }
`;

const ContainerHabits = styled.div`
    width: 100%;
    /* height: 100%; */
    padding: 20% 5% 20% 5%;
    font-family: 'Lexend Deca', sans-serif;
    background-color: rgba(229, 229, 229, 0.4);
    h2{
        color: #666666;
        text-align: center;
        font-size: 18px;
        line-height: 22px;
    }
`;

const FormHabit = styled.div`
    width: 100%;
    padding: 5%;
    margin-bottom: 5%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: #FFFFFF;
    border-radius: 10px;
    input{
        width: 100%;
        padding: 5%;
        margin-bottom: 2%;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }
    span{
        margin-bottom: 5%;
        display: flex;
        justify-content: space-around;
    }
    div{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button{
            background-color: #52B6FF;
            color: #FFFFFF;
            font-size: 15px;
            border: none;
            border-radius: 4px;
            width: 60px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        button:nth-child(1){
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            margin-right: 5%;
            line-height: 20px;
            color: #52B6FF;
            background-color: #FFFFFF;
            display: flex;
            justify-content: center;
        }
    }
`;

const MyHabits = styled.div`
    width: 100%;
    padding: 5%;
    margin-bottom: 5%;
    background-color: #FFFFFF;
    border-radius: 10px;
    position: relative;
    span{
        padding: 5% 0 5% 0;
        display: flex;
        /* align-items: center; */
        justify-content: space-around;
    }
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        position: absolute;
        left: 5%;
        top: 25%
    }
`;

const TrashIcon = styled(BsTrash)`
     font-size: 20px;
     color: #666666;
     position: absolute;
     right: 5%;
     top: 8%;
     cursor: pointer;

`;
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import { BiCheckSquare } from "react-icons/bi"

const daysWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export default function TodayPage() {
    const { userLogado, setUserLogado } = useContext(CurrentUserContext);
    const [todayHabits, setTodayHabits] = useState(null);
    const day = daysWeek[dayjs().day() - 1];

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userLogado.token}` } };
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

        const promise = axios.get(url, config);
        promise.then((sucess) => {
            setTodayHabits(sucess.data);
            console.log(sucess.data);
        });
        promise.catch((error) => {
            console.log(error);
        });
    }, []);

    if (todayHabits === null) {
        return (
            <ContainerToday>Carregando...</ContainerToday>
        );
    }

    return (
        <ContainerToday>
            <div>
                <h1>{day}, {dayjs().format('DD/MM')}</h1>

                {todayHabits === null ? (
                    <h2>Nenhum hábito concluído ainda</h2>
                ) : todayHabits.some((h) => h.done === true) ? (
                    <>
                        <h2>67% dos hábitos concluídos</h2>
                        {todayHabits.map((habit) => <HabitsList key={habit.id} habit={habit} />)}
                    </>
                ) : (
                    <>
                        <h2>Nenhum hábito concluído ainda</h2>
                        {todayHabits.map((habit) => <HabitsList key={habit.id} habit={habit} />)}
                    </>
                )}

            </div>
        </ContainerToday>
    );
}

function HabitsList({ habit }) {
    const [stateCheck, setStateCheck] = useState(false);
    return (
        <>
            <TodayHabits>
                <span>
                    <p>{habit.name}</p>
                    <h3>Sequência atual: {habit.currentSequence} dias</h3>
                    <h3>Seu recorde: {habit.highestSequence} dias</h3>
                </span>
                <span>
                    <CheckBox stateCheck={stateCheck} onClick={()=>setStateCheck(!stateCheck)}/>
                </span>
            </TodayHabits>
        </>
    );
}

const ContainerToday = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20% 5% 20% 5%;
    background-color: rgba(229, 229, 229, 0.4);
    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    div{
        padding: 3%;
        h1{
            color: #126BA5;
            font-size: 23px;
            font-style: normal;
            font-weight: 400;
            line-height: 29px;
        }
        h2{
            color: #BABABA;
            text-align: start;
            font-size: 18px;
            line-height: 22px;
            margin-bottom: 5%;
        }
    }
`;

const TodayHabits = styled.div`
    width: 100%;
    padding: 5%;
    margin-bottom: 5%;
    background-color: #FFFFFF;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
        color: #666666;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 25px;

    }
`;

const CheckBox = styled(BiCheckSquare)`
    width: 50px;
    height: 50px;
    color: ${({stateCheck})=>stateCheck? "green" : "#EBEBEB"};
`;
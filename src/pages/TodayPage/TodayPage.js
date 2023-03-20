import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";

import { CurrentUserContext } from "../../components/CurrentUserContext";
import HabitsList from "./HabitsList";
import { LoadingCircle } from "../../components/Loading";

const daysWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export default function TodayPage() {
    const { userLogado, setUserLogado } = useContext(CurrentUserContext);
    const [todayHabits, setTodayHabits] = useState(null);
    const day = daysWeek[dayjs().day()];

    const config = { headers: { Authorization: `Bearer ${userLogado.token}` } };
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";    

    function habitsComplete(){
        const complete =  todayHabits.filter(h=>h.done===true).length*100/todayHabits.length.toFixed(2);
        setUserLogado({...userLogado, habitsMade: complete});
    }
    function refreshHabitsToday(){
        const promise = axios.get(url, config);
        promise.then((sucess) => {
            setTodayHabits(sucess.data);
        });
        promise.catch((error) => {
            console.log(error);
        });
    }
    useEffect(refreshHabitsToday, []);

    if (todayHabits === null) {
        return (
            <ContainerToday todayHabits={todayHabits}>
                <DivLoading><LoadingCircle/></DivLoading>
            </ContainerToday>
        );
    }

    return (
        <ContainerToday todayHabits={todayHabits} color={todayHabits.some(h=>h.done===true) ? "#8FC549" : "#BABABA"}>
            <>
                <h1 data-test="today">{day}, {dayjs().format('DD/MM')}</h1>

                {todayHabits === null ? (
                    <h2 data-test="today-counter">Nenhum hábito concluído ainda</h2>
                ) : todayHabits.some((h) => h.done === true) ? (
                    <CurrentUserContext.Provider value={{config, habitsComplete, refreshHabitsToday}}>
                        <h2 data-test="today-counter">{(todayHabits.filter(h=>h.done===true).length*100/todayHabits.length).toFixed(2)}% dos hábitos concluídos</h2>
                        {todayHabits.map((habit) => <HabitsList key={habit.id} habit={habit} />)}
                    </CurrentUserContext.Provider>
                ) : (
                    <CurrentUserContext.Provider value={{config, habitsComplete, refreshHabitsToday}}>
                        <h2 data-test="today-counter">Nenhum hábito concluído ainda</h2>
                        {todayHabits.map((habit) => <HabitsList key={habit.id} habit={habit} />)}
                    </CurrentUserContext.Provider>
                )}

            </>
        </ContainerToday>
    );
}

const ContainerToday = styled.div`
    width: 100%;
    z-index: 1;
    padding: 20% 5% 20% 5%;
    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;

    h1{
        color: #126BA5;
        font-size: 23px;
        font-style: normal;
        font-weight: 400;
        line-height: 29px;
    }
    h2{
        color: ${({color})=>color};
        text-align: start;
        font-size: 18px;
        line-height: 22px;
        margin-bottom: 5%;
    }
`;

const DivLoading = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
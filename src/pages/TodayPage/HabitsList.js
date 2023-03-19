import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { BiCheckSquare } from "react-icons/bi"
import { CurrentUserContext } from "../../components/CurrentUserContext";
import { LoadingCircle } from "../../components/Loading";

export default function HabitsList({ habit }) {
    const [stateCheck, setStateCheck] = useState(habit.done);
    const [loadingCheck, setLoadingCheck] = useState(false);
    const { config, habitsComplete, refreshHabitsToday } = useContext(CurrentUserContext);
    const bool = habit.currentSequence === habit.highestSequence;

    function refresh() {
        habitsComplete();
        setLoadingCheck(false);
    }
    useEffect(refresh, [habit]);

    function activityCheck() {
        setStateCheck(!stateCheck);
        setLoadingCheck(!loadingCheck);
        if (stateCheck) {
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`;
            const promise = axios.post(url, '', config);
            promise.then((sucess) => {
                refreshHabitsToday();
            })
            promise.catch((error) => {
                refreshHabitsToday();
            })
            return;
        }

        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`;
        const promise = axios.post(url, '', config);
        promise.then((sucess) => {
            refreshHabitsToday();
        })
        promise.catch((error) => {
            refreshHabitsToday();
        })

    }

    return (
        <>
            <TodayHabits data-test="today-habit-container" habitDone={stateCheck && "#8FC549"} recordHabit={(bool && habit.currentSequence > 0) && "#8FC549"}>
                <span>
                    <p data-test="today-habit-name">{habit.name}</p>
                    <h3 data-test="today-habit-sequence">
                        Sequência atual: <span>{habit.currentSequence} dias</span>
                    </h3>
                    <h3 data-test="today-habit-record">
                        Seu recorde: <span>{habit.highestSequence} dias</span>
                    </h3>
                </span>
                <span>
                    {
                        loadingCheck ?
                            <LoadingCircle />
                            :
                            <CheckBox
                                data-test="today-habit-check-btn"
                                style={{ fill: stateCheck ? "#8FC549" : "#EBEBEB" }}
                                onClick={activityCheck}
                            />
                    }
                </span>
            </TodayHabits>
        </>
    );
}

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
        margin-bottom: 10px;

    }
    color: #666666;
    span:first-child{
        h3:nth-child(2){  
            span{
                color: ${({ habitDone }) => habitDone};
            }
        }
        h3:nth-child(3){
            span{
                color: ${({ recordHabit }) => recordHabit};
            }
        }
    }
    
`;

const CheckBox = styled(BiCheckSquare)`
    width: 70px;
    height: 70px;
    /* fill: ${({ stateCheck }) => stateCheck}; */
`;
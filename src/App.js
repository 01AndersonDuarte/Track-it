import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TodayPage from "./pages/TodayPage/TodayPage";
import HabitsPage from "./pages/Habits/HabitsPage";
import HistoryPage from "./pages/History/HistoryPage";

import HeaderFooter from "./components/HeaderFooter";

import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { CurrentUserContext } from "./components/CurrentUserContext";


export default function App() {
  const [userLogado, setUserLogado] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <CurrentUserContext.Provider value={{userLogado, setUserLogado}}>
      <Container userLogado={userLogado}>
        <BrowserRouter>
          <HeaderFooter/>
            <Routes>
              <Route path="/" element={<LoginPage/>} />
              <Route path="/cadastro" element={<RegisterPage />} />
              <Route path="/hoje" element={<TodayPage />} />
              <Route path="/habitos" element={<HabitsPage />} />
              <Route path="/historico" element={<HistoryPage />} />
            </Routes>
        </BrowserRouter>
      </Container>
    </CurrentUserContext.Provider>
  );
}

const Container = styled.div`
  width: 100%;
  padding: ${({userLogado})=>userLogado===null ? `5%` : `0%`};

  display: flex;
  align-items: center;
  flex-direction: column;
`;
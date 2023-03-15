import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TodayPage from "./pages/TodayPage/TodayPage";

import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/register-page" element={<RegisterPage/>}/>
          <Route path="/today-page" element={<TodayPage/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 5%;

  display: flex;
  align-items: center;
  flex-direction: column;
`;
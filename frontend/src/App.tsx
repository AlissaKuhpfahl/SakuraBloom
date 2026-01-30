// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
// Pages
import Home from "./Pages/Home.tsx";
import Modules from "./Pages/Modules";
import Quiz from "./Pages/Quiz";
import Progress from "./Pages/Progress.tsx";
import Lessons from "./Pages/Lessons";
import { Login } from "./Pages/Login.tsx";
import { SignUp } from "./Pages/Signup.tsx";
//import NotFound from "./pages/NotFound";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="modules" element={<Modules />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="progress" element={<Progress />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

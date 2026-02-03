// import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
// Pages
import Home from "./pages/Home.tsx";
import Modules from "./pages/Modules";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress.tsx";
import Lessons from "./pages/Lessons";
import { Login } from "./pages/Login.tsx";
import { SignUp } from "./pages/Signup.tsx";
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

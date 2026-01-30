// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
// Pages
import Home from "./pages/Home";
import Modules from "./pages/Modules";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import Lessons from "./pages/Lessons";
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

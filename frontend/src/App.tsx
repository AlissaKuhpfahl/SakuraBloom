// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import MainLayout from "./layout/MainLayout";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl"> SakuraBloom Headline</h1>
      <p className="text-xl font-bold ">🌸 Hier ensteht Sakura Bloom 🌸</p>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

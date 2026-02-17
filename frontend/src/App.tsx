import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import MainLayout from "./layout/MainLayout";
import ProtectedLayout from "./layout/ProtectedLayout.tsx";

// Pages
import Home from "./pages/Home.tsx";
import Modules from "./pages/Modules.tsx";
import Quiz from "./pages/Quiz.tsx";
import Progress from "./pages/Progress.tsx";
import Lessons from "./pages/Lessons.tsx";
import { Login } from "./pages/Login.tsx";
import { SignUp } from "./pages/Signup.tsx";
import LessonDetail from "./pages/LessonDetail.tsx";
import { CreateProfiles } from "./pages/CreateProfiles.tsx";
import ProfileDashboard from "./pages/ProfileDashboard.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="modules" element={<Modules />} />
            <Route path="quiz" element={<Navigate to="/quiz/online" replace />} />
            <Route path="quiz/:moduleKey" element={<Quiz />} />
            <Route path="progress" element={<Progress />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="lektion/:moduleKey/:lessonId" element={<LessonDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route element={<ProtectedLayout />}>
              {/* Hier können weitere geschützte Routen hinzugefügt werden */}
              <Route path="/profile" element={<ProfileDashboard />} />
              <Route path="createProfiles" element={<CreateProfiles />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

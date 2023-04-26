import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AuthStore from './contexts/AuthStore';
import Footer from "./components/footer/Footer";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import StudentPage from "./pages/StudentPage";
import PrivateRoute from "./guards/PrivateRoute";
import CreateProjectPage from "./pages/CreateProjectPage";
import Error403Page from "./pages/Error403Page";
import CreateCohortPage from "./pages/CreateCohortPage";

function App() {
  return (
    <>
      <AuthStore>
        <Navbar />

        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-project" element={<PrivateRoute><CreateProjectPage /></PrivateRoute>} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="/students/:studentId" element={<PrivateRoute><StudentPage /></PrivateRoute>} />
          <Route path="/create-cohort" element={<PrivateRoute role="teacher"><CreateCohortPage /></PrivateRoute>} />

          <Route path="/403" element={<Error403Page />} />
        </Routes>
        
        <Footer />
      </AuthStore>
    </>
  );
}

export default App;

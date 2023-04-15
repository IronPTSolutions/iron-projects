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

function App() {
  return (
    <>
      <AuthStore>
        <Navbar />

        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="/students/:studentId" element={<PrivateRoute><StudentPage /></PrivateRoute>} />
        </Routes>
        
        <Footer />
      </AuthStore>
    </>
  );
}

export default App;

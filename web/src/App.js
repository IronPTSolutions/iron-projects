import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AuthStore from './contexts/AuthStore';
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <AuthStore>
        <Navbar />

        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        
        <Footer />
      </AuthStore>
    </>
  );
}

export default App;

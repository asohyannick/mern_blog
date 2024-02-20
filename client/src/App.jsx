import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  SignIn,
  SignUp,
  Dashboard,
  Projects,
} from "./pages/index";
import { Header, FooterComp } from "./components/index";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { CommerceHero } from "./components/ui/commerce-hero";
import { Component as Footer } from "./components/footer-taped-design";
import SignInPageDemo from "./components/ui/sign-in-demo";
import RegisterPageDemo from "./components/ui/register-demo";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <CommerceHero />
          <Footer />
        </>
      } />
      <Route path="/login" element={<SignInPageDemo />} />
      <Route path="/register" element={<RegisterPageDemo />} />
    </Routes>
  );
}

export default App;
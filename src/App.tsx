import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { CommerceHero } from "./components/ui/commerce-hero";
import { Component as Footer } from "./components/footer-taped-design";
import SignInPageDemo from "./components/ui/sign-in-demo";
import RegisterPageDemo from "./components/ui/register-demo";
import { PageNotFoundDemo } from "./components/ui/404-page-demo";
import CartPage from "./components/ui/CartPage";
import TransactionPage from "./components/ui/TransactionPage";
import PaymentConfirmationPage from "./components/ui/PaymentConfirmationPage";
import TransactionHistoryPage from "./components/ui/TransactionHistoryPage";
import ProductReviewPage from "./components/ui/ProductReviewPage";

// Lazy load About page for faster initial load
const AboutPageDemo = lazy(() => import("./components/ui/about-page-demo"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <CommerceHero />
          <Footer />
        </motion.div>
      } />
      <Route path="/cart" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><CartPage /></motion.div>} />
      <Route path="/transaction" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TransactionPage /></motion.div>} />
      <Route path="/payment-confirmation" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><PaymentConfirmationPage /></motion.div>} />
      <Route path="/history" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TransactionHistoryPage /></motion.div>} />
      <Route path="/review" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProductReviewPage /></motion.div>} />
      <Route path="/login" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><SignInPageDemo /></motion.div>} />
      <Route path="/register" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><RegisterPageDemo /></motion.div>} />
      <Route path="/about" element={
        <Suspense fallback={<PageLoader />}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AboutPageDemo />
          </motion.div>
        </Suspense>
      } />
      {/* 404 - Catch all unmatched routes */}
      <Route path="*" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><PageNotFoundDemo /></motion.div>} />
    </Routes>
  );
}

export default App;
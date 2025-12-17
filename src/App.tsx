import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { CommerceHero } from "./components/ui/commerce-hero";
import Layout from "./components/ui/layout";
import CartPage from "./components/ui/CartPage";
import TransactionPage from "./components/ui/TransactionPage";
import PaymentConfirmationPage from "./components/ui/PaymentConfirmationPage";
import TransactionHistoryPage from "./components/ui/TransactionHistoryPage";
import ProductReviewPage from "./components/ui/ProductReviewPage";
import SignInPageDemo from "./components/ui/sign-in-demo";
import RegisterPageDemo from "./components/ui/register-demo";
import { PageNotFoundDemo } from "./components/ui/404-page-demo";
import ShopPage from "./components/ui/shop";
import ProductDetail from "./components/ui/product-detail";
import PartnerDetail from "./components/ui/partner-detail";

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
      <Route element={<Layout />}>
        <Route index element={<CommerceHero />} />
        <Route
          path="about"
          element={
            <Suspense fallback={<PageLoader />}>
              <AboutPageDemo />
            </Suspense>
          }
        />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<TransactionPage />} />
        <Route path="order-confirmation" element={<PaymentConfirmationPage />} />
        <Route path="my-orders" element={<TransactionHistoryPage />} />
        <Route path="write-review" element={<ProductReviewPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:productId" element={<ProductDetail />} />
        <Route path="partner/:partnerId" element={<PartnerDetail />} />
      </Route>

      <Route path="/login" element={<SignInPageDemo />} />
      <Route path="/register" element={<RegisterPageDemo />} />

      {/* 404 - Catch all unmatched routes */}
      <Route path="*" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><PageNotFoundDemo /></motion.div>} />
    </Routes>
  );
}

export default App;
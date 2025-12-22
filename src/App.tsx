import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CommerceHero } from "./components/ui/commerce-hero";
import { Component as Footer } from "./components/footer-taped-design";
import SignInPageDemo from "./components/ui/sign-in-demo";
import RegisterPageDemo from "./components/ui/register-demo";
import { PageNotFoundDemo } from "./components/ui/404-page-demo";

// Lazy load pages for faster initial load
const AboutPageDemo = lazy(() => import("./components/ui/about-page-demo"));
const WishlistDemo = lazy(() => import("./components/ui/wishlist-demo"));
const ProfileEditPageDemo = lazy(() => import("./components/ui/profile-edit-demo"));
const ProfileAddressAddPageDemo = lazy(() => import("./components/ui/profile-address-add-demo"));

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
        <>
          <CommerceHero />
          <Footer />
        </>
      } />
      <Route path="/login" element={<SignInPageDemo />} />
      <Route path="/register" element={<RegisterPageDemo />} />
      <Route path="/about" element={
        <Suspense fallback={<PageLoader />}>
          <AboutPageDemo />
        </Suspense>
      } />
      <Route path="/wishlist" element={
        <Suspense fallback={<PageLoader />}>
          <WishlistDemo />
        </Suspense>
      } />
      <Route path="/profile" element={
        <Suspense fallback={<PageLoader />}>
          <ProfileEditPageDemo />
        </Suspense>
      } />
      <Route path="/profile/address" element={
        <Suspense fallback={<PageLoader />}>
          <ProfileAddressAddPageDemo />
        </Suspense>
      } />
      {/* 404 - Catch all unmatched routes */}
      <Route path="*" element={<PageNotFoundDemo />} />
    </Routes>
  );
}

export default App;
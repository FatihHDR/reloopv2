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
const ProfileAddressesDemo = lazy(() => import("./components/ui/profile-addresses-demo"));
const ProfileAddressAddPageDemo = lazy(() => import("./components/ui/profile-address-add-demo"));
const ProfileOrdersDemo = lazy(() => import("./components/ui/profile-orders-demo"));
const ProfilePaymentMethodsDemo = lazy(() => import("./components/ui/profile-payment-methods-demo"));
const ProfileNotificationsDemo = lazy(() => import("./components/ui/profile-notifications-demo"));
const ProfileSecurityDemo = lazy(() => import("./components/ui/profile-security-demo"));
const ProfileSettingsDemo = lazy(() => import("./components/ui/profile-settings-demo"));

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
      <Route path="/addresses" element={
        <Suspense fallback={<PageLoader />}>
          <ProfileAddressesDemo />
        </Suspense>
      } />
      <Route path="/profile/address" element={
        <Suspense fallback={<PageLoader />}>
          <ProfileAddressAddPageDemo />
        </Suspense>
      } />
      <Route path="/orders" element={
        <Suspense fallback={<PageLoader />}>
          <ProfileOrdersDemo />
        </Suspense>
      } />
      <Route path="/payments" element={
        <Suspense fallback={<PageLoader />}>
          <ProfilePaymentMethodsDemo />
        </Suspense>
      } />
      <Route path="/notifications" element={
        <Suspense fallback={<PageLoader />}>
          <ProfileNotificationsDemo />
        </Suspense>
      } />
      <Route path="/security" element={
        <Suspense fallback={<PageLoader />}>
          <ProfileSecurityDemo />
        </Suspense>
      } />
      <Route path="/settings" element={
        <Suspense fallback={<PageLoader />}>
          <ProfileSettingsDemo />
        </Suspense>
      } />
      {/* 404 - Catch all unmatched routes */}
      <Route path="*" element={<PageNotFoundDemo />} />
    </Routes>
  );
}

export default App;
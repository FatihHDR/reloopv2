import { useState } from "react";
import { SignInPage, type Testimonial } from "@/components/ui/sign-in";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Amazing platform! The user experience is seamless and the features are exactly what I needed."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "This service has transformed how I work. Clean design, powerful features, and excellent support."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity."
  },
];

const SignInPageDemo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await authService.login({ email, password });
      // After successful login, navigate to home
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login gagal. Periksa email dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Continue with Google clicked");
    alert("Fitur Google Sign In belum tersedia");
    // Implement Google OAuth here
  };

  const handleResetPassword = () => {
    alert("Reset Password clicked - Fitur belum tersedia");
    // Implement password reset logic or navigate to reset page
  }

  const handleCreateAccount = () => {
    // Navigate to register page
    navigate("/register");
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header with ReLoop Logo */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <header className="flex items-center justify-between pt-6 pb-4">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent cursor-pointer">
              ReLoop_
            </a>
          </header>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Signing in...</p>
          </div>
        </div>
      )}

      <SignInPage
        title={
          <span className="font-light text-foreground tracking-tighter">
            Welcome to <span className="font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">ReLoop</span>
          </span>
        }
        description="Sign in to continue your sustainable shopping journey"
        heroImageSrc="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2160&q=80"
        testimonials={sampleTestimonials}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  );
};

export default SignInPageDemo;

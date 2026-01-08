import { useState } from "react";
import { RegisterPage, type Testimonial } from "@/components/ui/register";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    name: "Emma Rodriguez",
    handle: "@emmastyle",
    text: "As a student on a budget, ReLoop has been a lifesaver! I've furnished my entire apartment with quality items."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    name: "James Wilson",
    handle: "@jameswilson",
    text: "Love the sustainable approach! Found amazing vintage furniture at great prices. Highly recommend!"
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    name: "Lisa Chen",
    handle: "@lisashopping",
    text: "Best marketplace for pre-loved items. The community is genuine and trustworthy."
  },
];

const RegisterPageDemo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get('username') as string || (formData.get('email') as string)?.split('@')[0],
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      password_confirmation: formData.get('confirmPassword') as string,
      full_name: formData.get('name') as string,
      phone_number: formData.get('phone') as string || '08000000000',
    };

    // Check if passwords match
    if (data.password !== data.password_confirmation) {
      setError("Password tidak cocok!");
      setLoading(false);
      return;
    }

    try {
      await authService.register(data);
      // After successful registration, navigate to home or login
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      setError(err instanceof Error ? err.message : "Registrasi gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google clicked");
    alert("Fitur Google Sign Up belum tersedia");
    // Implement Google OAuth here
  };

  const handleSignIn = () => {
    // Navigate to login page
    navigate("/login");
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
            <p className="text-sm text-muted-foreground">Creating account...</p>
          </div>
        </div>
      )}

      <RegisterPage
        title={
          <span className="font-light text-foreground tracking-tighter">
            Join <span className="font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">ReLoop</span>
          </span>
        }
        description="Start your sustainable shopping journey today"
        heroImageSrc="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=2160&q=80"
        testimonials={sampleTestimonials}
        onRegister={handleRegister}
        onGoogleSignUp={handleGoogleSignUp}
        onSignIn={handleSignIn}
      />
    </div>
  );
};

export default RegisterPageDemo;

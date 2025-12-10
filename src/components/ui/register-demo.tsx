import { RegisterPage, type Testimonial } from "@/components/ui/register";
import { useNavigate } from "react-router-dom";

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

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    console.log("Register submitted:", data);
    alert(`Account Created! Check the browser console for form data.`);
    // After successful registration, navigate to login or home
    // navigate("/login");
  };

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google clicked");
    alert("Sign up with Google clicked");
    // Implement Google OAuth here
  };

  const handleSignIn = () => {
    // Navigate to login page
    navigate("/login");
  }

  return (
    <div className="bg-background text-foreground">
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

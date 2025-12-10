import AboutSection from "@/components/ui/about-section";
import { Component as Footer } from "@/components/footer-taped-design";
import { Link } from "react-router-dom";
import { ArrowUpRight, Home, ShoppingBag, PackageSearch, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavBar } from "./tubelight-navbar";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Shop", url: "#shop", icon: ShoppingBag },
  { name: "Categories", url: "#categories", icon: PackageSearch },
  { name: "About", url: "/about", icon: Info },
];

export default function AboutPageDemo() {
  return (
    <div className="w-full bg-background">
      {/* Header with ReLoop Logo and Navigation */}
      <div className="border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <header className="flex items-center justify-between pt-6 pb-4">
            <Link to="/" className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              ReLoop_
            </Link>
            
            {/* Navigation Bar */}
            <div className="hidden md:block">
              <NavBar items={navItems} />
            </div>
            
            <Link to="/login">
              <Button
                variant="secondary"
                className="cursor-pointer bg-primary-foreground p-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="pl-4 py-2 text-sm font-medium">Log In</span>
                <div className="rounded-full flex items-center justify-center m-auto bg-background w-10 h-10 ml-2 group-hover:scale-110 transition-transform duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </Button>
            </Link>
          </header>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

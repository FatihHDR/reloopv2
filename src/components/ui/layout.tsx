
import { Link, Outlet } from "react-router-dom"
import { ArrowUpRight, Home, ShoppingBag, PackageSearch, Info, ShoppingCart, Package } from "lucide-react"
import { NavBar } from "./tubelight-navbar"
import { Component as Footer } from "../footer-taped-design"
import { Button } from "./button"

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Shop", url: "/shop", icon: ShoppingBag },
  { name: "Categories", url: "#categories", icon: PackageSearch },
  { name: "About", url: "/about", icon: Info },
]

export default function Layout() {
  return (
    <div className="w-full bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <header className="flex items-center justify-between pt-6 pb-4 border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
          <Link to="/" className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            ReLoop_
          </Link>

          <NavBar items={navItems} />

          <div className="flex items-center gap-3">
            <Link to="/cart">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer rounded-full hover:bg-accent transition-all duration-300 group"
              >
                <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Cart</span>
              </Button>
            </Link>
            <Link to="/my-orders">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer rounded-full hover:bg-accent transition-all duration-300 group"
              >
                <Package className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">My Orders</span>
              </Button>
            </Link>
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
          </div>
        </header>
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

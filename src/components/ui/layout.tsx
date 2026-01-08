
import { useState, useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { ArrowUpRight, Home, ShoppingBag, PackageSearch, Info, Package, User, LogOut, Settings, ChevronDown } from "lucide-react"
import { NavBar } from "./tubelight-navbar"
import { Component as Footer } from "../footer-taped-design"
import { Button } from "./button"
import { getToken, removeToken, authService } from "../../services"
import type { User as UserType } from "../../types/api"

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Shop", url: "/shop", icon: ShoppingBag },
  { name: "Categories", url: "/kategori", icon: PackageSearch },
  { name: "About", url: "/about", icon: Info },
]

export default function Layout() {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)

  // Check auth state on mount and listen for auth changes
  useEffect(() => {
    const checkAuth = async () => {
      console.log('[Layout] checkAuth called')
      const token = getToken()
      console.log('[Layout] Token exists:', !!token)
      if (token) {
        try {
          console.log('[Layout] Calling authService.me()...')
          // authService.me() now returns User directly
          const user = await authService.me()
          console.log('[Layout] authService.me() response:', user)
          setUser(user)
        } catch (error) {
          // Token invalid, remove it
          console.log('[Layout] authService.me() error:', error)
          removeToken()
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    checkAuth()

    // Listen for auth changes (login/logout from other components)
    const handleAuthChange = (e: CustomEvent<{ user: UserType | null }>) => {
      setUser(e.detail.user)
      setIsLoading(false)
    }

    window.addEventListener('auth-changed', handleAuthChange as EventListener)
    return () => {
      window.removeEventListener('auth-changed', handleAuthChange as EventListener)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch {
      // Ignore logout errors
    }
    removeToken()
    setUser(null)
    setShowDropdown(false)
    navigate('/')
  }

  return (
    <div className="w-full bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <header className="flex items-center justify-between pt-6 pb-4 border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
          <Link to="/" className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            ReLoop_
          </Link>

          <NavBar items={navItems} />

          <div className="flex items-center gap-3">
            {/* Auth Button - Show Login or Profile based on auth state */}
            {isLoading ? (
              <div className="w-24 h-10 bg-muted/50 rounded-full animate-pulse" />
            ) : user ? (
              // Logged In - Show Profile Dropdown
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 px-3 py-2 rounded-full transition-all duration-300"
                >
                  {user.profile_picture_url ? (
                    <img
                      src={user.profile_picture_url}
                      alt={user.full_name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <span className="hidden sm:inline text-sm font-medium max-w-[100px] truncate">
                    {user.full_name || user.username}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-border bg-muted/30">
                        <p className="font-medium truncate">{user.full_name || user.username}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
                        >
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>Profil Saya</span>
                        </Link>
                        <Link
                          to="/my-orders"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
                        >
                          <Package className="w-4 h-4 text-muted-foreground" />
                          <span>Pesanan Saya</span>
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-muted-foreground" />
                          <span>Pengaturan</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-border py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Keluar</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Not Logged In - Show Login Button
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
            )}
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

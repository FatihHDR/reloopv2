import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./button"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sliders, X, Star, ArrowUpRight, Sparkles, TrendingUp, Store } from "lucide-react"

type Product = {
  id: number
  title: string
  price: number
  priceText: string
  image: string
  condition?: string
  popularity?: number
  partnerId?: number
  category?: string
}

type Partner = {
  id: number
  name: string
  logo?: string
  description?: string
  rating?: number
  verified?: boolean
  products: Product[]
}

const partnersData: Partner[] = [
  {
    id: 1,
    name: "KosKita Thrift",
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    description: "Preloved home & decor from kost sellers.",
    rating: 4.8,
    verified: true,
    products: [
      { id: 11, title: "Wooden Chair", price: 120000, priceText: "Rp 120.000", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop", condition: "Good", popularity: 45, partnerId: 1, category: "Furniture" },
      { id: 12, title: "Bedside Lamp", price: 80000, priceText: "Rp 80.000", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop", condition: "Like New", popularity: 32, partnerId: 1, category: "Electronics" },
      { id: 13, title: "Coffee Table", price: 150000, priceText: "Rp 150.000", image: "https://images.unsplash.com/photo-1532372320572-cda2b58bb6b9?w=800&auto=format&fit=crop", condition: "Good", popularity: 28, partnerId: 1, category: "Furniture" },
    ],
  },
  {
    id: 2,
    name: "ThriftThreads",
    logo: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=200&h=200&fit=crop",
    description: "Curated second-hand clothing and accessories.",
    rating: 4.9,
    verified: true,
    products: [
      { id: 21, title: "Denim Jacket", price: 150000, priceText: "Rp 150.000", image: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=800&auto=format&fit=crop", condition: "Good", popularity: 72, partnerId: 2, category: "Fashion" },
      { id: 22, title: "Vintage Tee", price: 45000, priceText: "Rp 45.000", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop", condition: "Fair", popularity: 55, partnerId: 2, category: "Fashion" },
      { id: 23, title: "Black Jeans", price: 120000, priceText: "Rp 120.000", image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&auto=format&fit=crop", condition: "Good", popularity: 68, partnerId: 2, category: "Fashion" },
    ],
  },
  {
    id: 3,
    name: "ElectroSwap",
    logo: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=200&h=200&fit=crop",
    description: "Used electronics checked and tested.",
    rating: 4.7,
    verified: true,
    products: [
      { id: 31, title: "Portable Speaker", price: 200000, priceText: "Rp 200.000", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop", condition: "Good", popularity: 88, partnerId: 3, category: "Audio" },
      { id: 32, title: "Wireless Headphones", price: 250000, priceText: "Rp 250.000", image: "https://images.unsplash.com/photo-1505470468204-1771b0007033?w=800&auto=format&fit=crop", condition: "Like New", popularity: 95, partnerId: 3, category: "Audio" },
    ],
  },
]

export default function ShopPage() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">("popular")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const allProducts = useMemo(() => {
    return partnersData.flatMap((p) => p.products.map((prd) => ({ ...prd, partner: { id: p.id, name: p.name, logo: p.logo, rating: p.rating, verified: p.verified } })))
  }, [])

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = allProducts.filter((prd) => {
      if (!q) return true
      return prd.title.toLowerCase().includes(q) || (prd.partner?.name ?? "").toLowerCase().includes(q)
    })

    if (selectedPartner) {
      list = list.filter((prd) => prd.partnerId === selectedPartner.id)
    }

    if (sort === "popular") list = list.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    if (sort === "price-asc") list = list.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = list.sort((a, b) => b.price - a.price)

    return list
  }, [allProducts, query, sort, selectedPartner])

  const popularItems = useMemo(() => [...allProducts].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)).slice(0, 6), [allProducts])

  const getConditionStyle = (condition?: string) => {
    switch (condition) {
      case "Like New":
        return "bg-green-100 text-green-700 border-green-200"
      case "Good":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Fair":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container px-4 md:px-6 mx-auto max-w-7xl mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-accent/30 via-accent/20 to-primary/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary),0.1),transparent_50%)]" />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Sustainable Shopping</span>
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Temukan Barang Impianmu
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl mb-6">
              Jelajahi ribuan produk preloved berkualitas dari mitra terpercaya. Belanja hemat, ramah lingkungan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="#products">
                <Button className="rounded-full px-6 py-5 text-base font-medium shadow-lg hover:shadow-xl transition-all">
                  Mulai Belanja
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 mx-auto max-w-7xl py-10">
        {/* Featured Partners */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Mitra Unggulan</h2>
              <p className="text-sm text-muted-foreground">Toko terpercaya dengan produk berkualitas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnersData.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setSelectedPartner(selectedPartner?.id === partner.id ? null : partner)}
                className={`bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm rounded-2xl p-5 border transition-all cursor-pointer ${selectedPartner?.id === partner.id
                  ? "border-primary ring-2 ring-primary/20 shadow-lg"
                  : "border-border/50 hover:border-primary/50 hover:shadow-md"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img src={partner.logo} alt={partner.name} className="w-16 h-16 rounded-xl object-cover shadow-md" />
                    {partner.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow">
                        ✓
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{partner.description}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{partner.rating}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{partner.products.length} produk</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to={`/partner/${partner.id}`} className="flex-1" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="sm" className="w-full rounded-full">
                      Kunjungi Toko
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Popular Items */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Sedang Populer</h2>
              <p className="text-sm text-muted-foreground">Produk yang banyak diminati</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularItems.map((prd, index) => (
              <Link key={prd.id} to={`/product/${prd.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img src={prd.image} alt={prd.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {prd.condition && (
                      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium border ${getConditionStyle(prd.condition)}`}>
                        {prd.condition}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{prd.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{prd.partner?.name}</p>
                    <p className="font-bold text-primary mt-2">{prd.priceText}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Search & Filter Section */}
        <div id="products" className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Semua Produk</h2>
              <p className="text-sm text-muted-foreground">
                {selectedPartner ? `Menampilkan produk dari ${selectedPartner.name}` : "Jelajahi semua katalog produk"}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                  <Search size={18} />
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari produk..."
                  className="w-full border border-border rounded-full pl-10 pr-10 py-2.5 bg-background text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className={`flex items-center gap-2 border rounded-full px-4 py-2.5 bg-background hover:shadow-sm transition-all ${filtersOpen ? "border-primary" : "border-border"
                    }`}
                >
                  <Sliders size={16} />
                  <span className="text-sm hidden sm:inline">Filter</span>
                </button>

                <AnimatePresence>
                  {filtersOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-2xl shadow-xl p-4 z-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold">Urutkan</span>
                        <button onClick={() => setFiltersOpen(false)} className="text-muted-foreground hover:text-foreground">
                          <X size={18} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {[
                          { value: "popular", label: "Paling Populer" },
                          { value: "price-asc", label: "Harga: Terendah" },
                          { value: "price-desc", label: "Harga: Tertinggi" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${sort === option.value ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/50"
                              }`}
                          >
                            <input
                              type="radio"
                              name="sort"
                              className="sr-only"
                              checked={sort === option.value}
                              onChange={() => setSort(option.value as typeof sort)}
                            />
                            <span className={`text-sm ${sort === option.value ? "font-medium text-primary" : ""}`}>{option.label}</span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 rounded-full"
                          onClick={() => {
                            setSort("popular")
                            setSelectedPartner(null)
                          }}
                        >
                          Reset
                        </Button>
                        <Button size="sm" className="flex-1 rounded-full" onClick={() => setFiltersOpen(false)}>
                          Terapkan
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {selectedPartner && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">
                <span>Filter: {selectedPartner.name}</span>
                <button onClick={() => setSelectedPartner(null)} className="hover:bg-primary/20 rounded-full p-0.5">
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground mb-6">Menampilkan {filteredProducts.length} produk</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((prd, index) => (
              <Link key={prd.id} to={`/product/${prd.id}`}>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.03 * index }}
                  whileHover={{ y: -6 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={prd.image} alt={prd.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {prd.condition && (
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${getConditionStyle(prd.condition)}`}>
                        {prd.condition}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold line-clamp-1">{prd.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{prd.category}</p>
                      </div>
                      <img src={prd.partner?.logo} alt={prd.partner?.name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-muted-foreground">{prd.partner?.name}</span>
                      {prd.partner?.verified && (
                        <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">✓</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{prd.priceText}</span>
                      <Button size="sm" className="rounded-full">
                        Lihat
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-muted-foreground mb-4">Coba kata kunci lain atau reset filter</p>
            <Button variant="outline" onClick={() => { setQuery(""); setSelectedPartner(null) }}>
              Reset Pencarian
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

import { useState, useMemo } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Button } from "./button"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, Sliders, X, Star } from "lucide-react"

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
  verified?: boolean
  rating?: number
  reviews?: number
  followers?: number
  responseTime?: string
  products: Product[]
}

// Partner data with categories
const partnersData: Partner[] = [
  {
    id: 1,
    name: "KosKita Thrift",
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    description: "Preloved home & decor from kost sellers.",
    verified: true,
    rating: 4.8,
    reviews: 156,
    followers: 2340,
    responseTime: "< 1 jam",
    products: [
      {
        id: 11,
        title: "Wooden Chair",
        price: 120000,
        priceText: "Rp 120.000",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 45,
        partnerId: 1,
        category: "Furniture",
      },
      {
        id: 12,
        title: "Bedside Lamp",
        price: 80000,
        priceText: "Rp 80.000",
        image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop",
        condition: "Like New",
        popularity: 32,
        partnerId: 1,
        category: "Elektronik",
      },
      {
        id: 13,
        title: "Coffee Table",
        price: 150000,
        priceText: "Rp 150.000",
        image: "https://images.unsplash.com/photo-1532372320572-cda2b58bb6b9?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 28,
        partnerId: 1,
        category: "Furniture",
      },
      {
        id: 14,
        title: "Desk Organizer",
        price: 35000,
        priceText: "Rp 35.000",
        image: "https://images.unsplash.com/photo-1578926314433-32dc03e26970?w=800&auto=format&fit=crop",
        condition: "Like New",
        popularity: 55,
        partnerId: 1,
        category: "Aksesoris",
      },
      {
        id: 15,
        title: "Wall Mirror",
        price: 95000,
        priceText: "Rp 95.000",
        image: "https://images.unsplash.com/photo-1578926314433-32dc03e26970?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 42,
        partnerId: 1,
        category: "Dekorasi",
      },
      {
        id: 16,
        title: "Throw Pillow",
        price: 45000,
        priceText: "Rp 45.000",
        image: "https://images.unsplash.com/photo-1578926314433-32dc03e26970?w=800&auto=format&fit=crop",
        condition: "Like New",
        popularity: 38,
        partnerId: 1,
        category: "Dekorasi",
      },
    ],
  },
  {
    id: 2,
    name: "ThriftThreads",
    logo: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=200&h=200&fit=crop",
    description: "Curated second-hand clothing and accessories.",
    verified: true,
    rating: 4.9,
    reviews: 324,
    followers: 5120,
    responseTime: "< 30 menit",
    products: [
      {
        id: 21,
        title: "Denim Jacket",
        price: 150000,
        priceText: "Rp 150.000",
        image: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 72,
        partnerId: 2,
        category: "Jaket",
      },
      {
        id: 22,
        title: "Vintage Tee",
        price: 45000,
        priceText: "Rp 45.000",
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop",
        condition: "Fair",
        popularity: 55,
        partnerId: 2,
        category: "Kaos",
      },
      {
        id: 23,
        title: "Black Jeans",
        price: 120000,
        priceText: "Rp 120.000",
        image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 68,
        partnerId: 2,
        category: "Celana",
      },
      {
        id: 24,
        title: "Leather Belt",
        price: 75000,
        priceText: "Rp 75.000",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop",
        condition: "Like New",
        popularity: 42,
        partnerId: 2,
        category: "Aksesoris",
      },
      {
        id: 25,
        title: "Flannel Shirt",
        price: 85000,
        priceText: "Rp 85.000",
        image: "https://images.unsplash.com/photo-1570902235219-b5b51c1a8840?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 51,
        partnerId: 2,
        category: "Kemeja",
      },
      {
        id: 26,
        title: "Scarf",
        price: 35000,
        priceText: "Rp 35.000",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop",
        condition: "Like New",
        popularity: 38,
        partnerId: 2,
        category: "Aksesoris",
      },
    ],
  },
  {
    id: 3,
    name: "ElectroSwap",
    logo: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=200&h=200&fit=crop",
    description: "Used electronics checked and tested.",
    verified: true,
    rating: 4.7,
    reviews: 89,
    followers: 1560,
    responseTime: "< 2 jam",
    products: [
      {
        id: 31,
        title: "Portable Speaker",
        price: 200000,
        priceText: "Rp 200.000",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 88,
        partnerId: 3,
        category: "Audio",
      },
      {
        id: 32,
        title: "Wireless Headphones",
        price: 250000,
        priceText: "Rp 250.000",
        image: "https://images.unsplash.com/photo-1505470468204-1771b0007033?w=800&auto=format&fit=crop",
        condition: "Like New",
        popularity: 95,
        partnerId: 3,
        category: "Audio",
      },
      {
        id: 33,
        title: "USB-C Hub",
        price: 120000,
        priceText: "Rp 120.000",
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 45,
        partnerId: 3,
        category: "Aksesoris",
      },
      {
        id: 34,
        title: "Phone Stand",
        price: 55000,
        priceText: "Rp 55.000",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop",
        condition: "Like New",
        popularity: 32,
        partnerId: 3,
        category: "Aksesoris",
      },
      {
        id: 35,
        title: "Power Bank",
        price: 85000,
        priceText: "Rp 85.000",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 72,
        partnerId: 3,
        category: "Aksesori",
      },
      {
        id: 36,
        title: "Laptop Stand",
        price: 145000,
        priceText: "Rp 145.000",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 58,
        partnerId: 3,
        category: "Aksesori",
      },
    ],
  },
]

export default function PartnerDetail() {
  const { partnerId } = useParams<{ partnerId: string }>()
  const navigate = useNavigate()
  const id = partnerId ? parseInt(partnerId, 10) : 1
  const partner = partnersData.find((p) => p.id === id) || partnersData[0]

  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">("popular")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Get unique categories from partner's products
  const categories = useMemo(() => {
    const cats = [...new Set(partner.products.map((p) => p.category).filter(Boolean))] as string[]
    return cats
  }, [partner.products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = partner.products.filter((prd) => {
      const matchesSearch = query.trim() === "" || prd.title.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = selectedCategory === null || prd.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    if (sort === "popular") list = list.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    if (sort === "price-asc") list = list.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = list.sort((a, b) => b.price - a.price)

    return list
  }, [partner.products, query, selectedCategory, sort])

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Header with back button */}
        <div className="flex items-center gap-3 py-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
            <span>Kembali</span>
          </button>
        </div>

        {/* Partner header card */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-6">
            <img src={partner.logo} alt={partner.name} className="w-24 h-24 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{partner.name}</h1>
                {partner.verified && <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">✓ Terverifikasi</div>}
              </div>
              <p className="text-muted-foreground mb-4">{partner.description}</p>

              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-semibold text-primary">{partner.products.length}</span>
                  <span className="text-muted-foreground ml-1">Produk</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{partner.rating}</span>
                  <span className="text-muted-foreground">({partner.reviews} ulasan)</span>
                </div>
                <div>
                  <span className="font-semibold">{partner.followers?.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-1">Pengikut</span>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button>Ikuti</Button>
                <Button variant="secondary">Chat</Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and filters */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-full md:w-2/3 relative">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                  <Search size={18} />
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari produk..."
                  className="w-full border border-border rounded-full pl-11 pr-12 py-3 bg-background text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {query ? <X size={16} /> : null}
                </button>
              </div>

              <button
                onClick={() => setFiltersOpen((s) => !s)}
                className="flex items-center gap-2 border border-border rounded-full px-3 py-2 bg-background hover:shadow-sm"
              >
                <Sliders size={16} />
                <span className="text-sm">Urutkan</span>
              </button>
            </div>

            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute left-0 mt-3 w-full md:w-1/2 bg-background border border-border rounded-lg shadow-lg p-4 z-30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">Urutkan</div>
                    <button onClick={() => setFiltersOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <label className={`px-3 py-2 rounded-md border cursor-pointer ${sort === "popular" ? "border-primary bg-primary/5" : "border-border"}`}>
                        <input type="radio" name="sort" className="sr-only" checked={sort === "popular"} onChange={() => setSort("popular")} />
                        <span className="text-sm">Paling Populer</span>
                      </label>
                      <label className={`px-3 py-2 rounded-md border cursor-pointer ${sort === "price-asc" ? "border-primary bg-primary/5" : "border-border"}`}>
                        <input type="radio" name="sort" className="sr-only" checked={sort === "price-asc"} onChange={() => setSort("price-asc")} />
                        <span className="text-sm">Harga: Terendah</span>
                      </label>
                      <label className={`px-3 py-2 rounded-md border cursor-pointer ${sort === "price-desc" ? "border-primary bg-primary/5" : "border-border"}`}>
                        <input type="radio" name="sort" className="sr-only" checked={sort === "price-desc"} onChange={() => setSort("price-desc")} />
                        <span className="text-sm">Harga: Tertinggi</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                      <Button size="sm" onClick={() => setSort("popular")}>
                        Reset
                      </Button>
                      <Button size="sm" onClick={() => setFiltersOpen(false)}>
                        Terapkan
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-sm text-muted-foreground">{filteredProducts.length} produk</div>
        </div>

        {/* Content grid with sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <aside className="md:col-span-1">
            <div className="bg-muted/20 p-4 rounded-lg border border-border sticky top-24">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>Kategori</span>
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === null ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  Semua Produk
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <main className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredProducts.map((prd) => (
                  <Link key={prd.id} to={`/product/${prd.id}`}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="bg-background/60 border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
                    >
                      <div className="relative overflow-hidden h-44">
                        <img src={prd.image} alt={prd.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        {prd.condition && <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">{prd.condition}</div>}
                      </div>

                      <div className="p-3">
                        <div className="font-semibold line-clamp-2">{prd.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{prd.category}</div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="font-medium text-primary">{prd.priceText}</div>
                          {prd.popularity && <div className="text-xs text-muted-foreground">★ {prd.popularity}</div>}
                        </div>

                        <Button size="sm" className="w-full mt-2">
                          Lihat Detail
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Tidak ada produk yang sesuai</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

import { useState, useMemo } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Button } from "./button"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, Sliders, X, Star, MapPin, Clock, Users, MessageCircle, Heart, Share2, CheckCircle } from "lucide-react"

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
  banner?: string
  description?: string
  verified?: boolean
  rating?: number
  reviews?: number
  followers?: number
  responseTime?: string
  location?: string
  joinDate?: string
  products: Product[]
}

const partnersData: Partner[] = [
  {
    id: 1,
    name: "KosKita Thrift",
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop",
    description: "Toko preloved furniture dan dekorasi rumah dari penjual kost-kostan. Kami menyediakan barang berkualitas dengan harga terjangkau untuk kebutuhan hunian Anda.",
    verified: true,
    rating: 4.8,
    reviews: 156,
    followers: 2340,
    responseTime: "< 1 jam",
    location: "Jakarta Selatan",
    joinDate: "Bergabung sejak 2022",
    products: [
      { id: 11, title: "Wooden Chair", price: 120000, priceText: "Rp 120.000", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop", condition: "Good", popularity: 45, partnerId: 1, category: "Furniture" },
      { id: 12, title: "Bedside Lamp", price: 80000, priceText: "Rp 80.000", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop", condition: "Like New", popularity: 32, partnerId: 1, category: "Elektronik" },
      { id: 13, title: "Coffee Table", price: 150000, priceText: "Rp 150.000", image: "https://images.unsplash.com/photo-1532372320572-cda2b58bb6b9?w=800&auto=format&fit=crop", condition: "Good", popularity: 28, partnerId: 1, category: "Furniture" },
      { id: 14, title: "Desk Organizer", price: 35000, priceText: "Rp 35.000", image: "https://images.unsplash.com/photo-1578926314433-32dc03e26970?w=800&auto=format&fit=crop", condition: "Like New", popularity: 55, partnerId: 1, category: "Aksesoris" },
      { id: 15, title: "Wall Mirror", price: 95000, priceText: "Rp 95.000", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop", condition: "Good", popularity: 42, partnerId: 1, category: "Dekorasi" },
      { id: 16, title: "Throw Pillow", price: 45000, priceText: "Rp 45.000", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop", condition: "Like New", popularity: 38, partnerId: 1, category: "Dekorasi" },
    ],
  },
  {
    id: 2,
    name: "ThriftThreads",
    logo: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&auto=format&fit=crop",
    description: "Koleksi pakaian dan aksesoris secondhand berkualitas tinggi. Gaya premium dengan harga terjangkau untuk fashionista yang sadar lingkungan.",
    verified: true,
    rating: 4.9,
    reviews: 324,
    followers: 5120,
    responseTime: "< 30 menit",
    location: "Bandung",
    joinDate: "Bergabung sejak 2021",
    products: [
      { id: 21, title: "Denim Jacket", price: 150000, priceText: "Rp 150.000", image: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=800&auto=format&fit=crop", condition: "Good", popularity: 72, partnerId: 2, category: "Jaket" },
      { id: 22, title: "Vintage Tee", price: 45000, priceText: "Rp 45.000", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop", condition: "Fair", popularity: 55, partnerId: 2, category: "Kaos" },
      { id: 23, title: "Black Jeans", price: 120000, priceText: "Rp 120.000", image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&auto=format&fit=crop", condition: "Good", popularity: 68, partnerId: 2, category: "Celana" },
      { id: 24, title: "Leather Belt", price: 75000, priceText: "Rp 75.000", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop", condition: "Like New", popularity: 42, partnerId: 2, category: "Aksesoris" },
      { id: 25, title: "Flannel Shirt", price: 85000, priceText: "Rp 85.000", image: "https://images.unsplash.com/photo-1570902235219-b5b51c1a8840?w=800&auto=format&fit=crop", condition: "Good", popularity: 51, partnerId: 2, category: "Kemeja" },
      { id: 26, title: "Scarf", price: 35000, priceText: "Rp 35.000", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop", condition: "Like New", popularity: 38, partnerId: 2, category: "Aksesoris" },
    ],
  },
  {
    id: 3,
    name: "ElectroSwap",
    logo: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop",
    description: "Elektronik bekas yang sudah dicek dan diuji kualitasnya. Garansi 7 hari untuk setiap pembelian. Hemat sampai 70% dari harga baru!",
    verified: true,
    rating: 4.7,
    reviews: 89,
    followers: 1560,
    responseTime: "< 2 jam",
    location: "Surabaya",
    joinDate: "Bergabung sejak 2023",
    products: [
      { id: 31, title: "Portable Speaker", price: 200000, priceText: "Rp 200.000", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop", condition: "Good", popularity: 88, partnerId: 3, category: "Audio" },
      { id: 32, title: "Wireless Headphones", price: 250000, priceText: "Rp 250.000", image: "https://images.unsplash.com/photo-1505470468204-1771b0007033?w=800&auto=format&fit=crop", condition: "Like New", popularity: 95, partnerId: 3, category: "Audio" },
      { id: 33, title: "USB-C Hub", price: 120000, priceText: "Rp 120.000", image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&auto=format&fit=crop", condition: "Good", popularity: 45, partnerId: 3, category: "Aksesoris" },
      { id: 34, title: "Phone Stand", price: 55000, priceText: "Rp 55.000", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop", condition: "Like New", popularity: 32, partnerId: 3, category: "Aksesoris" },
      { id: 35, title: "Power Bank", price: 85000, priceText: "Rp 85.000", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop", condition: "Good", popularity: 72, partnerId: 3, category: "Aksesori" },
      { id: 36, title: "Laptop Stand", price: 145000, priceText: "Rp 145.000", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop", condition: "Good", popularity: 58, partnerId: 3, category: "Aksesori" },
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
  const [isFollowing, setIsFollowing] = useState(false)

  const categories = useMemo(() => {
    const cats = [...new Set(partner.products.map((p) => p.category).filter(Boolean))] as string[]
    return cats
  }, [partner.products])

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
      {/* Banner Section */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={partner.banner} alt={partner.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-full shadow-lg hover:bg-background transition-all"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Kembali</span>
        </motion.button>
      </div>

      {/* Partner Info Card */}
      <div className="container px-4 md:px-6 mx-auto max-w-7xl -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-background shadow-lg"
              />
              {partner.verified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                  <CheckCircle size={20} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{partner.name}</h1>
                    {partner.verified && (
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                        ✓ Terverifikasi
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground max-w-xl mb-4">{partner.description}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{partner.rating}</span>
                      <span className="text-muted-foreground">({partner.reviews} ulasan)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold">{partner.followers?.toLocaleString()}</span>
                      <span className="text-muted-foreground">pengikut</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Respon {partner.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{partner.location}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    className="rounded-full px-6"
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                    {isFollowing ? "Mengikuti" : "Ikuti"}
                  </Button>
                  <Button variant="outline" className="rounded-full px-6">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{partner.products.length}</div>
              <div className="text-sm text-muted-foreground">Produk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{partner.rating}</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{partner.reviews}</div>
              <div className="text-sm text-muted-foreground">Ulasan</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Products Section */}
      <div className="container px-4 md:px-6 mx-auto max-w-7xl py-10">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Produk dari {partner.name}</h2>
            <p className="text-sm text-muted-foreground">{filteredProducts.length} produk tersedia</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
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
                      <Button variant="outline" size="sm" className="flex-1 rounded-full" onClick={() => setSort("popular")}>
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

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
            >
              {cat}
            </button>
          ))}
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
                  <div className="relative aspect-square overflow-hidden">
                    <img src={prd.image} alt={prd.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {prd.condition && (
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${getConditionStyle(prd.condition)}`}>
                        {prd.condition}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-1 mb-1">{prd.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{prd.category}</p>
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
            <p className="text-muted-foreground mb-4">Coba kata kunci lain atau pilih kategori berbeda</p>
            <Button variant="outline" onClick={() => { setQuery(""); setSelectedCategory(null) }}>
              Reset Pencarian
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

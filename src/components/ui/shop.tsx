import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "./button"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sliders, X, ArrowUpRight, Sparkles, TrendingUp, Store, Loader2 } from "lucide-react"
import { productService, categoryService } from "../../services"
import type { Product, Category } from "../../types/api"

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">("popular")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Fetch products and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [productsRes, categoriesRes] = await Promise.all([
          productService.getAll({ per_page: 50 }),
          categoryService.getAll({ per_page: 20 })
        ])

        setProducts(productsRes.data || [])
        setCategories(categoriesRes.data || [])

        // Auto-select category from URL if present
        if (categoryFromUrl) {
          const categoryId = parseInt(categoryFromUrl)
          const foundCategory = categoriesRes.data?.find(c => c.id === categoryId)
          if (foundCategory) {
            setSelectedCategory(foundCategory)
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Gagal memuat data. Silakan coba lagi.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryFromUrl])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = products.filter((prd) => {
      if (!q) return true
      return prd.name?.toLowerCase().includes(q) || prd.description?.toLowerCase().includes(q)
    })

    if (selectedCategory) {
      list = list.filter((prd) => prd.category_id === selectedCategory.id)
    }

    // Sort products
    if (sort === "popular") {
      // Use created_at as proxy for popularity if no views field
      list = [...list].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price)

    return list
  }, [products, query, sort, selectedCategory])

  // Popular items - first 6
  const popularItems = useMemo(() => filteredProducts.slice(0, 6), [filteredProducts])

  // Format price to Indonesian Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Get condition display style
  const getConditionStyle = (condition?: string) => {
    switch (condition) {
      case "like_new":
        return "bg-green-100 text-green-700 border-green-200"
      case "new_with_tag":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "fair":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getConditionLabel = (condition?: string) => {
    switch (condition) {
      case "new_with_tag": return "New with Tag"
      case "like_new": return "Like New"
      case "good": return "Good"
      case "fair": return "Fair"
      default: return condition || "Unknown"
    }
  }

  // Get primary image URL
  const getImageUrl = (product: Product) => {
    if (product.primary_image?.image_url) return product.primary_image.image_url
    if (product.images && product.images.length > 0) return product.images[0].image_url
    return "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&auto=format&fit=crop"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Memuat produk...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
        </div>
      </div>
    )
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
        {/* Categories Section */}
        {categories.length > 0 && (
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
                <h2 className="text-2xl font-bold">Kategori</h2>
                <p className="text-sm text-muted-foreground">Pilih kategori yang kamu cari</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => setSelectedCategory(selectedCategory?.id === category.id ? null : category)}
                  className={`bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm rounded-2xl p-4 border transition-all cursor-pointer text-center ${selectedCategory?.id === category.id
                    ? "border-primary ring-2 ring-primary/20 shadow-lg"
                    : "border-border/50 hover:border-primary/50 hover:shadow-md"
                    }`}
                >
                  {category.icon_url && (
                    <img src={category.icon_url} alt={category.name} className="w-12 h-12 mx-auto mb-2 rounded-lg object-cover" />
                  )}
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Popular Items */}
        {popularItems.length > 0 && (
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
                      <img src={getImageUrl(prd)} alt={prd.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {prd.condition_status && (
                        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium border ${getConditionStyle(prd.condition_status)}`}>
                          {getConditionLabel(prd.condition_status)}
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{prd.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{prd.seller?.full_name || prd.seller?.username}</p>
                      <p className="font-bold text-primary mt-2">{formatPrice(prd.price)}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Search & Filter Section */}
        <div id="products" className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Semua Produk</h2>
              <p className="text-sm text-muted-foreground">
                {selectedCategory ? `Menampilkan produk dari kategori ${selectedCategory.name}` : "Jelajahi semua katalog produk"}
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
                          { value: "popular", label: "Terbaru" },
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
                            setSelectedCategory(null)
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

          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">
                <span>Kategori: {selectedCategory.name}</span>
                <button onClick={() => setSelectedCategory(null)} className="hover:bg-primary/20 rounded-full p-0.5">
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
                    <img src={getImageUrl(prd)} alt={prd.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {prd.condition_status && (
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${getConditionStyle(prd.condition_status)}`}>
                        {getConditionLabel(prd.condition_status)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold line-clamp-1">{prd.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{prd.category?.name}</p>
                      </div>
                      {prd.seller?.profile_picture_url && (
                        <img src={prd.seller.profile_picture_url} alt={prd.seller.full_name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-muted-foreground">{prd.seller?.full_name || prd.seller?.username}</span>
                      {prd.seller?.seller_code && (
                        <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">✓</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{formatPrice(prd.price)}</span>
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
            <Button variant="outline" onClick={() => { setQuery(""); setSelectedCategory(null) }}>
              Reset Pencarian
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

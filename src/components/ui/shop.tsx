import React, { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./button"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sliders, X } from "lucide-react"
import heroImg from "../../assets/assetZamZam/360_F_526999539_uDArwR72n2CRh9cynglZ5pF48O6DeYLA.jpg"

type Product = {
  id: number
  title: string
  price: number 
  priceText: string
  image: string
  condition?: string
  popularity?: number 
  partnerId?: number
}

type Partner = {
  id: number
  name: string
  logo?: string
  description?: string
  products: Product[]
}

// sample data inspired by Preloved structure but adapted to our theme
const partnersData: Partner[] = [
  {
    id: 1,
    name: "KosKita Thrift",
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    description: "Preloved home & decor from kost sellers.",
    products: [
      { id: 11, title: "Wooden Chair", price: 120000, priceText: "Rp 120.000", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop", condition: "Good", popularity: 45, partnerId: 1 },
      { id: 12, title: "Bedside Lamp", price: 80000, priceText: "Rp 80.000", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop", condition: "Like New", popularity: 32, partnerId: 1 },
    ],
  },
  {
    id: 2,
    name: "ThriftThreads",
    logo: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=200&h=200&fit=crop",
    description: "Curated second-hand clothing and accessories.",
    products: [
      { id: 21, title: "Denim Jacket", price: 150000, priceText: "Rp 150.000", image: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=800&auto=format&fit=crop", condition: "Good", popularity: 72, partnerId: 2 },
      { id: 22, title: "Vintage Tee", price: 45000, priceText: "Rp 45.000", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop", condition: "Fair", popularity: 55, partnerId: 2 },
    ],
  },
  {
    id: 3,
    name: "ElectroSwap",
    logo: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=200&h=200&fit=crop",
    description: "Used electronics checked and tested.",
    products: [
      { id: 31, title: "Portable Speaker", price: 200000, priceText: "Rp 200.000", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop", condition: "Good", popularity: 88, partnerId: 3 },
    ],
  },
]

export default function ShopPage() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(partnersData[0])
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">("popular")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // flatten products with partner info
  const allProducts = useMemo(() => {
    return partnersData.flatMap((p) => p.products.map((prd) => ({ ...prd, partner: { id: p.id, name: p.name, logo: p.logo } })))
  }, [])

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = allProducts.filter((prd) => {
      if (!q) return true
      return (
        prd.title.toLowerCase().includes(q) ||
        (prd.partner?.name ?? "").toLowerCase().includes(q)
      )
    })

    if (sort === "popular") list = list.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    if (sort === "price-asc") list = list.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = list.sort((a, b) => b.price - a.price)

    return list
  }, [allProducts, query, sort])

  const popularItems = useMemo(() => filteredProducts.slice(0, 6), [filteredProducts])

  const randomItems = useMemo(() => {
    const copy = [...allProducts]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy.slice(0, 6)
  }, [allProducts])

  const filteredPartners = partnersData.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.description?.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Hero / banner inspired by Preloved but matching our theme */}
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden mb-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-primary/40 to-accent/20">
            <img src={heroImg} alt="hero" className="w-full h-56 object-cover opacity-90" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">ReLoop tempat terpercaya jual beli barang second</h2>
              <p className="text-sm text-white/90 max-w-xl mb-4">Temukan mitra terpercaya dan barang secondhand berkualitas yang hemat, ramah lingkungan, dan unik.</p>
              <div className="flex gap-3">
                <Link to="/shop" className="">
                  <Button>Mulai Belanja</Button>
                </Link>
                <Link to="/sell" className="">
                  <Button variant="secondary">Mulai Berjualan</Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Horizontal partners scroll */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Mitra Unggulan</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-border">
            {partnersData.map((p) => (
              <div key={p.id} className="flex gap-2">
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => setSelectedPartner(p)} className={`flex-shrink-0 w-44 p-3 rounded-xl bg-muted/30 border border-border ${selectedPartner?.id === p.id ? "ring-2 ring-primary" : ""}`}>
                  <div className="flex items-center gap-3">
                    <img src={p.logo} alt={p.name} className="w-12 h-12 rounded-md object-cover" />
                    <div className="flex flex-col text-left">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.description}</div>
                    </div>
                  </div>
                </motion.button>
                <Link to={`/partner/${p.id}`}>
                  <Button size="sm" variant="outline" className="flex-shrink-0 h-full">
                    Lihat Toko
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Controls: search + sort */}
          {/* Controls: search + filters (animated) */}
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
                    placeholder="Search products or partners..."
                    className="w-full border border-border rounded-full pl-11 pr-12 py-3 bg-background text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="clear"
                  >
                    {query ? <X size={16} /> : null}
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => setFiltersOpen((s) => !s)}
                    className="flex items-center gap-2 border border-border rounded-full px-3 py-2 bg-background hover:shadow-sm"
                  >
                    <Sliders size={16} />
                    <span className="text-sm">Filters</span>
                  </button>
                </div>
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
                      <div className="font-medium">Filter</div>
                      <button onClick={() => setFiltersOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium mb-1">Sort by</div>
                        <div className="flex gap-2">
                          <label className={`px-3 py-2 rounded-md border ${sort === "popular" ? "border-primary bg-primary/5" : "border-border"}`}>
                            <input type="radio" name="sort" className="sr-only" checked={sort === "popular"} onChange={() => setSort("popular")} />
                            <span className="text-sm">Paling Populer</span>
                          </label>
                          <label className={`px-3 py-2 rounded-md border ${sort === "price-asc" ? "border-primary bg-primary/5" : "border-border"}`}>
                            <input type="radio" name="sort" className="sr-only" checked={sort === "price-asc"} onChange={() => setSort("price-asc")} />
                            <span className="text-sm">Harga: Terendah</span>
                          </label>
                          <label className={`px-3 py-2 rounded-md border ${sort === "price-desc" ? "border-primary bg-primary/5" : "border-border"}`}>
                            <input type="radio" name="sort" className="sr-only" checked={sort === "price-desc"} onChange={() => setSort("price-desc")} />
                            <span className="text-sm">Harga: Tertinggi</span>
                          </label>
                        </div>
                      </div>

                      {/* Placeholder: future filters like price range, condition */}
                      <div>
                        <div className="text-sm font-medium mb-1">Condition</div>
                        <div className="flex gap-2">
                          <button className="px-3 py-2 rounded-md border border-border text-sm">Any</button>
                          <button className="px-3 py-2 rounded-md border border-border text-sm">Like New</button>
                          <button className="px-3 py-2 rounded-md border border-border text-sm">Good</button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 justify-end">
                        <Button size="sm" onClick={() => { setQuery(""); setSort("popular"); setFiltersOpen(false) }}>Reset</Button>
                        <Button size="sm" onClick={() => setFiltersOpen(false)}>Apply</Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          
            <div className="flex items-center gap-3 md:gap-6">
              {/* small helper - current sort label */}
              <div className="text-sm text-muted-foreground">Showing {filteredProducts.length} items</div>
            </div>
          </div>

        {/* Popular items */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Sedang Populer</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularItems.map((prd) => (
              <Link key={prd.id} to={`/product/${prd.id}`}>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-background/60 border border-border rounded-lg p-2 cursor-pointer hover:shadow-md transition-shadow">
                  <img src={prd.image} alt={prd.title} className="w-full h-28 object-cover rounded-md mb-2" />
                  <div className="text-sm font-medium">{prd.title}</div>
                  <div className="text-xs text-muted-foreground">{prd.partner?.name}</div>
                  <div className="mt-2 font-semibold">{prd.priceText}</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Random picks */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Pilihan Acak Untukmu</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {randomItems.map((prd) => (
              <Link key={prd.id} to={`/product/${prd.id}`}>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-background/60 border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <img src={prd.image} alt={prd.title} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <div className="font-semibold">{prd.title}</div>
                    <div className="text-xs text-muted-foreground">{prd.partner?.name}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="font-medium">{prd.priceText}</div>
                      <Button size="sm">Lihat</Button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Main product grid (filtered) and partner profile embedded */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Semua Produk</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <aside className="md:col-span-1">
              <div className="bg-muted/30 p-4 rounded-lg border border-border sticky top-24">
                <h4 className="font-semibold mb-2">Profil Mitra</h4>
                {selectedPartner ? (
                  <div className="flex flex-col items-start gap-3">
                    <img src={selectedPartner.logo} alt={selectedPartner.name} className="w-20 h-20 rounded-md object-cover" />
                    <div className="font-medium">{selectedPartner.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedPartner.description}</div>
                    <div className="mt-2 w-full flex gap-2 flex-col">
                      <Link to={`/partner/${selectedPartner.id}`} className="w-full">
                        <Button size="sm" className="w-full">Lihat Toko</Button>
                      </Link>
                      <Button size="sm" variant="outline" onClick={() => setSelectedPartner(null)}>Lihat Semua Mitra</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">Pilih mitra untuk melihat profilnya.</div>
                )}
              </div>
            </aside>

            <main className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filteredProducts.map((prd) => (
                    <Link key={prd.id} to={`/product/${prd.id}`}>
                      <motion.div layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="bg-background/60 border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                        <img src={prd.image} alt={prd.title} className="w-full h-44 object-cover" />
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-semibold">{prd.title}</div>
                              <div className="text-xs text-muted-foreground">{prd.condition} • {prd.partner?.name}</div>
                            </div>
                            <img src={prd.partner?.logo} alt={prd.partner?.name} className="w-10 h-10 rounded-md object-cover" />
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="font-medium">{prd.priceText}</div>
                            <Button size="sm">Lihat</Button>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </AnimatePresence>
              </div>
            </main>
          </div>
        </section>
      </div>
    </div>
  )
}

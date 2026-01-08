import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Heart } from "lucide-react";
import { Button } from "./button";

type ProductCategory = "electronics" | "clothing" | "furniture" | "others";

type Product = {
  id: number;
  title: string;
  price: number;
  priceText: string;
  image: string;
  condition?: string;
  popularity?: number;
  partnerId?: number;
  category: ProductCategory;
};

type Partner = {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  products: Product[];
};

const partnersData: Partner[] = [
  {
    id: 1,
    name: "KosKita Thrift",
    logo:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
    description: "Preloved home & decor from kost sellers.",
    products: [
      {
        id: 11,
        title: "Cozy Knit Sweater",
        price: 120000,
        priceText: "Rp 120.000",    
        image:
          "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 45,
        partnerId: 1,
        category: "clothing",
      },
      {
        id: 12,
        title: "Basic White Tee",
        price: 45000,
        priceText: "Rp 45.000",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
        condition: "Like New",
        popularity: 32,
        partnerId: 1,
        category: "clothing",
      },
      {
        id: 13,
        title: "Sofa",
        price: 200000,
        priceText: "Rp 200.000",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 20,
        partnerId: 1,
        category: "furniture",
      },
    ],
  },
  {
    id: 2,
    name: "ThriftThreads",
    logo:
      "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=200&h=200&fit=crop",
    description: "Curated second-hand clothing and accessories.",
    products: [
      {
        id: 21,
        title: "Denim Jacket Levis Trucker",
        price: 150000,
        priceText: "Rp 150.000",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
        condition: "Very Good",
        popularity: 72,
        partnerId: 2,
        category: "clothing",
      },
      {
        id: 22,
        title: "Vintage Graphic Tee",
        price: 60000,
        priceText: "Rp 60.000",
        image:
          "https://images.unsplash.com/photo-1495121553079-4c61bcce189c?w=800&auto=format&fit=crop",
        condition: "Good",
        popularity: 55,
        partnerId: 2,
        category: "clothing",
      },
      {
        id: 23,
        title: "Headphone Bluetooth Sony",
        price: 180000,
        priceText: "Rp 180.000",
        image:
          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop",
        condition: "Very Good",
        popularity: 60,
        partnerId: 2,
        category: "electronics",
      },
    ],
  },
];

const subCategories = ["Semua", "Electronics", "Clothing", "Furniture", "Others"];

export default function KategoriPage() {
  const [query, setQuery] = useState("");
  const [activeSubCategory, setActiveSubCategory] = useState("Semua");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const allProducts = useMemo(() => {
    return partnersData.flatMap((p) =>
      p.products.map((prd) => ({
        ...prd,
        partner: { id: p.id, name: p.name, logo: p.logo },
      }))
    );
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = allProducts;

    // search berdasarkan nama produk atau nama partner
    if (q) {
      list = list.filter(
        (prd) =>
          prd.title.toLowerCase().includes(q) ||
          (prd.partner?.name ?? "").toLowerCase().includes(q)
      );
    }

    // filter berdasarkan kategori utama (electronics, clothing, furniture, others)
    if (activeSubCategory !== "Semua") {
      const key = activeSubCategory.toLowerCase(); // "electronics" | "clothing" | ...
      list = list.filter((prd) => prd.category === key);
    }

    return list;
  }, [allProducts, query, activeSubCategory]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-16 pt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading + subheading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Product Collection
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Temukan barang second berkualitas dengan harga terbaik
          </p>
        </div>

        {/* Search bar besar */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Chip kategori horizontal */}
        <div className="flex gap-3 mb-8 overflow-x-auto">
          {subCategories.map((cat) => {
            const active = activeSubCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveSubCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background border-border text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prd) => (
            <motion.div
              key={prd.id}
              whileHover={{ y: -4 }}
              className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={prd.image}
                  alt={prd.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleWishlist(prd.id)}
                  className="absolute right-3 top-3 bg-background/90 rounded-full p-1.5 shadow-sm"
                >
                  <Heart
                    size={18}
                    className={
                      wishlist.includes(prd.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground"
                    }
                  />
                </button>
                {prd.condition && (
                  <span className="absolute left-3 top-3 text-[11px] font-semibold px-2 py-1 rounded-full bg-background/90 text-foreground">
                    {prd.condition}
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  {prd.category}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {prd.partner?.name}
                </div>
                <div className="font-semibold text-sm md:text-base line-clamp-2 mb-2">
                  {prd.title}
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{prd.priceText}</div>
                  <Link to={`/product/${prd.id}`}>
                    <Button size="sm" variant="outline">
                      Lihat
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

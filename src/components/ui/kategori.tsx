import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Store, Package, ArrowRight, Sparkles } from "lucide-react";
import { categoryService } from "../../services/categoryService";
import { productService } from "../../services/productService";
import type { Category } from "../../types/api";

// Category card colors for visual variety
const categoryColors = [
  "from-violet-500/20 via-violet-500/10 to-purple-500/5 hover:from-violet-500/30",
  "from-emerald-500/20 via-emerald-500/10 to-teal-500/5 hover:from-emerald-500/30",
  "from-amber-500/20 via-amber-500/10 to-orange-500/5 hover:from-amber-500/30",
  "from-rose-500/20 via-rose-500/10 to-pink-500/5 hover:from-rose-500/30",
  "from-sky-500/20 via-sky-500/10 to-blue-500/5 hover:from-sky-500/30",
  "from-lime-500/20 via-lime-500/10 to-green-500/5 hover:from-lime-500/30",
];

interface CategoryWithCount extends Category {
  productCount?: number;
}

const Kategori = () => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch categories and products in parallel
      const [categoriesRes, productsRes] = await Promise.all([
        categoryService.getAll({ per_page: 50 }),
        productService.getAll({ per_page: 1, status: "active" }) // Just to get total count
      ]);

      // Get product counts per category
      const categoriesWithCounts = await Promise.all(
        categoriesRes.data.map(async (cat) => {
          try {
            const productRes = await productService.getAll({
              category_id: cat.id,
              per_page: 1,
              status: "active"
            });
            return {
              ...cat,
              productCount: productRes.meta?.total || 0
            };
          } catch {
            return { ...cat, productCount: 0 };
          }
        })
      );

      setCategories(categoriesWithCounts);
      setTotalProducts(productsRes.meta?.total || 0);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-3xl p-8 md:p-12 mb-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(var(--primary),0.15),transparent_60%)]" />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Browse by Category</span>
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
                Jelajahi Kategori
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Temukan produk preloved berkualitas dari berbagai kategori. Pilih kategori favoritmu dan mulai belanja!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm px-5 py-3 rounded-2xl border border-border/50">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Store className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{categories.length}</p>
                  <p className="text-xs text-muted-foreground">Kategori</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm px-5 py-3 rounded-2xl border border-border/50">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                  <p className="text-xs text-muted-foreground">Total Produk</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Semua Kategori</h2>
              <p className="text-sm text-muted-foreground">Klik kategori untuk melihat produk</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Lihat Semua Produk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Memuat kategori...</p>
              </div>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-border/50">
              <Store className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Belum ada kategori</h3>
              <p className="text-muted-foreground">Kategori akan ditambahkan segera</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.id}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`relative bg-gradient-to-br ${categoryColors[index % categoryColors.length]} backdrop-blur-sm rounded-2xl p-6 border border-border/50 transition-all duration-300 cursor-pointer group overflow-hidden h-full`}
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      {/* Category Icon */}
                      <div className="w-16 h-16 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                        {category.icon_url ? (
                          <img
                            src={category.icon_url}
                            alt={category.name}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <Store className="w-8 h-8 text-primary" />
                        )}
                      </div>

                      {/* Category Info */}
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        Temukan produk berkualitas di kategori ini
                      </p>

                      {/* Product Count & CTA */}
                      <div className="flex items-center justify-between">
                        <span className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                          {category.productCount || 0} produk
                        </span>
                        <span className="inline-flex items-center gap-1 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          Jelajahi
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kategori;

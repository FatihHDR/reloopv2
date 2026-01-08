import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "./button"
import { motion } from "framer-motion"
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, ChevronLeft, ChevronRight, CheckCircle, Truck, Shield, RotateCcw, MessageCircle, Minus, Plus, Loader2 } from "lucide-react"
import { productService, wishlistService, getToken } from "../../services"
import type { Product } from "../../types/api"

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const id = productId ? parseInt(productId, 10) : 0

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID tidak valid")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const response = await productService.getById(id)
        setProduct(response.data)

        // Check if product is in wishlist
        if (getToken()) {
          try {
            const wishlistCheck = await wishlistService.check(id)
            setIsFavorite(wishlistCheck.data?.in_wishlist || false)
          } catch {
            // Ignore wishlist check errors
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Gagal memuat produk. Silakan coba lagi.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // Get images from product
  const getImages = () => {
    if (!product) return []
    if (product.images && product.images.length > 0) {
      return product.images.map(img => img.image_url)
    }
    if (product.primary_image?.image_url) {
      return [product.primary_image.image_url]
    }
    return ["https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&auto=format&fit=crop"]
  }

  const images = getImages()
  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % images.length)
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length)

  const toggleFavorite = async () => {
    if (!getToken()) {
      navigate("/login")
      return
    }

    setWishlistLoading(true)
    try {
      if (isFavorite) {
        await wishlistService.removeByProductId(id)
        setIsFavorite(false)
      } else {
        await wishlistService.add(id)
        setIsFavorite(true)
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err)
    } finally {
      setWishlistLoading(false)
    }
  }

  // Format price to Indonesian Rupiah
  const formatPrice = (price?: number) => {
    if (!price) return "Rp 0"
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

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

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Produk tidak ditemukan"}</p>
          <Button onClick={() => navigate("/shop")}>Kembali ke Shop</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl py-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm mb-6"
        >
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </button>
          <span className="text-muted-foreground">/</span>
          <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
            Shop
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted/20 rounded-3xl overflow-hidden border border-border group">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Condition Badge */}
              {product.condition_status && (
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium border ${getConditionStyle(product.condition_status)}`}>
                  {getConditionLabel(product.condition_status)}
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === currentImageIndex
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                      }`}
                  >
                    <img src={img} alt={`${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Title & Actions */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{product.category?.name}</p>
                  <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={toggleFavorite}
                    disabled={wishlistLoading}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isFavorite ? "bg-red-50 border-red-200 text-red-500" : "border-border hover:border-primary text-muted-foreground"
                      }`}
                  >
                    {wishlistLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Heart size={20} className={isFavorite ? "fill-current" : ""} />
                    )}
                  </button>
                  <button className="w-10 h-10 rounded-full border border-border hover:border-primary flex items-center justify-center text-muted-foreground transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Location */}
              {product.location && (
                <p className="text-sm text-muted-foreground">📍 {product.location}</p>
              )}
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5 border border-border">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl md:text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
              </div>
              <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                {getConditionLabel(product.condition_status)}
              </span>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-2 block">Jumlah</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-l-full transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center border-0 bg-transparent focus:outline-none font-medium"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-r-full transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock ? `${product.stock} tersedia` : "Stok tersedia"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="flex-1 rounded-full py-6 text-base font-semibold">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Keranjang
              </Button>
              <Button size="lg" className="flex-1 rounded-full py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                Beli Sekarang
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground">Transaksi Aman</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground">Pengiriman Cepat</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-orange-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-xs text-muted-foreground">Garansi 7 Hari</p>
              </div>
            </div>

            {/* Seller Card */}
            {product.seller && (
              <Link to={`/partner/${product.seller.id}`}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={product.seller.profile_picture_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"}
                        alt={product.seller.full_name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      {product.seller.seller_code && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                          <CheckCircle size={12} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold truncate">{product.seller.full_name || product.seller.username}</h4>
                        {product.seller.seller_code && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">Verified</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          Penjual
                        </span>
                        {product.seller.city && (
                          <>
                            <span>•</span>
                            <span>{product.seller.city}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full" onClick={(e) => e.preventDefault()}>
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </motion.div>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Deskripsi Produk</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description || "Tidak ada deskripsi tersedia."}
            </p>
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Spesifikasi</h3>
            <div className="space-y-3">
              <div className="flex justify-between gap-4 py-3 border-b border-border">
                <span className="text-muted-foreground">Kategori</span>
                <span className="font-medium text-right">{product.category?.name || "-"}</span>
              </div>
              <div className="flex justify-between gap-4 py-3 border-b border-border">
                <span className="text-muted-foreground">Kondisi</span>
                <span className="font-medium text-right">{getConditionLabel(product.condition_status)}</span>
              </div>
              <div className="flex justify-between gap-4 py-3 border-b border-border">
                <span className="text-muted-foreground">Lokasi</span>
                <span className="font-medium text-right">{product.location || "-"}</span>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-right capitalize">{product.status || "-"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

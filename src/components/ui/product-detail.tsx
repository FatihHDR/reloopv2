import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "./button"
import { motion } from "framer-motion"
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, ChevronLeft, ChevronRight, CheckCircle, Truck, Shield, RotateCcw, MessageCircle, Minus, Plus } from "lucide-react"

type ProductDetailProps = {
  id: number
  title: string
  price: number
  priceText: string
  originalPrice?: string
  discount?: number
  image: string
  images?: string[]
  condition?: string
  popularity?: number
  description?: string
  seller: {
    id: number
    name: string
    logo?: string
    rating?: number
    reviews?: number
    verified?: boolean
    responseTime?: string
    followers?: number
  }
  specs?: { label: string; value: string }[]
  category?: string
}

const productDetailsData: { [key: number]: ProductDetailProps } = {
  11: {
    id: 11,
    title: "Wooden Chair",
    price: 120000,
    priceText: "Rp 120.000",
    originalPrice: "Rp 350.000",
    discount: 66,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b40?w=800&auto=format&fit=crop",
    ],
    condition: "Good",
    popularity: 45,
    category: "Furniture",
    description: "Kursi kayu vintage dengan desain klasik. Masih dalam kondisi baik, hanya ada sedikit goresan di sudut. Cocok untuk ruang tamu atau kamar tidur. Beli sekarang dan dapatkan potongan harga!\n\nKursi ini terbuat dari kayu jati berkualitas tinggi yang tahan lama. Desainnya yang timeless membuatnya cocok untuk berbagai gaya interior, mulai dari modern minimalis hingga skandinavian.",
    seller: {
      id: 1,
      name: "KosKita Thrift",
      logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 156,
      verified: true,
      responseTime: "< 1 jam",
      followers: 2340,
    },
    specs: [
      { label: "Kategori", value: "Furniture > Kursi" },
      { label: "Material", value: "Kayu Jati" },
      { label: "Dimensi", value: "45 x 50 x 80 cm" },
      { label: "Kondisi", value: "Good - Bekas Pakai" },
      { label: "Berat", value: "5 kg" },
      { label: "Asal", value: "Jakarta" },
    ],
  },
  12: {
    id: 12,
    title: "Bedside Lamp",
    price: 80000,
    priceText: "Rp 80.000",
    originalPrice: "Rp 200.000",
    discount: 60,
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop",
    ],
    condition: "Like New",
    popularity: 32,
    category: "Electronics",
    description: "Lampu tidur modern dengan desain minimalis. Kondisi seperti baru, hanya digunakan beberapa kali. Hemat energi dengan teknologi LED.",
    seller: {
      id: 1,
      name: "KosKita Thrift",
      logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 156,
      verified: true,
      responseTime: "< 1 jam",
      followers: 2340,
    },
    specs: [
      { label: "Kategori", value: "Elektronik > Lampu" },
      { label: "Jenis", value: "LED Bedside Lamp" },
      { label: "Warna", value: "Putih" },
      { label: "Kondisi", value: "Like New" },
    ],
  },
  21: {
    id: 21,
    title: "Denim Jacket",
    price: 150000,
    priceText: "Rp 150.000",
    originalPrice: "Rp 450.000",
    discount: 67,
    image: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop",
    ],
    condition: "Good",
    popularity: 72,
    category: "Fashion",
    description: "Jaket denim klasik dengan desain oversized. Berwarna biru tua gelap, cocok dipadukan dengan berbagai outfit. Cocok untuk pria dan wanita.\n\nMaterial 100% cotton denim yang nyaman dipakai. Tidak ada noda atau kerusakan berarti. Ukuran L, cocok untuk badan M-L.",
    seller: {
      id: 2,
      name: "ThriftThreads",
      logo: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 324,
      verified: true,
      responseTime: "< 30 menit",
      followers: 5120,
    },
    specs: [
      { label: "Kategori", value: "Fashion > Jaket" },
      { label: "Ukuran", value: "L" },
      { label: "Warna", value: "Biru Tua" },
      { label: "Material", value: "100% Denim Cotton" },
      { label: "Kondisi", value: "Good - Bekas Pakai" },
    ],
  },
  31: {
    id: 31,
    title: "Portable Speaker",
    price: 200000,
    priceText: "Rp 200.000",
    originalPrice: "Rp 500.000",
    discount: 60,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
    ],
    condition: "Good",
    popularity: 88,
    category: "Audio",
    description: "Speaker portable Bluetooth dengan kualitas suara jernih. Baterai tahan lama hingga 10 jam. Sudah ditest dan berfungsi dengan baik.",
    seller: {
      id: 3,
      name: "ElectroSwap",
      logo: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 89,
      verified: true,
      responseTime: "< 2 jam",
      followers: 1560,
    },
    specs: [
      { label: "Kategori", value: "Elektronik > Audio" },
      { label: "Merek", value: "Generik" },
      { label: "Koneksi", value: "Bluetooth 5.0" },
      { label: "Baterai", value: "10 jam" },
      { label: "Kondisi", value: "Good - Teruji" },
    ],
  },
}

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const id = productId ? parseInt(productId, 10) : 11
  const product = productDetailsData[id] || productDetailsData[11]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const images = product.images || [product.image]
  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % images.length)
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length)

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
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.title}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted/20 rounded-3xl overflow-hidden border border-border group">
              <img
                src={images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Condition Badge */}
              {product.condition && (
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium border ${getConditionStyle(product.condition)}`}>
                  {product.condition}
                </div>
              )}

              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                  -{product.discount}%
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
                  <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                  <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isFavorite ? "bg-red-50 border-red-200 text-red-500" : "border-border hover:border-primary text-muted-foreground"
                      }`}
                  >
                    <Heart size={20} className={isFavorite ? "fill-current" : ""} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-border hover:border-primary flex items-center justify-center text-muted-foreground transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.seller.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">• {product.popularity} orang tertarik</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5 border border-border">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl md:text-4xl font-bold text-primary">{product.priceText}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                )}
              </div>
              {product.discount && (
                <span className="inline-block bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
                  Hemat {product.discount}%
                </span>
              )}
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
                <span className="text-sm text-muted-foreground">Stok tersedia</span>
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
            <Link to={`/partner/${product.seller.id}`}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={product.seller.logo}
                      alt={product.seller.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    {product.seller.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                        <CheckCircle size={12} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold truncate">{product.seller.name}</h4>
                      {product.seller.verified && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">Verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {product.seller.rating}
                      </span>
                      <span>•</span>
                      <span>{product.seller.reviews} ulasan</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full" onClick={(e) => e.preventDefault()}>
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </motion.div>
            </Link>
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
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
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
              {product.specs?.map((spec, i) => (
                <div
                  key={i}
                  className={`flex justify-between gap-4 py-3 ${i !== (product.specs?.length ?? 0) - 1 ? "border-b border-border" : ""
                    }`}
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

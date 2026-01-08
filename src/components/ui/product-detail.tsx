import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "./button"
import { motion } from "framer-motion"
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"

type ProductDetailProps = {
  id: number
  title: string
  price: number
  priceText: string
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
}

// Mock product detail data (extended from shop data)
const productDetailsData: { [key: number]: ProductDetailProps } = {
  11: {
    id: 11,
    title: "Wooden Chair",
    price: 120000,
    priceText: "Rp 120.000",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
    ],
    condition: "Good",
    popularity: 45,
    description: "Kursi kayu vintage dengan desain klasik. Masih dalam kondisi baik, hanya ada sedikit goresan di sudut. Cocok untuk ruang tamu atau kamar tidur. Beli sekarang dan dapatkan potongan harga!",
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
      { label: "Asal", value: "Jakarta" },
    ],
  },
  12: {
    id: 12,
    title: "Bedside Lamp",
    price: 80000,
    priceText: "Rp 80.000",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop",
    ],
    condition: "Like New",
    popularity: 32,
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
    image: "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520975869011-9f2d8a6f5d7c?w=800&auto=format&fit=crop",
    ],
    condition: "Good",
    popularity: 72,
    description: "Jaket denim klasik dengan desain oversized. Berwarna biru tua gelap, cocok dipadukan dengan berbagai outfit. Cocok untuk pria dan wanita.",
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
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
    ],
    condition: "Good",
    popularity: 88,
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

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Image gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-1">
            <div className="bg-muted/20 rounded-2xl overflow-hidden border border-border sticky top-24">
              <div className="relative w-full aspect-square bg-background/50">
                <img src={images[currentImageIndex]} alt={product.title} className="w-full h-full object-cover" />

                {/* Image counter and prev/next */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 bg-background/30">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-16 h-16 rounded-md border-2 overflow-hidden ${
                        i === currentImageIndex ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={img} alt={`${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Product info + seller */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 space-y-6">
            {/* Title and badge */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                <button onClick={() => setIsFavorite(!isFavorite)} className="flex-shrink-0">
                  <Heart size={24} className={isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">{product.condition}</div>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">Harga</div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{product.priceText}</div>
              <div className="text-xs text-muted-foreground">
                {product.popularity && <span className="inline-block">★ {product.popularity} orang tertarik</span>}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Jumlah:</label>
              <div className="flex items-center gap-2 border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted">
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-0 bg-transparent focus:outline-none"
                  min="1"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted">
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button variant="secondary" size="lg" className="flex-1 flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Keranjang
              </Button>
              <Button size="lg" className="flex-1">
                Beli Sekarang
              </Button>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Bagikan:</span>
              <button className="p-2 hover:bg-muted rounded-full">
                <Share2 size={18} />
              </button>
            </div>

            {/* Description */}
            <div className="bg-muted/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">Deskripsi</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            </div>

            {/* Seller info card */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <img src={product.seller.logo} alt={product.seller.name} className="w-16 h-16 rounded-md object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{product.seller.name}</h4>
                      {product.seller.verified && <div className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">✓ Terverifikasi</div>}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={14} className="fill-current" />
                        <span className="text-xs font-medium">{product.seller.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({product.seller.reviews} ulasan)</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Respon: {product.seller.responseTime}</div>
                  </div>
                </div>
                <Link to={`/partner/${product.seller.id}`}>
                  <Button variant="secondary" size="sm">
                    Kunjungi
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Specifications */}
            <div className="bg-muted/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold mb-3">Spesifikasi</h3>
              <div className="space-y-2">
                {product.specs?.map((spec, i) => (
                  <div key={i} className="flex justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

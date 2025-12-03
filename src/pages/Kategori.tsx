"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function KategoriPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [location, setLocation] = useState("all");

    const products = [
        {
            id: 1,
            title: "Wireless Earbuds IPX8",
            image: "/earbuds.png",
            description: "Organic cotton, waterproof",
            price: 89,
            category: "electronics",
            location: "jakarta"
        },
        {
            id: 2,
            title: "AirPods Max",
            image: "/airpods-max.png",
            description: "Premium audio device",
            price: 559,
            category: "electronics",
            location: "bandung"
        }
    ];

    const filtered = products.filter((p) => {
        return (
            (category === "all" || p.category === category) &&
            (location === "all" || p.location === location) &&
            (search === "" || p.title.toLowerCase().includes(search.toLowerCase()))
        );
    });

    return (
        <div className="container mx-auto px-6 py-12">

            {/* ============================
                SEARCH FILTER SECTION
            ============================= */}
            <h1 className="text-3xl font-bold mb-6">Search Products</h1>

            <div className="bg-white border shadow-md rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <input
                    placeholder="Search keyword..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border rounded-xl px-4 py-2"
                />

                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="border rounded-xl px-4 py-2"
                >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                </select>

                <select
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="border rounded-xl px-4 py-2"
                >
                    <option value="all">All Locations</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                </select>
            </div>

            {/* ============================
                PRODUCT LIST GRID
            ============================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {filtered.length === 0 && (
                    <p className="text-center col-span-full text-gray-500">
                        No products found.
                    </p>
                )}

                {filtered.map((p) => (
                    <div
                        key={p.id}
                        className="group relative bg-white rounded-3xl border p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                        <button className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow hover:scale-110 transition">
                            <Heart className="w-5 h-5 text-red-500" />
                        </button>

                        <div className="flex justify-center">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="w-40 h-40 object-contain group-hover:scale-105 transition duration-300"
                            />
                        </div>

                        <div className="mt-4 space-y-1">
                            <h3 className="font-semibold text-lg">{p.title}</h3>
                            <p className="text-muted-foreground text-sm">{p.description}</p>
                            <p className="font-bold text-xl">${p.price}</p>
                        </div>

                        <button className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-black/80 transition">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

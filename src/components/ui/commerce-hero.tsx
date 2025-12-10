"use client";

import { ArrowUpRight, Home, ShoppingBag, PackageSearch, Info, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { motion } from "framer-motion";
import { NavBar } from "./tubelight-navbar";
import { OfferCarousel, type Offer } from "./offer-carousel";
import { CircularTestimonials } from "./circular-testimonials";
import { DottedSurface } from "../dotted-surface";
import { FeaturesSectionWithHoverEffects } from "./feature-section-with-hover-effects";
import StatsSection from "./stats-section";
import CTASection from "./cta-section";
import { MarqueeDemo } from "./marquee-demo";
import InteractiveImageBentoGallery from "./bento-gallery";

const categories = [
    {
        title: "Furniture",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
        href: "#",
    },
    {
        title: "Electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
        href: "#",
    },
    {
        title: "Clothing",
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop",
        href: "#",
    },
    {
        title: "Books",
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop",
        href: "#",
    },
];

const navItems = [
    { name: "Home", url: "#", icon: Home },
    { name: "Shop", url: "#shop", icon: ShoppingBag },
    { name: "Categories", url: "#categories", icon: PackageSearch },
    { name: "About", url: "#about", icon: Info },
];

const featuredProducts: Offer[] = [
    {
        id: 1,
        imageSrc: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
        imageAlt: "Vintage wooden chair",
        tag: "Like New",
        title: "Vintage Oak Chair",
        description: "Mid-century modern design in excellent condition",
        brandLogoSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        brandName: "Sarah M.",
        promoCode: "50% OFF",
        href: "#",
    },
    {
        id: 2,
        imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
        imageAlt: "Wireless headphones",
        tag: "Electronics",
        title: "Premium Headphones",
        description: "Noise-cancelling wireless headphones with case",
        brandLogoSrc: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        brandName: "John D.",
        promoCode: "70% OFF",
        href: "#",
    },
    {
        id: 3,
        imageSrc: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
        imageAlt: "Designer handbag",
        tag: "Fashion",
        title: "Leather Handbag",
        description: "Genuine leather, barely used designer bag",
        brandLogoSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        brandName: "Emily R.",
        promoCode: "60% OFF",
        href: "#",
    },
    {
        id: 4,
        imageSrc: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop",
        imageAlt: "Collection of books",
        tag: "Books",
        title: "Classic Novel Set",
        description: "Complete collection of literary classics",
        brandLogoSrc: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
        brandName: "Michael T.",
        promoCode: "40% OFF",
        href: "#",
    },
    {
        id: 5,
        imageSrc: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop",
        imageAlt: "Running shoes",
        tag: "Sports",
        title: "Running Sneakers",
        description: "Barely worn premium running shoes",
        brandLogoSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        brandName: "Alex K.",
        promoCode: "55% OFF",
        href: "#",
    },
];

const newArrivalGalleryItems = [
    {
        id: "soho-lamp",
        title: "Soho Arc Lamp",
        desc: "Sculptural brass lighting for modern lofts.",
        url: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=900&auto=format&fit=crop",
        span: "md:col-span-2 md:row-span-2",
    },
    {
        id: "atelier-sofa",
        title: "Atelier Linen Sofa",
        desc: "Cloud-soft seating in oat beige.",
        url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop",
        span: "md:row-span-1",
    },
    {
        id: "ava-vase",
        title: "Ava Ceramic Vase",
        desc: "Hand-thrown statement vessel.",
        url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop",
        span: "md:row-span-1",
    },
    {
        id: "flux-chair",
        title: "Flux Dining Chair",
        desc: "Stackable walnut newcomer.",
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop",
        span: "md:row-span-2",
    },
    {
        id: "studio-clock",
        title: "Studio Wall Clock",
        desc: "Minimal matte-black finish.",
        url: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=900&auto=format&fit=crop",
        span: "md:row-span-1",
    },
    {
        id: "terrace-sideboard",
        title: "Terrace Sideboard",
        desc: "Reeded glass + oak combo.",
        url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&auto=format&fit=crop",
        span: "md:col-span-2 md:row-span-1",
    },
];

const customerTestimonials = [
    {
        quote: "I found an amazing vintage chair at 60% off! The seller was honest about its condition, and it's become my favorite piece of furniture. ReLoop makes sustainable shopping so easy!",
        name: "Sarah Johnson",
        designation: "Eco-Conscious Shopper",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop",
    },
    {
        quote: "Sold my old electronics in minutes and bought a barely-used laptop at half the price. The community here is genuine, and I love giving items a second life instead of contributing to waste.",
        name: "Michael Chen",
        designation: "Tech Enthusiast",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    },
    {
        quote: "As a student on a budget, ReLoop has been a lifesaver! I've furnished my entire apartment with quality pre-loved items. It's affordable, sustainable, and the sellers are trustworthy.",
        name: "Emma Rodriguez",
        designation: "University Student",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop",
    },
];

export function CommerceHero() {
    return (
        <div className="w-full relative">
            {/* Header with Logo and Login Button */}
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <header className="flex items-center justify-between pt-6 pb-4">
                    <Link to="/" className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        ReLoop_
                    </Link>
                    <Link to="/login">
                        <Button
                            variant="secondary"
                            className="cursor-pointer bg-primary-foreground p-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            <span className="pl-4 py-2 text-sm font-medium">Log In</span>
                            <div className="rounded-full flex items-center justify-center m-auto bg-background w-10 h-10 ml-2 group-hover:scale-110 transition-transform duration-300">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </Button>
                    </Link>
                </header>

                {/* Tubelight Navigation Bar */}
                <NavBar items={navItems} />
            </div>

            {/* Hero Section */}
            <div className="container px-4 md:px-6 mx-auto max-w-7xl mt-16 md:mt-20">
                <div className="bg-gradient-to-br from-accent/30 via-accent/20 to-primary/10 rounded-3xl relative overflow-hidden">
                    <DottedSurface />
                    <motion.section
                        className="w-full px-6 md:px-12 py-20 md:py-28 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="mx-auto text-center relative z-10">
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            >
                                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                                    Give items a second life
                                </span>
                                <br />
                                <span className="text-foreground">
                                    with sustainable shopping.
                                </span>
                            </motion.h1>
                            <motion.p
                                className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            >
                                Discover quality pre-loved items at great prices. Shop sustainable,
                                reduce waste, and find unique treasures in our curated collections.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                            >
                                <Button
                                    size="lg"
                                    className="cursor-pointer bg-primary text-primary-foreground p-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    <span className="pl-6 py-3 text-base font-medium">Browse Collections</span>
                                    <div className="rounded-full flex items-center justify-center m-auto bg-primary-foreground text-primary w-12 h-12 ml-3 group-hover:scale-110 transition-transform duration-300">
                                        <Search className="w-6 h-6" />
                                    </div>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.section>
                </div>
            </div>

            {/* Tech Stack Marquee */}
            <section className="container px-4 md:px-6 mx-auto max-w-7xl mt-16 md:mt-20">
                <div className="text-center space-y-3">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                        Trusted tools powering the ReLoop experience
                    </h3>
                    <p className="text-lg text-muted-foreground">
                        Built with modern technologies you can trust
                    </p>
                </div>
                <MarqueeDemo />
            </section>

            {/* Categories Section */}
            <div className="container px-4 md:px-6 mx-auto max-w-7xl mt-16 md:mt-20" id="categories">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Shop by Category
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground">
                        Explore our curated collections
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            className="group relative bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm rounded-3xl p-4 sm:p-6 min-h-[250px] sm:min-h-[300px] w-full overflow-hidden transition-all duration-500 hover:shadow-xl border border-border/50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                        >
                            <a href={category.href} className="absolute inset-0 z-20">
                                <h2 className="text-center text-xl sm:text-2xl md:text-2xl font-bold relative z-10 text-primary my-2 sm:my-4 group-hover:text-primary/90 transition-colors duration-300">
                                    {category.title}
                                </h2>
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full max-w-[min(40vw,200px)] sm:max-w-[min(30vw,180px)] md:max-w-[min(25vw,160px)] lg:max-w-[min(20vw,140px)] h-auto object-contain opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-background/95 backdrop-blur-sm rounded-tl-2xl flex items-center justify-center z-10 border-l border-t border-border/50">
                                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300 shadow-lg">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* New Arrivals Bento Gallery */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <InteractiveImageBentoGallery
                            imageItems={newArrivalGalleryItems}
                            title="New Arrival Spotlights"
                            description="Freshly verified drops from our sellers. Drag to explore the curation, tap to expand the details."
                        />
                    </motion.div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="bg-gradient-to-br from-muted/20 to-transparent py-20 md:py-28 mt-16 md:mt-24">
                <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                            Featured Items
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Handpicked treasures from our community
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <OfferCarousel offers={featuredProducts} />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <StatsSection />

            {/* Features Section */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-background to-accent/10">
                <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                            Why Choose ReLoop
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            The sustainable marketplace you can trust
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <FeaturesSectionWithHoverEffects />
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />

            {/* Testimonials Section */}
            <section className="py-20 md:py-28">
                <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                            What Our Community Says
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Real stories from real people shopping sustainably
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex justify-center"
                    >
                        <CircularTestimonials
                            testimonials={customerTestimonials}
                            autoplay={true}
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

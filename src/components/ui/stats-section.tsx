import { motion } from "framer-motion";

export default function StatsSection() {
    const stats = [
        {
            number: "50K+",
            label: "Active Users",
            description: "Growing community"
        },
        {
            number: "1M+",
            label: "Items Sold",
            description: "Successfully traded"
        },
        {
            number: "250T",
            label: "CO₂ Saved",
            description: "Carbon footprint reduced"
        },
        {
            number: "4.8/5",
            label: "User Rating",
            description: "Customer satisfaction"
        }
    ];

    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-accent/10 to-background">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 md:mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                        Our Impact on Sustainability
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Together, we're building a marketplace that makes a real difference for our planet and community
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            className="text-center space-y-2"
                        >
                            <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-bold">
                                {stat.number}
                            </div>
                            <p className="text-base md:text-lg font-semibold text-foreground">
                                {stat.label}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-16 text-center"
                >
                    <p className="text-muted-foreground">
                        Join thousands of conscious consumers making sustainable choices every day
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

import { cn } from "@/lib/utils";
import {
  Package,
  Recycle,
  DollarSign,
  Shield,
  Users,
  Headphones,
  CheckCircle,
  Heart,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Quality Guaranteed",
      description:
        "Every item is carefully inspected to ensure you get the best pre-loved products.",
      icon: <CheckCircle />,
    },
    {
      title: "Sustainable Shopping",
      description:
        "Reduce waste and carbon footprint by giving items a second life.",
      icon: <Recycle />,
    },
    {
      title: "Best Prices",
      description:
        "Save up to 70% compared to new items. Great quality at unbeatable prices.",
      icon: <DollarSign />,
    },
    {
      title: "Secure Transactions",
      description: "Your purchases are protected with buyer guarantee and secure payments.",
      icon: <Shield />,
    },
    {
      title: "Community Driven",
      description: "Join thousands of buyers and sellers in our sustainable marketplace.",
      icon: <Users />,
    },
    {
      title: "24/7 Support",
      description:
        "Our customer support team is always ready to help you with any questions.",
      icon: <Headphones />,
    },
    {
      title: "Easy Selling",
      description:
        "List your items in minutes and reach thousands of potential buyers.",
      icon: <Package />,
    },
    {
      title: "Made with Love",
      description: "We care about sustainability and building a better future together.",
      icon: <Heart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-border/50",
        (index === 0 || index === 4) && "lg:border-l border-border/50",
        index < 4 && "lg:border-b border-border/50"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-accent/20 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-accent/20 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-muted-foreground">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-muted group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

import { Star, MapPin } from "lucide-react";
import type { Restaurant } from "@/context/RestaurantContext";

interface Props {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard = ({ restaurant, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-xl p-5 card-elevated transition-all hover:border-primary/30 group"
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{restaurant.image}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold font-heading text-foreground text-lg group-hover:text-primary transition-colors truncate">
            {restaurant.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-accent font-semibold">
              <Star className="w-4 h-4 fill-accent text-accent" />
              {restaurant.rating}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              {restaurant.distance} km
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs capitalize">
              {restaurant.occasion.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default RestaurantCard;

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface MenuItem {
  name: string;
  price: number;
  category: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  distance: number; // in km
  rating: number;
  occasion: string; // "casual" | "fine-dining" | "cafe" | "date-night" | "family"
  image: string;
  description: string;
  menu: MenuItem[];
  reviews: Review[];
}

interface RestaurantContextType {
  restaurants: Restaurant[];
  addRestaurant: (r: Omit<Restaurant, "id" | "reviews">) => void;
  editRestaurant: (id: string, r: Partial<Restaurant>) => void;
  removeRestaurant: (id: string) => void;
  addReview: (restaurantId: string, review: Omit<Review, "id" | "date">) => void;
}

const defaultRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Golden Spoon",
    cuisine: "Italian",
    distance: 1.2,
    rating: 4.5,
    occasion: "date-night",
    image: "🍝",
    description: "Authentic Italian cuisine with a romantic ambiance. Perfect for date nights and special celebrations.",
    menu: [
      { name: "Margherita Pizza", price: 12.99, category: "Main" },
      { name: "Pasta Carbonara", price: 14.99, category: "Main" },
      { name: "Tiramisu", price: 7.99, category: "Dessert" },
      { name: "Bruschetta", price: 8.99, category: "Starter" },
    ],
    reviews: [
      { id: "r1", author: "Alice", rating: 5, comment: "Amazing pasta! Will come back.", date: "2024-03-15" },
    ],
  },
  {
    id: "2",
    name: "Sakura Garden",
    cuisine: "Japanese",
    distance: 2.5,
    rating: 4.8,
    occasion: "fine-dining",
    image: "🍣",
    description: "Premium Japanese dining experience with fresh sushi and traditional dishes.",
    menu: [
      { name: "Sushi Platter", price: 22.99, category: "Main" },
      { name: "Ramen Bowl", price: 13.99, category: "Main" },
      { name: "Mochi Ice Cream", price: 6.99, category: "Dessert" },
      { name: "Edamame", price: 5.99, category: "Starter" },
    ],
    reviews: [
      { id: "r2", author: "Bob", rating: 5, comment: "Best sushi in town!", date: "2024-03-10" },
    ],
  },
  {
    id: "3",
    name: "Burger Barn",
    cuisine: "American",
    distance: 0.8,
    rating: 4.2,
    occasion: "casual",
    image: "🍔",
    description: "Classic American burgers and fries. Great for a quick, hearty meal with friends.",
    menu: [
      { name: "Classic Burger", price: 10.99, category: "Main" },
      { name: "Cheese Fries", price: 6.99, category: "Side" },
      { name: "Milkshake", price: 5.99, category: "Drink" },
      { name: "Onion Rings", price: 4.99, category: "Starter" },
    ],
    reviews: [
      { id: "r3", author: "Charlie", rating: 4, comment: "Solid burgers, great value!", date: "2024-02-28" },
    ],
  },
  {
    id: "4",
    name: "Café Mocha",
    cuisine: "Café",
    distance: 0.5,
    rating: 4.0,
    occasion: "cafe",
    image: "☕",
    description: "Cozy café with artisan coffee, pastries, and light bites. Perfect study spot.",
    menu: [
      { name: "Cappuccino", price: 4.99, category: "Drink" },
      { name: "Avocado Toast", price: 8.99, category: "Main" },
      { name: "Croissant", price: 3.99, category: "Pastry" },
      { name: "Matcha Latte", price: 5.49, category: "Drink" },
    ],
    reviews: [
      { id: "r4", author: "Diana", rating: 4, comment: "Love the vibe and coffee!", date: "2024-03-01" },
    ],
  },
  {
    id: "5",
    name: "Spice Route",
    cuisine: "Indian",
    distance: 3.0,
    rating: 4.6,
    occasion: "family",
    image: "🍛",
    description: "Rich, flavorful Indian cuisine with generous portions. A family favorite.",
    menu: [
      { name: "Butter Chicken", price: 15.99, category: "Main" },
      { name: "Garlic Naan", price: 3.99, category: "Side" },
      { name: "Mango Lassi", price: 4.99, category: "Drink" },
      { name: "Samosa", price: 5.99, category: "Starter" },
    ],
    reviews: [
      { id: "r5", author: "Eve", rating: 5, comment: "Authentic flavors, generous portions!", date: "2024-03-05" },
    ],
  },
];

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const useRestaurants = () => {
  const ctx = useContext(RestaurantContext);
  if (!ctx) throw new Error("useRestaurants must be used within RestaurantProvider");
  return ctx;
};

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(defaultRestaurants);

  const addRestaurant = (r: Omit<Restaurant, "id" | "reviews">) => {
    setRestaurants((prev) => [
      ...prev,
      { ...r, id: Date.now().toString(), reviews: [] },
    ]);
  };

  const editRestaurant = (id: string, updates: Partial<Restaurant>) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const removeRestaurant = (id: string) => {
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  const addReview = (restaurantId: string, review: Omit<Review, "id" | "date">) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurantId
          ? {
              ...r,
              reviews: [
                ...r.reviews,
                { ...review, id: Date.now().toString(), date: new Date().toISOString().split("T")[0] },
              ],
              rating: Math.round(((r.rating * r.reviews.length + review.rating) / (r.reviews.length + 1)) * 10) / 10,
            }
          : r
      )
    );
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, addRestaurant, editRestaurant, removeRestaurant, addReview }}>
      {children}
    </RestaurantContext.Provider>
  );
};

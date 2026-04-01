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
  distance: number;
  rating: number;
  occasion: string;
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
    name: "Garden Limra",
    cuisine: "Fast Food",
    distance: 1,
    rating: 4.0,
    occasion: "casual",
    image: "🍔",
    description: "Popular fast food spot near campus with quick bites and refreshing drinks.",
    menu: [
      { name: "Chicken Burger", price: 120, category: "Main" },
      { name: "French Fries", price: 80, category: "Side" },
      { name: "Cold Coffee", price: 60, category: "Drink" },
      { name: "Shawarma", price: 100, category: "Main" },
    ],
    reviews: [
      { id: "r1", author: "Rahul", rating: 4, comment: "Great shawarma and quick service!", date: "2024-03-15" },
    ],
  },
  {
    id: "2",
    name: "Salt and Pepper",
    cuisine: "Kerala Cuisine",
    distance: 2,
    rating: 4.2,
    occasion: "casual",
    image: "🥘",
    description: "Authentic Kerala cuisine with rich flavors. Perfect for a hearty family meal or casual outing.",
    menu: [
      { name: "Kerala Fish Curry", price: 180, category: "Main" },
      { name: "Appam & Stew", price: 120, category: "Main" },
      { name: "Parotta & Chicken", price: 150, category: "Main" },
      { name: "Payasam", price: 60, category: "Dessert" },
    ],
    reviews: [
      { id: "r2", author: "Ananya", rating: 4, comment: "Tastes just like home-cooked Kerala food!", date: "2024-03-10" },
    ],
  },
  {
    id: "3",
    name: "Zaitoon",
    cuisine: "Arabian & BBQ",
    distance: 1.2,
    rating: 4.9,
    occasion: "family",
    image: "🥩",
    description: "Premium Arabian and BBQ dining with smoky grills and flavorful kebabs. Great for family and date nights.",
    menu: [
      { name: "Chicken Shawarma Plate", price: 200, category: "Main" },
      { name: "BBQ Platter", price: 450, category: "Main" },
      { name: "Hummus & Pita", price: 120, category: "Starter" },
      { name: "Kunafa", price: 150, category: "Dessert" },
    ],
    reviews: [
      { id: "r3", author: "Vikram", rating: 5, comment: "Best BBQ in Vellore, hands down!", date: "2024-02-28" },
    ],
  },
  {
    id: "4",
    name: "Mudcups Cafe",
    cuisine: "Café",
    distance: 1.8,
    rating: 3.5,
    occasion: "cafe",
    image: "☕",
    description: "Cozy café with artisan coffee, shakes, and light snacks. A chill hangout spot.",
    menu: [
      { name: "Cappuccino", price: 90, category: "Drink" },
      { name: "Cold Brew", price: 110, category: "Drink" },
      { name: "Sandwich", price: 100, category: "Main" },
      { name: "Brownie", price: 80, category: "Dessert" },
    ],
    reviews: [
      { id: "r4", author: "Priya", rating: 3, comment: "Nice ambiance, coffee is decent.", date: "2024-03-01" },
    ],
  },
  {
    id: "5",
    name: "Katpadi Kitchen",
    cuisine: "Chinese & North Indian",
    distance: 1,
    rating: 2.8,
    occasion: "family",
    image: "🍜",
    description: "Budget-friendly Chinese and North Indian food. A go-to for students wanting variety.",
    menu: [
      { name: "Veg Fried Rice", price: 100, category: "Main" },
      { name: "Chilli Chicken", price: 140, category: "Main" },
      { name: "Butter Naan", price: 30, category: "Side" },
      { name: "Paneer Butter Masala", price: 130, category: "Main" },
    ],
    reviews: [
      { id: "r5", author: "Karthik", rating: 3, comment: "Affordable and filling, but could improve taste.", date: "2024-03-05" },
    ],
  },
  {
    id: "6",
    name: "KFC",
    cuisine: "Fast Food",
    distance: 1.2,
    rating: 4.0,
    occasion: "casual",
    image: "🍗",
    description: "The classic KFC experience with crispy fried chicken, burgers, and more.",
    menu: [
      { name: "Chicken Bucket", price: 599, category: "Main" },
      { name: "Zinger Burger", price: 199, category: "Main" },
      { name: "Popcorn Chicken", price: 149, category: "Starter" },
      { name: "Pepsi", price: 60, category: "Drink" },
    ],
    reviews: [
      { id: "r6", author: "Sneha", rating: 4, comment: "Classic KFC, never disappoints!", date: "2024-03-12" },
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, PartyPopper, Search, Utensils } from "lucide-react";
import { useRestaurants } from "@/context/RestaurantContext";
import RestaurantCard from "@/components/RestaurantCard";

type OccasionFilter = "" | "casual" | "fine-dining" | "cafe" | "date-night" | "family";

const StudentPage = () => {
  const navigate = useNavigate();
  const { restaurants } = useRestaurants();
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<number>(10);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [occasionFilter, setOccasionFilter] = useState<OccasionFilter>("");

  const filtered = restaurants.filter((r) => {
    if (r.distance > distanceFilter) return false;
    if (r.rating < ratingFilter) return false;
    if (occasionFilter && r.occasion !== occasionFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = r.name.toLowerCase().includes(q);
      const matchesCuisine = r.cuisine.toLowerCase().includes(q);
      const matchesOccasion = r.occasion.replace("-", " ").toLowerCase().includes(q);
      if (!matchesName && !matchesCuisine && !matchesOccasion) return false;
    }
    return true;
  });

  const occasions: { value: OccasionFilter; label: string }[] = [
    { value: "", label: "All" },
    { value: "casual", label: "Casual" },
    { value: "fine-dining", label: "Fine Dining" },
    { value: "cafe", label: "Café" },
    { value: "date-night", label: "Date Night" },
    { value: "family", label: "Family" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold font-heading text-foreground">🎓 Student / Faculty Portal</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {!showRestaurants && (
          <div className="animate-fade-in flex flex-col items-center justify-center gap-8 py-0" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div
              className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
              style={{ backgroundImage: 'url(/images/food-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 flex flex-col items-center gap-5 py-16 px-8">
                <Utensils className="w-12 h-12 text-primary drop-shadow-lg" />
                <h2 className="text-3xl font-bold font-heading text-white text-center drop-shadow-lg">Discover Restaurants</h2>
                <p className="text-white/80 text-center text-sm max-w-xs">Find the best food spots near VIT campus — from fast food to fine dining.</p>
                <button
                  onClick={() => setShowRestaurants(true)}
                  className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg transition-all text-lg"
                >
                  Load Restaurants
                </button>
              </div>
            </div>
          </div>
        )}

        {showRestaurants && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-heading text-foreground">
                {showFilters ? "Filtered Results" : "All Restaurants"}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`text-sm px-4 py-2 rounded-lg border transition-all font-medium ${
                    showFilters
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary/40"
                  }`}
                >
                  <Search className="w-4 h-4 inline mr-1" />
                  Filters
                </button>
                <button
                  onClick={() => { setShowRestaurants(false); setShowFilters(false); }}
                  className="text-sm px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:border-destructive/40 transition-all font-medium"
                >
                  Back
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="bg-card border border-border rounded-xl p-6 mb-6 animate-scale-in">
                <h3 className="font-semibold font-heading text-foreground mb-4">Filter Restaurants</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <MapPin className="w-4 h-4 text-primary" /> Distance (≤ {distanceFilter} km)
                    </label>
                    <input
                      type="range"
                      min={0.5}
                      max={10}
                      step={0.5}
                      value={distanceFilter}
                      onChange={(e) => setDistanceFilter(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Star className="w-4 h-4 text-accent" /> Rating (≥ {ratingFilter})
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={0.5}
                      value={ratingFilter}
                      onChange={(e) => setRatingFilter(Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <PartyPopper className="w-4 h-4 text-primary" /> Occasion
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {occasions.map((o) => (
                        <button
                          key={o.value}
                          onClick={() => setOccasionFilter(o.value)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                            occasionFilter === o.value
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-foreground border-border hover:border-primary/40"
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <span className="text-4xl block mb-3">😕</span>
                <p>No restaurants match your filters. Try adjusting them!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((r, i) => (
                  <div key={r.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                    <RestaurantCard restaurant={r} onClick={() => navigate(`/student/restaurant/${r.id}`)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentPage;

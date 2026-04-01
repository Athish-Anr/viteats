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
          <div className="animate-fade-in flex flex-col items-center gap-6 py-12">
            <h2 className="text-2xl font-bold font-heading text-foreground text-center">What would you like to do?</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button
                onClick={() => setShowRestaurants(true)}
                className="flex-1 bg-card border border-border rounded-xl p-6 card-elevated text-center hover:border-primary/40 transition-all"
              >
                <Utensils className="w-8 h-8 text-primary mx-auto mb-3" />
                <span className="font-semibold font-heading text-foreground">Load Restaurants</span>
              </button>
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

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Send } from "lucide-react";
import { useRestaurants } from "@/context/RestaurantContext";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants, addReview } = useRestaurants();
  const restaurant = restaurants.find((r) => r.id === id);

  const [tab, setTab] = useState<"menu" | "reviews">("menu");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="text-muted-foreground mb-4">Restaurant not found</p>
          <button onClick={() => navigate("/student?view=restaurants")} className="text-primary font-medium hover:underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitReview = () => {
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    addReview(restaurant.id, { author: reviewAuthor, rating: reviewRating, comment: reviewComment });
    setReviewAuthor("");
    setReviewComment("");
    setReviewRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const menuByCategory = restaurant.menu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof restaurant.menu>);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate("/student?view=restaurants")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold font-heading text-foreground truncate">{restaurant.name}</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <span className="text-6xl">{restaurant.image}</span>
            <div>
              <h2 className="text-2xl font-extrabold font-heading text-foreground">{restaurant.name}</h2>
              <p className="text-muted-foreground mt-1">{restaurant.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1 text-accent font-semibold">
                  <Star className="w-4 h-4 fill-accent text-accent" /> {restaurant.rating}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {restaurant.distance} km
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs capitalize">
                  {restaurant.occasion.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["menu", "reviews"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all capitalize ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:border-primary/40"
              }`}
            >
              {t === "menu" ? "🍽️ Menu" : `⭐ Reviews (${restaurant.reviews.length})`}
            </button>
          ))}
        </div>

        {tab === "menu" && (
          <div className="space-y-6 animate-fade-in">
            {Object.entries(menuByCategory).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{category}</h3>
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-card border border-border rounded-lg px-4 py-3">
                      <span className="text-foreground font-medium">{item.name}</span>
                      <span className="text-primary font-semibold">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-6 animate-fade-in">
            {/* Submit review */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold font-heading text-foreground mb-4">Leave a Review</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
                <textarea
                  placeholder="Write your review..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} onClick={() => setReviewRating(s)} className="transition-transform hover:scale-125">
                        <Star
                          className={`w-6 h-6 ${s <= reviewRating ? "fill-accent text-accent" : "text-border"}`}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleSubmitReview}
                    disabled={!reviewAuthor.trim() || !reviewComment.trim()}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg hero-gradient text-primary-foreground font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" /> Submit
                  </button>
                </div>
                {submitted && (
                  <p className="text-sm text-success font-medium animate-fade-in">✓ Review submitted!</p>
                )}
              </div>
            </div>

            {/* Existing reviews */}
            {restaurant.reviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first!</p>
            ) : (
              <div className="space-y-3">
                {restaurant.reviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{review.author}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-accent text-accent" : "text-border"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
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

export default RestaurantDetail;

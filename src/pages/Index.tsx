import { useNavigate } from "react-router-dom";

import { GraduationCap, ShieldCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative"
      style={{
        backgroundImage: "url('/images/vit-bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 animate-fade-in text-center mb-12">
        <span className="text-6xl mb-4 block">🍽️</span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-white mb-3">
          VIT<span className="text-primary">Eats</span>
        </h1>
        <p className="text-white/80 text-lg max-w-md mx-auto">
          Discover, review, and manage the best restaurants around campus
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-6 w-full max-w-lg animate-slide-up">
        <button
          onClick={() => navigate("/student")}
          className="flex-1 group bg-card/90 backdrop-blur-sm rounded-2xl p-8 card-elevated border border-border cursor-pointer text-center transition-all hover:border-primary/40"
        >
          <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold font-heading text-foreground mb-2">Student / Faculty</h2>
          <p className="text-sm text-muted-foreground">
            Browse restaurants, filter, and leave reviews
          </p>
        </button>

        <button
          onClick={() => navigate("/admin")}
          className="flex-1 group bg-card/90 backdrop-blur-sm rounded-2xl p-8 card-elevated border border-border cursor-pointer text-center transition-all hover:border-accent/60"
        >
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-xl font-bold font-heading text-foreground mb-2">Admin</h2>
          <p className="text-sm text-muted-foreground">
            Add, edit, or remove restaurants
          </p>
        </button>
      </div>
    </div>
  );
};

export default Index;

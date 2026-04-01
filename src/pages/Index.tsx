import { useNavigate } from "react-router-dom";
import { GraduationCap, ShieldCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="animate-fade-in text-center mb-12">
        <span className="text-6xl mb-4 block">🍽️</span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-3">
          Campus <span className="text-primary">Bites</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Discover, review, and manage the best restaurants around campus
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg animate-slide-up">
        <button
          onClick={() => navigate("/student")}
          className="flex-1 group bg-card rounded-2xl p-8 card-elevated border border-border cursor-pointer text-center transition-all hover:border-primary/40"
        >
          <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold font-heading text-foreground mb-2">Student</h2>
          <p className="text-sm text-muted-foreground">
            Browse restaurants, filter, and leave reviews
          </p>
        </button>

        <button
          onClick={() => navigate("/admin")}
          className="flex-1 group bg-card rounded-2xl p-8 card-elevated border border-border cursor-pointer text-center transition-all hover:border-accent/60"
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

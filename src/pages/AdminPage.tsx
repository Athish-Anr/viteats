import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { useRestaurants, type Restaurant, type MenuItem } from "@/context/RestaurantContext";

const AdminPage = () => {
  const navigate = useNavigate();
  const { restaurants, addRestaurant, editRestaurant, removeRestaurant } = useRestaurants();

  const [mode, setMode] = useState<"menu" | "add" | "edit" | "remove">("menu");
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formCuisine, setFormCuisine] = useState("");
  const [formDistance, setFormDistance] = useState("1");
  const [formOccasion, setFormOccasion] = useState("casual");
  const [formImage, setFormImage] = useState("🍽️");
  const [formDescription, setFormDescription] = useState("");
  const [formMenu, setFormMenu] = useState<MenuItem[]>([{ name: "", price: 0, category: "Main" }]);

  const occasions = ["casual", "fine-dining", "cafe", "date-night", "family"];
  const emojis = ["🍽️", "🍕", "🍜", "🥗", "🌮", "🍰", "🥩", "🍣", "☕", "🍛", "🍔", "🥘"];

  const resetForm = () => {
    setFormName("");
    setFormCuisine("");
    setFormDistance("1");
    setFormOccasion("casual");
    setFormImage("🍽️");
    setFormDescription("");
    setFormMenu([{ name: "", price: 0, category: "Main" }]);
    setEditId(null);
  };

  const loadForEdit = (r: Restaurant) => {
    setFormName(r.name);
    setFormCuisine(r.cuisine);
    setFormDistance(String(r.distance));
    setFormOccasion(r.occasion);
    setFormImage(r.image);
    setFormDescription(r.description);
    setFormMenu(r.menu.length > 0 ? [...r.menu] : [{ name: "", price: 0, category: "Main" }]);
    setEditId(r.id);
    setMode("edit");
  };

  const handleSave = () => {
    if (!formName.trim() || !formCuisine.trim()) return;
    const validMenu = formMenu.filter((m) => m.name.trim());
    const data = {
      name: formName,
      cuisine: formCuisine,
      distance: Number(formDistance),
      rating: 0,
      occasion: formOccasion,
      image: formImage,
      description: formDescription,
      menu: validMenu,
    };

    if (mode === "add") {
      addRestaurant(data);
    } else if (mode === "edit" && editId) {
      editRestaurant(editId, data);
    }
    resetForm();
    setMode("menu");
  };

  const handleRemove = (id: string) => {
    removeRestaurant(id);
    setConfirmRemoveId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => { if (mode === "menu") navigate("/"); else { setMode("menu"); resetForm(); } }} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold font-heading text-foreground">🛡️ Admin Panel</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {mode === "menu" && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold font-heading text-foreground text-center mb-8">Manage Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-10">
              <button
                onClick={() => { resetForm(); setMode("add"); }}
                className="bg-card border border-border rounded-xl p-6 card-elevated text-center hover:border-primary/40 transition-all"
              >
                <Plus className="w-8 h-8 text-primary mx-auto mb-3" />
                <span className="font-semibold font-heading text-foreground text-sm">Add Restaurant</span>
              </button>
              <button
                onClick={() => setMode("edit")}
                className="bg-card border border-border rounded-xl p-6 card-elevated text-center hover:border-accent/60 transition-all"
              >
                <Pencil className="w-8 h-8 text-accent mx-auto mb-3" />
                <span className="font-semibold font-heading text-foreground text-sm">Edit Restaurant</span>
              </button>
              <button
                onClick={() => setMode("remove")}
                className="bg-card border border-border rounded-xl p-6 card-elevated text-center hover:border-destructive/60 transition-all"
              >
                <Trash2 className="w-8 h-8 text-destructive mx-auto mb-3" />
                <span className="font-semibold font-heading text-foreground text-sm">Remove Restaurant</span>
              </button>
            </div>
          </div>
        )}

        {/* Add / Edit Form */}
        {(mode === "add" || (mode === "edit" && editId)) && (
          <div className="animate-slide-up max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-6">
              {mode === "add" ? "Add New Restaurant" : "Edit Restaurant"}
            </h2>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Name *</label>
                  <input value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" placeholder="Restaurant name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Cuisine *</label>
                  <input value={formCuisine} onChange={(e) => setFormCuisine(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" placeholder="e.g. Italian" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none" placeholder="Brief description" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Distance (km)</label>
                  <input type="number" min="0.1" step="0.1" value={formDistance} onChange={(e) => setFormDistance(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Occasion</label>
                  <select value={formOccasion} onChange={(e) => setFormOccasion(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                    {occasions.map((o) => (
                      <option key={o} value={o}>{o.replace("-", " ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Icon</label>
                  <div className="flex flex-wrap gap-1">
                    {emojis.map((e) => (
                      <button key={e} onClick={() => setFormImage(e)} className={`text-xl w-8 h-8 rounded flex items-center justify-center transition-all ${formImage === e ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-muted"}`}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Menu Items</label>
                <div className="space-y-2">
                  {formMenu.map((item, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input value={item.name} onChange={(e) => { const m = [...formMenu]; m[i].name = e.target.value; setFormMenu(m); }} className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Item name" />
                      <input type="number" min="0" step="0.01" value={item.price} onChange={(e) => { const m = [...formMenu]; m[i].price = Number(e.target.value); setFormMenu(m); }} className="w-20 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Price" />
                      <input value={item.category} onChange={(e) => { const m = [...formMenu]; m[i].category = e.target.value; setFormMenu(m); }} className="w-24 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Category" />
                      <button onClick={() => setFormMenu(formMenu.filter((_, j) => j !== i))} className="text-destructive hover:text-destructive/80">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => setFormMenu([...formMenu, { name: "", price: 0, category: "Main" }])} className="text-sm text-primary font-medium mt-2 hover:underline">
                  + Add menu item
                </button>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={!formName.trim() || !formCuisine.trim()} className="flex items-center gap-2 px-6 py-2.5 rounded-lg hero-gradient text-primary-foreground font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" /> {mode === "add" ? "Add Restaurant" : "Save Changes"}
                </button>
                <button onClick={() => { setMode("menu"); resetForm(); }} className="px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit picker */}
        {mode === "edit" && !editId && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Select a Restaurant to Edit</h2>
            {restaurants.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No restaurants to edit.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {restaurants.map((r) => (
                  <button key={r.id} onClick={() => loadForEdit(r)} className="bg-card border border-border rounded-xl p-4 text-left card-elevated hover:border-accent/40 transition-all">
                    <span className="text-2xl mr-3">{r.image}</span>
                    <span className="font-semibold text-foreground">{r.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">({r.cuisine})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Remove */}
        {mode === "remove" && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Remove a Restaurant</h2>
            {restaurants.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No restaurants to remove.</p>
            ) : (
              <div className="space-y-3 max-w-xl mx-auto">
                {restaurants.map((r) => (
                  <div key={r.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{r.image}</span>
                      <div>
                        <span className="font-semibold text-foreground">{r.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">({r.cuisine})</span>
                      </div>
                    </div>
                    {confirmRemoveId === r.id ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleRemove(r.id)} className="px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90">
                          Confirm
                        </button>
                        <button onClick={() => setConfirmRemoveId(null)} className="px-3 py-1.5 rounded-lg border border-border text-foreground text-sm hover:bg-muted">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmRemoveId(r.id)} className="text-destructive hover:text-destructive/80 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
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

export default AdminPage;

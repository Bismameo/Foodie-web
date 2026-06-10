"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [category, setCategory] = useState("delivery");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from our internal API
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 14));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="landing-page">
      {/* Category Selection Sub-Nav */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid var(--glass-border)", position: "sticky", top: "80px", zIndex: 900, backdropFilter: "blur(10px)" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "2rem", padding: "1rem 0" }}>
            <button 
              onClick={() => setCategory("delivery")}
              style={{ background: "none", border: "none", color: category === "delivery" ? "var(--primary)" : "var(--text-muted)", fontWeight: "800", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", gap: "10px", padding: "0.5rem 1rem", borderRadius: "100px", background: category === "delivery" ? "rgba(var(--primary-rgb), 0.1)" : "transparent", transition: "all 0.3s" }}
            >
              🛵 Delivery
            </button>
            <button 
              onClick={() => setCategory("pickup")}
              style={{ background: "none", border: "none", color: category === "pickup" ? "var(--primary)" : "var(--text-muted)", fontWeight: "800", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", gap: "10px", padding: "0.5rem 1rem", borderRadius: "100px", background: category === "pickup" ? "rgba(var(--primary-rgb), 0.1)" : "transparent", transition: "all 0.3s" }}
            >
              🛍️ Pick-up
            </button>
            <button 
              onClick={() => setCategory("shops")}
              style={{ background: "none", border: "none", color: category === "shops" ? "var(--primary)" : "var(--text-muted)", fontWeight: "800", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", gap: "10px", padding: "0.5rem 1rem", borderRadius: "100px", background: category === "shops" ? "rgba(var(--primary-rgb), 0.1)" : "transparent", transition: "all 0.3s" }}
            >
              🏪 Shops
            </button>
          </div>
        </div>
      </div>

      {category === "delivery" && (
        <>
          {/* Hero Section */}
          <section className="hero-video-container" style={{ position: "relative", overflow: "hidden" }}>
            <img src="/assets/burger.jpg" alt="Delicious Food Background" className="hero-video" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", zIndex: 1 }} />
            <div className="hero-overlay" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></div>
            
            <div className="container" style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", alignItems: "center" }}>
              <div className="hero-content reveal" style={{ maxWidth: "800px" }}>
                <div className="hero-badge" style={{ padding: "0.8rem 1.5rem", borderRadius: "100px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "2rem", color: "var(--primary)" }}>
                  <span style={{ fontSize: "1.2rem" }}>🚀</span> Fast & Fresh Delivery
                </div>
                <h1 style={{ fontWeight: "800", lineHeight: "1.0", marginBottom: "2rem" }}>
                  The food you love, <br />
                  <span style={{ color: "var(--primary)" }}>delivered fast.</span>
                </h1>
                <p style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.7)", marginBottom: "3.5rem", maxWidth: "600px", fontWeight: "500" }}>
                  Your favorite meal from the best restaurants delivered to your doorstep in minutes. Fresh, hot, and reliable.
                </p>
                
                <div className="location-search-container" style={{ display: "flex", gap: "10px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", padding: "10px", borderRadius: "100px" }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: "1.5rem" }}>
                    <span style={{ fontSize: "1.5rem", marginRight: "12px" }}>📍</span>
                    <input type="text" placeholder="Enter your delivery location..." style={{ background: "transparent", border: "none", color: "white", width: "100%", outline: "none", fontSize: "1.1rem", fontWeight: "500" }} />
                  </div>
                  <button className="btn nav-cta" style={{ borderRadius: "100px !important", padding: "1rem 2.5rem !important" }}>Find Food</button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Dishes */}
          <section id="dishes" className="section-padding" style={{ padding: "10rem 0" }}>
            <div className="container">
              <div className="section-title reveal" style={{ marginBottom: "6rem" }}>
                <h2 style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "1.5rem", letterSpacing: "-1.5px" }}>Featured Specialties</h2>
                <div style={{ width: "100px", height: "5px", background: "var(--primary)", borderRadius: "10px" }}></div>
                <p style={{ marginTop: "2rem", color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "500px" }}>
                  Hand-picked dishes that define the foodie experience.
                </p>
              </div>

              <div className="product-grid">
                {products.length > 0 ? (
                  products.map((dish, index) => (
                    <div key={dish._id} className="food-card reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div style={{ position: "relative", height: "280px", overflow: "hidden", borderRadius: "40px 40px 0 0" }}>
                        <img src={dish.image} alt={dish.title} className="food-card-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                        <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", color: "var(--primary)", padding: "0.6rem 1.2rem", borderRadius: "100px", fontSize: "0.85rem", fontWeight: "800", border: "1px solid rgba(255,255,255,0.1)" }}>
                          ★ 4.9 Popular
                        </div>
                      </div>
                      <div className="food-card-body" style={{ padding: "2.5rem" }}>
                        <h3 style={{ fontSize: "1.6rem", fontWeight: "800", marginBottom: "1rem" }}>{dish.title}</h3>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem", lineHeight: "1.5" }}>
                          Experience the authentic taste of premium ingredients crafted by experts.
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="food-price" style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff" }}>
                            <span style={{ color: "var(--primary)", fontSize: "1.2rem", marginRight: "4px" }}>$</span>
                            {dish.price.toFixed(2)}
                          </span>
                          <Link href={`/product/${dish._id}`} className="btn nav-cta">Order Now</Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "6rem", background: "var(--bg-card)", borderRadius: "40px", border: "1px dashed var(--glass-border)" }}>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.5rem", marginBottom: "2rem" }}>Discovering flavors...</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {category === "pickup" && (
        <section className="section-padding" style={{ padding: "8rem 0" }}>
          <div className="container">
            <div className="reveal" style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-main) 100%)", padding: "6rem", borderRadius: "50px", border: "1px solid var(--glass-border)", marginBottom: "6rem", textAlign: "center" }}>
              <h1 style={{ fontSize: "4rem", fontWeight: "800", marginBottom: "1.5rem" }}>Fastest <span style={{ color: "var(--primary)" }}>Pick-up</span></h1>
              <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>Order ahead and skip the line at your favorite local restaurants.</p>
            </div>

            <div className="product-grid">
              {/* Static Pick-up Items for Demo */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="food-card reveal" style={{ padding: "1.5rem" }}>
                  <div style={{ position: "relative", height: "200px", borderRadius: "30px", overflow: "hidden", marginBottom: "1.5rem" }}>
                    <img src={`/assets/burger.jpg`} alt="Food" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "var(--primary)", color: "#000", padding: "0.5rem 1rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: "800" }}>
                      15 min
                    </div>
                  </div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "0.5rem" }}>Restaurant {item}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>0.5 km away • ⭐ 4.5</p>
                  <button className="btn nav-cta" style={{ width: "100%" }}>Order for Pick-up</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {category === "shops" && (
        <section className="section-padding" style={{ padding: "8rem 0" }}>
          <div className="container">
            <div className="reveal" style={{ background: "var(--bg-card)", padding: "6rem", borderRadius: "50px", border: "1px solid var(--glass-border)", marginBottom: "6rem", textAlign: "center" }}>
              <h1 style={{ fontSize: "4rem", fontWeight: "800", marginBottom: "1.5rem" }}>Local <span style={{ color: "var(--primary)" }}>Shops</span></h1>
              <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>Everything you need from your favorite neighborhood stores.</p>
            </div>

            <div className="product-grid">
              {/* Static Shop Items for Demo */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="food-card reveal" style={{ padding: "1.5rem" }}>
                  <div style={{ position: "relative", height: "200px", borderRadius: "30px", overflow: "hidden", marginBottom: "1.5rem" }}>
                    <img src={`/assets/karahi.jpg`} alt="Shop" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "0.5rem" }}>Gourmet Shop {item}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Specialty Ingredients • Premium Quality</p>
                  <button className="btn nav-cta" style={{ width: "100%" }}>Shop Now</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="section-padding reveal" style={{ padding: "5rem 0 10rem" }}>
        <div className="container">
          <div className="section-title" style={{ textAlign: "center", marginBottom: "6rem" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: "800" }}>How it Works</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Simple, fast, and reliable delivery.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem" }}>
            {[
              { icon: "📱", title: "1. Select Food", desc: "Browse 1000+ restaurants and pick your favorite dishes." },
              { icon: "💳", title: "2. Confirm Order", desc: "Securely pay via Card, Wallet, or Cash on Delivery." },
              { icon: "👨‍🍳", title: "3. We Cook", desc: "The restaurant prepares your meal with love and care." },
              { icon: "🏍️", title: "4. Enjoy!", desc: "Our rider delivers your meal right to your doorstep." }
            ].map((step, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "1.5rem" }}>{step.icon}</span>
                <h4 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "1rem" }}>{step.title}</h4>
                <p style={{ color: "var(--text-muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

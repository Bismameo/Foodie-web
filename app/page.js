"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { useCategory } from "./Providers";

export default function HomePage() {
  const { category } = useCategory();
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
      {category === "delivery" && (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-video-container">
              <img src="/assets/burger.jpg" alt="Delicious Food Background" className="hero-video" />
              <div className="hero-overlay"></div>
            </div>
            
            <div className="container">
              <div className="hero-content reveal">
                <h1>
                  The food you love, <br />
                  <span>delivered fast.</span>
                </h1>
                <p>
                  Your favorite meal from the best restaurants delivered to your doorstep in minutes. Fresh, hot, and reliable.
                </p>
                
                <div className="location-search-container">
                  <div className="search-input-wrapper">
                    <span>📍</span>
                    <input type="text" placeholder="Enter your delivery location..." />
                  </div>
                  <button className="btn nav-cta hero-btn">Find Food</button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Dishes */}
          <section id="dishes" className="section-padding">
            <div className="container">
              <div className="section-title reveal">
                <h2>Featured Specialties</h2>
                <div className="underline"></div>
                <p>
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
        <>
          <section className="hero-section">
            <div className="hero-video-container">
              <img src="/assets/burger.jpg" alt="Delicious Food Background" className="hero-video" />
              <div className="hero-overlay"></div>
            </div>
            <div className="container">
              <div className="hero-content reveal">
                <h1>
                  Fastest <br />
                  <span>Pick-up</span>
                </h1>
                <p>
                  Order ahead from your favorite local restaurants and grab your meal on the go. No waiting, just fresh food.
                </p>
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container">
              <div className="section-title reveal">
                <h2>Top Pick-up Spots</h2>
                <div className="underline"></div>
                <p>Discover the best restaurants near you offering instant pick-up.</p>
              </div>

              <div className="product-grid">
                {[
                  { name: "Urban Grill", time: "10 min", dist: "0.8 km", rating: "4.8", img: "/assets/burger.jpg", tag: "Burgers & Steaks" },
                  { name: "Sushi Harbor", time: "15 min", dist: "1.2 km", rating: "4.9", img: "/assets/sushi.jpg", tag: "Japanese Cuisine" },
                  { name: "Taco Haven", time: "12 min", dist: "0.5 km", rating: "4.7", img: "/assets/tacos.jpg", tag: "Mexican Street Food" }
                ].map((shop, i) => (
                  <div key={i} className="food-card reveal" style={{ padding: "1.5rem" }}>
                    <div style={{ position: "relative", height: "220px", borderRadius: "30px", overflow: "hidden", marginBottom: "1.5rem" }}>
                      <img src={shop.img} alt={shop.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "var(--primary)", color: "#000", padding: "0.5rem 1rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: "800", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                        {shop.time}
                      </div>
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>{shop.name}</h3>
                    <p style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>{shop.tag}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>{shop.dist} away • ⭐ {shop.rating}</p>
                    <button className="btn nav-cta" style={{ width: "100%" }}>Order for Pick-up</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {category === "shops" && (
        <>
          <section className="hero-section">
            <div className="hero-video-container">
              <img src="/assets/karahi.jpg" alt="Local Shops Background" className="hero-video" />
              <div className="hero-overlay"></div>
            </div>
            <div className="container">
              <div className="hero-content reveal">
                <h1>
                  Your Favorite <br />
                  <span>Local Shops</span>
                </h1>
                <p>
                  Everything you need from your neighborhood stores. Fresh groceries, premium ingredients, and more.
                </p>
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container">
              <div className="section-title reveal">
                <h2>Browse Neighborhood</h2>
                <div className="underline"></div>
                <p>Explore specialty stores and local boutiques near you.</p>
              </div>

              <div className="product-grid">
                {[
                  { name: "The Bread Basket", img: "/assets/bread.jpg", desc: "Artisan Sourdough • Croissants • Fresh Bread" },
                  { name: "Seafood Direct", img: "/assets/seafood.jpg", desc: "Fresh Catch • Prawns • Whole Fish" },
                  { name: "Gourmet Pasta House", img: "/assets/pasta.jpg", desc: "Fresh Ravioli • Tagliatelle • Pasta Sauces" }
                ].map((shop, i) => (
                  <div key={i} className="food-card reveal" style={{ padding: "1.5rem" }}>
                    <div style={{ position: "relative", height: "220px", borderRadius: "30px", overflow: "hidden", marginBottom: "1.5rem" }}>
                      <img src={shop.img} alt={shop.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>{shop.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem", lineHeight: "1.5" }}>{shop.desc}</p>
                    <button className="btn nav-cta" style={{ width: "100%" }}>Browse Shop</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}



      {/* How It Works Section */}
      <section className="section-padding reveal">
        <div className="container">
          <div className="section-title" style={{ textAlign: "center" }}>
            <h2>How it Works</h2>
            <div className="underline" style={{ margin: "0 auto 30px" }}></div>
            <p style={{ margin: "0 auto" }}>Simple, fast, and reliable delivery.</p>
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

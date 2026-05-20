import Link from "next/link";
import { products } from "../data/products";

export default function HomePage() {
  // First 8 products are the featured ones based on the user's specific list
  const featuredProducts = products.slice(0, 8);
  const remainingProducts = products.slice(8);

  return (
    <div className="home-container">
      {/* New Image-Based Split Hero Section */}
      <section className="hero-section-new">
        <div className="container hero-split-container">
          <div className="hero-text-content reveal">
            <div className="hero-badge">✨ Now Serving Excellence</div>
            <h1>Delicious food,<br />delivered <span>to your door</span></h1>
            <p>Experience the finest culinary delights from the city's top-rated kitchens. Freshly prepared, expertly packaged, and delivered in minutes.</p>
            <div className="hero-cta">
              <a href="#featured" className="btn">Order Now</a>
              <Link href="/about" className="btn2">Explore Menu</Link>
            </div>
            
            <div className="hero-trust-badges">
              <div className="trust-item">
                <span className="trust-icon">⭐</span>
                <span>4.9/5 Rating</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⏱️</span>
                <span>30 Min Delivery</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image-container reveal" style={{ animationDelay: "0.3s" }}>
            <div className="hero-image-wrapper">
              <img 
                src="/assets/burger.jpg" 
                alt="Delicious Burger" 
                className="hero-main-image"
              />
              <div className="image-accent-circle"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: "4rem" }}>
        {/* Featured Specialties Section */}
        <section id="featured" style={{ marginBottom: "4rem" }}>
          <div className="section-header">
            <h2 style={{ textAlign: "center", fontSize: "3rem", marginBottom: "1rem" }}>Our Featured Specialties</h2>
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "4rem", fontSize: "1.1rem" }}>Hand-picked dishes that define the Flavors Hub experience</p>
          </div>
          
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="product-card-link">
                <div className="product-card">
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                    />
                    <div style={{ 
                      position: "absolute", 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      padding: "1.5rem", 
                      background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                      color: "white"
                    }}>
                      <h3 style={{ margin: 0, fontSize: "1.3rem" }}>{product.title}</h3>
                    </div>
                  </div>
                  <div className="product-info">
                    <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>{product.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <span className="view-details-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Full Menu Section */}
        <section id="menu">
          <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "3rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "4rem" }}>All Restaurants & Dishes</h2>
          <div className="product-grid">
            {remainingProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="product-card-link">
                <div className="product-card">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1rem" }}>{product.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <span className="view-details-btn">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

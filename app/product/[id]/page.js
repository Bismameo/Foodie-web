import Link from "next/link";
import { connectDB } from "../../../libs/mongodb";
import Product from "../../../model/product-model";
import mongoose from "mongoose";
import BackButton from "../../components/BackButton";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  
  await connectDB();
  
  let product = null;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "1rem" }}>Product Not Found</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Sorry, the product you are looking for does not exist or has been removed.</p>
          <Link href="/" className="btn nav-cta" style={{ display: "inline-block" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-section">
      <div className="container">
        <BackButton />
        
        <div className="product-detail-container">
          <div className="product-image-wrapper">
            <div className="product-image-decoration top-left"></div>
            <img
              src={product.image}
              alt={product.title}
              className="product-detail-image"
            />
            <div className="product-image-decoration bottom-right"></div>
          </div>

          <div className="product-info-content">
            <span style={{ color: "var(--primary)", fontWeight: "800", letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.9rem", marginBottom: "1rem", display: "block" }}>Featured Selection</span>
            <h1>{product.title}</h1>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }} className="flex-align">
              <div className="price-badge">
                ${product.price.toFixed(2)}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--primary)", fontSize: "1.4rem" }}>★</span> 4.9 (120+ reviews)
              </div>
            </div>

            <p className="product-description">
              {product.description}
            </p>

            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }} className="flex-align">
              <button className="btn nav-cta" style={{ padding: "1.2rem 3rem !important", fontSize: "1.1rem !important", flex: "1 1 200px" }}>
                Add to Basket
              </button>
              <button className="btn" style={{ background: "transparent", border: "2px solid var(--glass-border)", color: "#fff", flex: "1 1 150px" }}>
                <span style={{ marginRight: "8px" }}>❤️</span> Wishlist
              </button>
            </div>
            
            <div className="feature-grid">
              <div className="feature-item">
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>🚚</span>
                <strong style={{ display: "block", color: "#fff", marginBottom: "0.3rem" }}>Fast Delivery</strong>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Within 30 minutes</span>
              </div>
              <div className="feature-item">
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>💎</span>
                <strong style={{ display: "block", color: "#fff", marginBottom: "0.3rem" }}>Best Quality</strong>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Chef's special recipe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

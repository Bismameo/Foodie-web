import Link from "next/link";
import { connectDB } from "../../../libs/mongodb";
import Product from "../../../model/product-model";
import mongoose from "mongoose";

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
      <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", color: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--card-bg)", borderRadius: "24px", boxShadow: "var(--shadow-lg)" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--primary-color)", marginBottom: "1rem" }}>Product Not Found</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Sorry, the product you are looking for does not exist or has been removed.</p>
          <Link href="/" className="btn" style={{ textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", color: "var(--text-main)" }}>
      <div className="container" style={{ padding: "4rem 5%" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "3rem", textDecoration: "none", color: "var(--primary-color)", fontWeight: "700", fontSize: "1.1rem", transition: "transform 0.3s" }}>
          <span style={{ fontSize: "1.5rem" }}>←</span> Back to Explore
        </Link>
        
        <div className="product-detail-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "-20px", left: "-20px", width: "100px", height: "100px", borderTop: "4px solid var(--primary-color)", borderLeft: "4px solid var(--primary-color)", borderRadius: "20px 0 0 0", zIndex: 1 }}></div>
            <img
              src={product.image}
              alt={product.title}
              className="product-detail-image"
              style={{ width: "100%", borderRadius: "32px", boxShadow: "var(--shadow-lg)", objectFit: "cover", height: "500px", border: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 2 }}
            />
            <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "100px", height: "100px", borderBottom: "4px solid var(--primary-color)", borderRight: "4px solid var(--primary-color)", borderRadius: "0 0 20px 0", zIndex: 1 }}></div>
          </div>

          <div className="product-detail-info" style={{ padding: "1rem" }}>
            <span style={{ color: "var(--primary-color)", fontWeight: "800", letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.9rem", marginBottom: "1rem", display: "block" }}>Featured Selection</span>
            <h1 style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "1.5rem", lineHeight: "1.1", color: "var(--text-main)" }}>{product.title}</h1>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ background: "var(--accent-gradient)", color: "black", padding: "0.8rem 2rem", borderRadius: "100px", fontWeight: "900", fontSize: "1.8rem", boxShadow: "0 10px 20px rgba(249, 202, 36, 0.3)" }}>
                ${product.price.toFixed(2)}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--primary-color)" }}>★</span> 4.9 (120+ reviews)
              </div>
            </div>

            <p style={{ lineHeight: "1.8", color: "var(--text-muted)", fontSize: "1.2rem", marginBottom: "3rem", borderLeft: "4px solid var(--primary-color)", paddingLeft: "1.5rem" }}>
              {product.description}
            </p>

            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <button className="btn" style={{ padding: "1.2rem 3rem", fontSize: "1.2rem", flex: "1 1 200px", borderRadius: "16px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
                Add to Basket
              </button>
              <button style={{ padding: "1.2rem 2.5rem", fontSize: "1.2rem", background: "transparent", border: "2px solid rgba(255,255,255,0.1)", color: "var(--text-main)", borderRadius: "16px", fontWeight: "700", cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#ff4757" }}>❤️</span> Wishlist
              </button>
            </div>
            
            <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "1.5rem", background: "var(--card-bg)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>🚚</span>
                <strong style={{ display: "block", color: "var(--text-main)" }}>Fast Delivery</strong>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Within 30 minutes</span>
              </div>
              <div style={{ padding: "1.5rem", background: "var(--card-bg)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>💎</span>
                <strong style={{ display: "block", color: "var(--text-main)" }}>Best Quality</strong>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Chef's special recipe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

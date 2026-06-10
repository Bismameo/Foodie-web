"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [progress, setProgress] = useState(25);
  const [activeStep, setActiveStep] = useState(1);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Simulate order progress
    setTimeout(() => { setProgress(50); setActiveStep(2); }, 3000);
    setTimeout(() => { setProgress(75); setActiveStep(3); }, 7000);
    setTimeout(() => { setProgress(100); setActiveStep(4); }, 12000);
  };

  return (
    <div className="checkout-page">
      <section className="section-padding" style={{ padding: "6rem 0" }}>
        <div className="container">
          {!orderPlaced ? (
            <div className="reveal">
              <h2 style={{ fontSize: "3rem", fontWeight: "800", textAlign: "center", marginBottom: "3rem" }}>Complete Your Order</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "3rem" }}>
                {/* Order Summary */}
                <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "40px", border: "1px solid var(--glass-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.8rem", fontWeight: "800" }}>Order Summary</h3>
                    <Link href="/" style={{ color: "var(--primary)", fontWeight: "700", textDecoration: "none" }}>+ Add More</Link>
                  </div>

                  <div style={{ display: "grid", gap: "2rem", marginBottom: "3rem" }}>
                    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                      <img src="/assets/briyani1.jpg" alt="Biryani" style={{ width: "80px", height: "80px", borderRadius: "15px", objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: "700" }}>Special Biryani</h4>
                        <p style={{ color: "var(--text-muted)" }}>$12.99 x 1</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                      <img src="/assets/burger.jpg" alt="Burger" style={{ width: "80px", height: "80px", borderRadius: "15px", objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: "700" }}>Zinger Burger</h4>
                        <p style={{ color: "var(--text-muted)" }}>$7.99 x 2</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "2rem", display: "grid", gap: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                      <span>Subtotal</span>
                      <span>$28.97</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                      <span>Delivery Fee</span>
                      <span>$2.50</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.5rem", fontWeight: "800", color: "#fff", marginTop: "1rem" }}>
                      <span>Total</span>
                      <span>$31.47</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Details */}
                <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "40px", border: "1px solid var(--glass-border)" }}>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "2rem" }}>Delivery Details</h3>
                  <form onSubmit={handlePlaceOrder} style={{ display: "grid", gap: "1.5rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--text-muted)" }}>Full Name</label>
                      <input type="text" required placeholder="John Doe" style={{ width: "100%", padding: "1.2rem", borderRadius: "16px", background: "var(--bg-main)", border: "1px solid var(--glass-border)", color: "#fff" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--text-muted)" }}>Phone Number</label>
                      <input type="text" required placeholder="+1 234 567 890" style={{ width: "100%", padding: "1.2rem", borderRadius: "16px", background: "var(--bg-main)", border: "1px solid var(--glass-border)", color: "#fff" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--text-muted)" }}>Delivery Address</label>
                      <textarea required rows="3" placeholder="123 Street, City, Country" style={{ width: "100%", padding: "1.2rem", borderRadius: "16px", background: "var(--bg-main)", border: "1px solid var(--glass-border)", color: "#fff", resize: "none" }}></textarea>
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--text-muted)" }}>Payment Method</label>
                      <select style={{ width: "100%", padding: "1.2rem", borderRadius: "16px", background: "var(--bg-main)", border: "1px solid var(--glass-border)", color: "#fff", outline: "none" }}>
                        <option>Cash on Delivery</option>
                        <option>Credit/Debit Card</option>
                        <option>Mobile Wallet</option>
                      </select>
                    </div>
                    <button type="submit" className="btn nav-cta" style={{ width: "100%", marginTop: "1rem" }}>Place Order Now</button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="reveal" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
              <span style={{ fontSize: "6rem" }}>🎉</span>
              <h2 style={{ fontSize: "3.5rem", fontWeight: "800", margin: "2rem 0" }}>Order Placed!</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginBottom: "4rem" }}>
                Your delicious meal is being prepared. Track its progress below.
              </p>

              <div style={{ background: "var(--bg-card)", padding: "4rem", borderRadius: "40px", border: "1px solid var(--glass-border)", position: "relative" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "4rem" }}>Live Order Status</h3>
                
                <div style={{ height: "4px", background: "var(--glass-border)", position: "relative", marginBottom: "4rem" }}>
                  <div style={{ height: "100%", background: "var(--primary)", width: `${progress}%`, transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)" }}></div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", top: "-13px", width: "100%" }}>
                    {[1, 2, 3, 4].map(step => (
                      <div key={step} style={{ textAlign: "center" }}>
                        <div style={{ 
                          width: "30px", height: "30px", borderRadius: "50%", 
                          background: activeStep >= step ? "var(--primary)" : "var(--bg-main)",
                          border: `4px solid ${activeStep >= step ? "var(--primary)" : "var(--glass-border)"}`,
                          transition: "all 0.4s"
                        }}></div>
                        <span style={{ 
                          display: "block", marginTop: "1rem", fontSize: "0.85rem", fontWeight: "700", 
                          color: activeStep >= step ? "#fff" : "var(--text-muted)" 
                        }}>
                          {step === 1 && "Received"}
                          {step === 2 && "Preparing"}
                          {step === 3 && "On the way"}
                          {step === 4 && "Delivered"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/" className="btn nav-cta" style={{ marginTop: "4rem" }}>Back to Home</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

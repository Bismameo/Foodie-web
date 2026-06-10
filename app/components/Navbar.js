"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <nav className="menu">
            <Link href="/" className="logo-text" onClick={closeMenu}>
              foo<span>die</span>
            </Link>

            <div className="menu-items">
              <Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link>
              <Link href="/about" className={pathname === "/about" ? "active" : ""}>Our Story</Link>
              <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>Contact</Link>
              
              <Link href="/checkout" className="cart-link" style={{ position: "relative", marginLeft: "1rem" }}>
                <span style={{ fontSize: "1.4rem" }}>🛒</span>
                <span style={{ position: "absolute", top: "-8px", right: "-12px", background: "var(--primary)", color: "#000", fontSize: "0.7rem", fontWeight: "900", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
              </Link>
              
              {status === "authenticated" ? (
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "1rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: "600" }}>
                    Hi, <span style={{ color: "#fff" }}>{session.user.name.split(" ")[0]}</span>
                  </span>
                  <button 
                    onClick={() => signOut()}
                    className="btn nav-cta"
                    style={{ padding: "0.6rem 1.5rem !important", fontSize: "0.8rem !important" }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className={pathname === "/login" ? "active" : ""} style={{ marginLeft: "1rem" }}>Login</Link>
                  <Link href="/signup" className="btn nav-cta">Sign Up</Link>
                </>
              )}
            </div>

            <div 
              className={`hamburger ${isOpen ? "active" : ""}`} 
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${isOpen ? "active" : ""}`}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/about" onClick={closeMenu}>Our Story</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
        <Link href="/checkout" onClick={closeMenu}>Cart (3)</Link>
        
        <div style={{ width: "80%", height: "1px", background: "var(--glass-border)", margin: "1rem 0" }}></div>

        {status === "authenticated" ? (
          <>
            <p style={{ color: "var(--primary)", fontWeight: "800", fontSize: "1.2rem" }}>{session.user.name}</p>
            <button 
              onClick={() => { signOut(); closeMenu(); }}
              className="btn nav-cta"
              style={{ width: "250px" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" onClick={closeMenu}>Login</Link>
            <Link href="/signup" onClick={closeMenu} className="btn nav-cta" style={{ width: "250px" }}>Sign Up</Link>
          </>
        )}
      </div>

      {/* Overlay */}
      <div 
        className={`nav-overlay ${isOpen ? "active" : ""}`} 
        onClick={closeMenu}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          zIndex: 1040,
          display: isOpen ? "block" : "none",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.4s"
        }}
      ></div>
    </>
  );
}

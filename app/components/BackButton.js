"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      style={{ 
        display: "inline-flex", 
        alignItems: "center", 
        gap: "10px", 
        marginBottom: "3rem", 
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--primary)", 
        fontWeight: "700", 
        fontSize: "1.1rem", 
        padding: "0",
        fontFamily: "inherit",
        transition: "transform 0.3s" 
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(-5px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
    >
      <span style={{ fontSize: "1.5rem" }}>←</span> Back to Explore
    </button>
  );
}

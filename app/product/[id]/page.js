import Link from "next/link";
import { products } from "../../../data/products";

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you are looking for does not exist.</p>
        <Link href="/" className="back-btn">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link href="/" className="back-btn">
        ← Back to Home
      </Link>
      <div className="product-detail-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-price" style={{ fontSize: "1.5rem" }}>
            Price: ${product.price.toFixed(2)}
          </p>
          <p style={{ lineHeight: "1.6", margin: "1.5rem 0" }}>
            {product.description}
          </p>
          <button className="view-details-btn" style={{ border: "none", cursor: "pointer", fontSize: "1rem" }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

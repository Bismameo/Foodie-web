import "./globals.css";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />

          <main>{children}</main>

          <footer className="site-footer">
            <div className="container">
              <div className="footer-top">
                <div className="footer-column">
                  <h4>Customer Care</h4>
                  <ul>
                    <li><Link href="/help">Help Center</Link></li>
                    <li><Link href="/refunds">Refunds with foodiepay</Link></li>
                    <li><Link href="/terms">Terms and Conditions</Link></li>
                    <li><Link href="/privacy">Privacy policy</Link></li>
                    <li><Link href="/security">Security</Link></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h4>Corporate</h4>
                  <ul>
                    <li><Link href="/press">Press</Link></li>
                    <li><Link href="/careers">Careers</Link></li>
                    <li><Link href="/restaurants">Suggest a Restaurant</Link></li>
                    <li><Link href="/affiliate">Become an Affiliate</Link></li>
                    <li><Link href="/partner">Partner with Us</Link></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h4>Discover</h4>
                  <ul>
                    <li><Link href="/cuisines">All cuisines</Link></li>
                    <li><Link href="/magazine">foodie Magazine</Link></li>
                    <li><Link href="/cities">All cities</Link></li>
                    <li><Link href="/chef">foodie Home Chef</Link></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h4>Locations</h4>
                  <ul>
                    <li><Link href="/karachi">Karachi</Link></li>
                    <li><Link href="/lahore">Lahore</Link></li>
                    <li><Link href="/islamabad">Islamabad</Link></li>
                    <li><Link href="/dubai">Dubai</Link></li>
                  </ul>
                  <h4 style={{ marginTop: "2.5rem" }}>Download Apps</h4>
                  <div className="app-downloads">
                    <Link href="#" className="app-btn" title="Download on App Store"><span>🍎</span> App Store</Link>
                    <Link href="#" className="app-btn" title="Download on Play Store"><span>🤖</span> Play Store</Link>
                  </div>
                </div>
              </div>
              
              <div className="footer-bottom">
                <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                  <Link href="/" className="logo-text">foo<span>die</span></Link>
                </div>
                <div className="footer-socials">
                  <Link href="#" className="footer-social-icon">f</Link>
                  <Link href="#" className="footer-social-icon">t</Link>
                  <Link href="#" className="footer-social-icon">i</Link>
                </div>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

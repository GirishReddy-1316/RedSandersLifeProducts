import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/wholesale.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header.jsx";
import CartPop from "../components/CartPop.jsx";

function Wholesale() {
  const [cartVisible, setCartVisible] = useState(false);
  const { cartItems, wishItems } = useSelector(state => state.reducer);
  return (
    <div className="wholesale-page">
      {cartVisible && (
        <CartPop
          setCartVisible={setCartVisible}
        />
      )}
      <div className="main-container">
        <Header
          cartCount={cartItems.length}
          wishCount={wishItems.length}
          setCartVisible={setCartVisible}
        />
      </div>

      <main className="wholesale-main-content">
        <h1>Welcome!! Step into JiYaBa Wholesale </h1>
        <p>
          What makes our company the best choice for wholesale purchases of our
          products?
        </p>

        <section className="why-wholesale">
          <h2>Why Partner with Jiyaba ?</h2>
          <ul className="our-offerings-list">
            <li>
              Direct from the Source:
              <span>
                we procure genuine products with a license from the forest and farms. Our Products are sourced directly from the private farms land in
                and around city of Tirupati Andhra Pradesh, ensuring the quality
                and color.
              </span>
            </li>
            <li>
              Exclusive Wholesale Prices:
              <span>
                Benefit from competitive pricing, providing excellent profit
                margins for your business.
              </span>
            </li>
            <li>
              Marketing Support:
              <span>
                We provide promotional materials and online visibility to
                support your sales efforts.
              </span>
            </li>
            <li>
              Dedicated Account Management:
              <span>
                A dedicated team member will assist you with orders,
                customization, and any inquiries.
              </span>
            </li>
          </ul>
        </section>

        <section className="our-offerings">
          <h2>
            What products do we provide for wholesale distribution, and what
            sets us apart as your ideal choice?
          </h2>

          <ul className="our-offerings-list">
            <li>
              Premium Pure Red Sanders Water:
              <span>
                Bursting with Flavor, Color, and Health Benefits. Savor the
                delicious taste and stunning red hue of this natural gem. And
                the best part? It's not just tasty—it's great for your health
                too!{" "}
              </span>
            </li>
            <li>
              Refreshing Choices for a Healthy Lifestyle:
              <span>
                Explore our assortment of beverages, cool drinks, and soft
                drinks, each offering their own array of healthful properties.
              </span>
            </li>
            <li>
              Elevate Your Senses:
              <span>
                Discover our range of Red Sandal Incense Sticks (Agarbattis) and
                incense cones (Dhoops), made from pure red sandalwood materials.
                Perfect for Yagnas and other rituals, along with a variety of
                raw, natural red sandalwood products
              </span>
            </li>
            <li>
              Nourish Your Beauty Naturally with Red Sandal Extract Cosmetics:
              <span>
                We provide bulk cosmetics naturally derived from pure red sandal
                extracts, including lip balm, lipstick, face packs, and more.
              </span>
            </li>
            <li>
              Share Your Details <a href="/contact"> here</a> Our team will review your request and reach out to discuss your
              needs and how we can best support your business.
            </li>
            <li>
              Have more questions? Visit our <a href="/faqs">FAQ page</a> or
              contact us directly.
            </li>
          </ul>
        </section>
      </main>

      <Footer />
      <BottomBar />
    </div>
  );
}

export default Wholesale;

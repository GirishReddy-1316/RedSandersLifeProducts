import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/about.css";
import CartPop from "../components/CartPop.jsx";
import Header from "../components/Header.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";

function About() {
  const [cartVisible, setCartVisible] = useState(false);
  const { cartItems, wishItems } = useSelector(state => state.reducer);

  return (
    <div className="contact-container">
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

      <main className="about-main-content">
        <section className="about-intro">
          <h1>About Jiyaba </h1>
          <p className="tagline">
            A Taste of Authenticity, Straight from the Heart wood of the Red Sanders Tree to Your Body.
          </p>
          <p>
          Jiyaba is a startup with a simple goal: to help everyone live a healthy life. In today’s world, where food and water are often affected by harmful substances, staying healthy has become a challenge. That’s why we’ve decided to create products that are good for your health and affordable for everyone.
          </p>
        </section>

        <section className="our-mission">
          <h2>Our Mission</h2>
          <p>
            At JiYaBa, we're dedicated to sharing the incredible health benefits of Red Sandalwood by sourcing only the highest quality products from trusted suppliers. We ensure our customers receive the purest form of this plant. Plus, we prioritize ample availability so everyone can experience its full benefits for skincare, natural drinks, aromatherapy, and more. Trust us to provide reliable Red Sandalwood for your wellness needs.
          </p>
        </section>

        <section className="our-products">
          <h2>Our Products</h2>
          <p>
            Explore our wide range of offerings, from Pure Red Sanders Water to Red Sandal cosmetics like lipstick and lip balm, along with Red Sandalwood Powder for face packs, Red Sandal Sticks for Yagna, and Red Sandal incense sticks. Additionally, we offer a selection of refreshing cool drinks and soft drinks to enhance your wellness routine.
          </p>
        </section>

        <section className="visit-us">
          <h2>Visit Us</h2>
          <p>
            Want to learn more or get in touch with us? Visit our{" "}
            <a href="/contact">Contact Page</a> and let's start a conversation.
            We're eager to chat about all things about our products.
          </p>
        </section>
      </main>

      <Footer />
      <BottomBar />
    </div>
  );
}

export default About;

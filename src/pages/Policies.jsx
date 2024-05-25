import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/policies.css";
import CartPop from "../components/CartPop.jsx";
import Header from "../components/Header.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";

function Policies() {
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

      <main className="policies-main-content">
        <section>Our Policies</section>

        <section className="shipping-policy">
          <h2>Shipping Policy</h2>
          <p>
            At{" "}
            <a href="/" className="policies-title">
              Jiyaba
            </a>
            , we take pride in ensuring that our products reach you fresh and fast.
            Our shipping partners are selected for their reliability and speed.
            We offer standard and expedited shipping options, both domestically
            within India and internationally. Shipping costs are calculated
            based on weight and destination. Free shipping is available for
            orders above a certain value.
          </p>
        </section>

        <section className="return-policy">
          <h2>Return & Refund Policy</h2>
          <p>
            Your satisfaction is our top priority. If for any reason you are not
            satisfied with your purchase, you may return it within 30 days of
            receipt for a full refund or exchange. The items must be returned in
            their original condition and packaging. Please note that return
            shipping costs are not covered by JiYaBa.
          </p>
        </section>

        <section className="privacy-policy">
          <h2>Privacy Policy</h2>
          <p>
            We respect your privacy and are committed to protecting your
            personal data. Our privacy policy outlines the types of information
            we collect, how it is used, and the steps we take to ensure your
            personal information is handled securely. We do not share your
            personal information with third parties without your consent, except
            as required by law.
          </p>
        </section>

        <section className="terms-conditions">
          <h2>Terms & Conditions</h2>
          <p>
            By accessing or using the JiYaBa website and our services, you
            agree to be bound by our terms and conditions. These terms cover
            important topics such as intellectual property rights, user conduct,
            disclaimers, and liability limitations. We encourage you to read
            these terms carefully before using our services.
          </p>
        </section>

        <section className="sustainability-commitment">
          <h2>Our Commitment to Sustainability</h2>
          <p>
            Sustainability is at the heart of everything we do at Jiyaba.
            From the tea gardens to your cup, we are dedicated to promoting
            environmentally friendly practices, supporting local communities,
            and ensuring the highest standards of ethical sourcing. Learn more
            about our initiatives and how we strive to make a positive impact on
            the environment and society.
          </p>
        </section>
      </main>

      <Footer />
      <BottomBar />
    </div>
  );
}

export default Policies;

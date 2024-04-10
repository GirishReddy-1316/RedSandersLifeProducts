import BottomBar from "../components/BottomBar.jsx";
import "../styles/wholesale.css";

function Wholesale() {
  return (
    <div className="wholesale-page">
      <main className="wholesale-main-content">
        <h1>Welcome to Hare Rama Hare Krishna Industries Wholesale</h1>
        <p>
          Join us in bringing the rich heritage of Red Sandal Wood to enthusiasts
          around the globe.
        </p>

        <section className="why-wholesale">
          <h2>Why Partner with Hare Rama Hare Krishna Industries?</h2>
          <ul className="our-offerings-list">
            <li>
              Direct from the Source:
              <span>
                Our Products are sourced directly from the private farms land in and around city of Tirupati
                Andhra Pradesh, ensuring the quality and color.
              </span>
            </li>
            <li>
              Exclusive Wholesale Prices:
              <span>
                Enjoy competitive pricing, enabling attractive margins for your
                business.
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
          <h2>Our carefully curated collection for wholesale distribution.</h2>
          <p>
          From classic blends to creative infusions, our assortment appeals to every taste preference:
          </p>
          <ul className="our-offerings-list">
            <li>
              Classic Pure Red Sanders Water:
              <span>Distinctive flavor and is renowned for its vibrant color and health benefits.</span>
            </li>
            <li>
              Red Sanders Water:
              <span>Perfect combination of Pure Red Sandalwood root extract and Natural Sweetners (No Sugar Added).</span>
            </li>
            <li>
              Red Sandal Incense Sticks (Agarbhatthis) and Dhoops:
              <span>
               Famous for it's Unique combination of raw materials and Long lasting.
              </span>
            </li>            
          </ul>
        </section>

        <section className="how-to-apply">
          <h2>Begin Your Wholesale Journey</h2>
          <p className="">Getting started is simple:</p>
          <ul className="contact-us our-offerings-list">
            <li>
              Give us your details<a href="/contact"> here</a>
            </li>
            <li>
              Our team will review your request and reach out to discuss your
              needs and how we can best support your business.
            </li>
            <li>
              Once approved, you'll have access to our wholesale catalog and
              pricing.
            </li>
          </ul>
        </section>

        <section className="faqs contact-us">
          <h2>Frequently Asked Questions</h2>
          <span className="bottom-p">
            Have more questions? Visit our <a href="/faqs">FAQ page</a> or
            contact us directly.
          </span>
        </section>

        <section className="contact-us">
          <h2>Let's Connect</h2>
          <span className="bottom-p">
            Ready to explore the possibilities or need more information? Our
            Wholesale Team is here to assist. Email us at{" "}
            <a href="mailto:wholesale@redsanderslife.com">
              wholesale@redsanderslife.com
            </a>{" "}
            or visit our <a href="/contact">Contact Page</a> for more details.
          </span>
        </section>
      </main>

      <BottomBar />
    </div>
  );
}

export default Wholesale;

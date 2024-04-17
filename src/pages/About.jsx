import PagesHeader from "../components/PagesHeader.jsx";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/about.css";

function About() {
  return (
    <div className="about-us-page">
      <PagesHeader />

      <main className="about-main-content">
        <section className="about-intro">
          <h1>About Jiyaba </h1>
          <p className="tagline">
          A Taste of Authenticity, Straight from the Roots of the Red Sanders Tree to Your Bottle.
          </p>
          <p>
          We have held the license for Red sanders for over 5 years and have exported it to other countries, including Switzerland. Our goal is to purchase Red Sanders Trees from farmers who may not know how to sell them. We'll guide them through the process and buy directly from them.
          </p>
        </section>

        <section className="our-mission">
          <h2>Our Mission</h2>
          <p>
          At Jiyaba, we believe in the potential of Red Sanders Trees and their benefits. We aim to introduce a range of products made from red sandalwood to provide various health benefits to people. Our goal is to offer a variety of products derived from Red Sanders Trees.
          </p>
        </section>

        <section className="our-products">
          <h2>Our Products</h2>
          <p>
          Discover our wide selection of products, including Pure Red Sanders Water, Red Sanders Water, Red Sandal Tea, Red Sandal Lipstick, Red Sandal Lip Balm, Red Sandal Sticks for Homam, Red Sandal Incense Sticks, and Red Sandalwood Powder for Face Packs, and more.
          </p>
        </section>

        <section className="visit-us">
          <h2>Visit Us</h2>
          <p>
            Want to learn more or get in touch with us? Visit our{" "}
            <a href="/contact">Contact Page</a> and let's start a conversation.
            We're always here to talk About Red Sandal.
          </p>
        </section>
      </main>

      <Footer />
      <BottomBar />
    </div>
  );
}

export default About;

import { useState } from "react";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/faq.css";
import CartPop from "../components/CartPop.jsx";
import Header from "../components/Header.jsx";
import { useSelector } from "react-redux";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);
  const { cartItems, wishItems } = useSelector(state => state.reducer);

  const questionsAnswers = [
    {
      question: "What types of products do you offer?",
      answer:
        "We offer a wide range of red sandal products including classic Red Sanders Water, Pure Red Sanders Water, Red Sandal Agarbhatthis, Red Sandal Powder and We can give you some customized products",
    },
    {
      question: "How do you source your wood?",
      answer:
        "Our wood is directly sourced from the finest forests in Tirupati, ensuring quality and color.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship internationally. Shipping costs and times vary depending on the destination.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 10 days of purchase, provided the products are in their original condition.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-page">
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

      <main className="faq-content">
        <div className="faq-container">
          <h1>Frequently Asked Questions</h1>
          {questionsAnswers.map((qa, index) => (
            <div
              key={index}
              className={`faq-item ${index === activeIndex ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {qa.question}
              </div>
              <div className="faq-answer">
                {index === activeIndex && <p>{qa.answer}</p>}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <BottomBar />
    </div>
  );
}

export default Faq;

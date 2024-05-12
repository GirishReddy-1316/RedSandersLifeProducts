import React, { useState } from 'react';
import "../styles/accordion.css";


function AccordionItem({ title, description }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <h3 className={`accordion-header ${isOpen ? 'active' : ''}`} onClick={toggleAccordion}>{title}</h3>
      {isOpen && (
        <div className="accordion-content">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

function Accordion({ items }) {
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} description={item.description} />
      ))}
    </div>
  );
}

export default Accordion;
